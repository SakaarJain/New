const appDataObj = require('../server-controllers/appObjects');
const utilities = require('../server-controllers/utilities');
const pg = require('pg');
//const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
const Promise = require('bluebird');
// Save Users in DB
exports.SaveUsersGroupInDB = function SaveUsersGroupInDB(req,res) {
  const user_groups = req.query.user_group;
  console.log(req.query.user_group);
  console.log('SaveUsersGroupInDB called');
  console.log(`number of records to be proceed: ${user_groups.users_attributes.length}`);
  const datetime = new Date();
  const useremails = [];
  const userphones = [];
  const countrycodes = [];
  const usernames =[];
  for(let i = 0; i < user_groups.users_attributes.length; i++){
    useremails.push(user_groups.users_attributes[i].email);
    userphones.push(user_groups.users_attributes[i].contact);
    countrycodes.push(user_groups.users_attributes[i].country_code);
    usernames.push(user_groups.users_attributes[i].name);
  }
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    console.log('CASE --OF---- INSERT');
  client.query('INSERT INTO user_groups(name, created_at, updated_at,useremail,userphone,countrycode,username) VALUES($1, $2, $3, $4, $5, $6,$7) RETURNING id',
  [user_groups.name, datetime,datetime,useremails,userphones,countrycodes,usernames]);
  console.log(data);
    console.log('SaveUsersGroupInDB end');
      //return status;
      return res.render('user-new');
  });

  // let getUserGroupQuery = 'SELECT * FROM user_groups';
  // db.many(getUserGroupQuery).then((data) => {    //
  //   for(let i = 0; i < data.length; i++){
  //     //if(data[i].name === user_groups.name){// this is CASE of UPDATE
  //     console.log('CASE --OF---- UPDATE');
  //     let updateQuery = 'UPDATE user_groups ';
  //     updateQuery += ` SET name = '${user_groups.name}',`;
  //     updateQuery += ` useremail = '${user_groups.useremail}',`;
  //     updateQuery += ` userphone = '${user_groups.userphone}',`;
  //     updateQuery += ` username = '${user_groups.username}',`;
  //     updateQuery += ` updated_at = ${datetime},`;
  //     updateQuery += ` WHERE id = '${isExist}'`;
  //     console.log(`updateQuery:---> ${updateQuery}`);
  //     let result = 0;
  //     db.none(updateQuery).then(() => {
  //       result = STATUS_UPDATED;
  //       console.log('Updated Successfully:-->' `${result}`); // print new user id;
  //     }).catch((error) => {
  //       console.log('UPDATE ---> ERROR:', error); // print error;
  //     });
  //   //} else{// this is CASE of INSERT
  //     console.log('CASE --OF---- INSERT');
  //     let insertQuery = 'INSERT INTO user_groups(name, created_at, updated_at,useremail,userphone,countrycode,username) ';
  //     insertQuery += ' VALUES($1, $2, $3, $4, $5, $6,$7) ';
  //     insertQuery += ' RETURNING id ';
  //     const dataToDump = [];
  //     dataToDump.push(user_groups.name);
  //     dataToDump.push(datetime);
  //     dataToDump.push(datetime);
  //     dataToDump.push(user_groups.useremail);
  //     dataToDump.push(user_groups.userphone);
  //     dataToDump.push(user_groups.countrycode);
  //     dataToDump.push(user_groups.username);
  //     // status = executeInsertQuery(insertQuery, dataToDump);
  //     db.one(insertQuery, dataToDump).then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   //}
  // }
  // })
  // .catch((error) => {
  //   console.log(error);
  //   return false;
  // });

} // Function Close : insertRecordsIntoDB

function checkExistingGroup(userGroup) {
  console.log('****** checkExistingGroup:- called');
  let getUserGroupQuery = 'SELECT * FROM user_groups';
  db.many(getUserGroupQuery).then((data) => {

    for(let i = 0; i < data.length; i++){
      console.log(data[i].name);
    if(data[i].name === userGroup){
        console.log(data[i].name);
      return data[i].id;
    }
  }
  })
  .catch((error) => {
    console.log(error);
    return false;
  });
  return false;
  console.log(`checkExistingGroup: end `);
}

exports.GetUserGroups = function GetUserGroups(req,res) {
  const results = [];
  pg.connect(connectionString, (err, client, done) => {
  // Handle connection errors
  if(err) {
    done();
    console.log(err);

  }
   // SQL Query > Select Data
  const query = client.query('SELECT * FROM user_groups');
  // Stream results back one row at a time
  query.on('row', (row) => {
    console.log(row);
    results.push(row);
  });
  // After all data is returned, close connection and return results
  query.on('end', () => {
    done();
    return res.render('users', {
      userGrp: results,
    });
  });
});

}

exports.DeleteUsersGroupInDB = function DeleteUsersGroupInDB(req,res) {
  try {
		const name = req.body.name;
    let deleteQuery = 'DELETE  FROM user_groups';
        deleteQuery += ` WHERE name = '${name}'`;
    db.one(deleteQuery).then((data) => {
      // console.log(data);
      return res.render('users');
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
	} catch (err) {
		console.log(err);
	}

}


exports.GetAllUsersandRenderAdminPage = function GetAllUsersandRenderAdminPage(req,res) {
  let getUserGroupQuery = 'SELECT * FROM federate_sso';
  const userDashboardData = new appDataObj.AdminDashboard();
  db.many(getUserGroupQuery).then((data) => {
     console.log(data);
     utilities.GetDasboardData(data)
			.then((finalData) => {
        return res.render('admin', {
          adminGrp: finalData,
        });
			});

  })
  .catch((error) => {
    console.log(error);
    return error;
  });
}


exports.CheckAndAddUser = function CheckAndAddUser(userId) {
  // Find all product entry which have any of matching content tag
	return new Promise((resolve, reject) => {
    db.any(`SELECT userrole from federate_sso  where usersystemid='${userId}';`)
    .then((userRole) => {
      let userRoleName;
      console.log(userRole.length);
      if (userRole.length > 0) {
        userRoleName = userRole[0].userrole;
        console.log(userRoleName);
        resolve(userRoleName);
        //return userRoleName;
        //resolve({ status: 'OK', message: 'Data fetched successfully', userRoleName, authoriseUser: true });
      } else if (userRole.length === 0) {
        let insertQuery = 'INSERT INTO federate_sso(username, useremail, usersystemid,userrole) ';
        insertQuery += ' VALUES($1, $2, $3, $4) ';
        const dataToDump = [];
        userRoleName='IT-Admin';
        dataToDump.push(null);
        dataToDump.push(null);
        dataToDump.push(userId);
        dataToDump.push(userRoleName);
        db.one(insertQuery, dataToDump).then((data) => {
          console.log(data);
          console.log('SaveFederateUsersGroupInDB end');
          resolve(userRoleName);
            //return userRoleName;
            //return { status: 'New User Added', message: 'New User Added Please assign role',userRoleName, authoriseUser: false };
            // resolve();

        })
        .catch((e) => {
    			console.log(`Error in retrieving `);
    			reject(e);
    		});

      }
    });


	});

}
