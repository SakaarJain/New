/*
This file contains any server side modules needed for user management
*/

const db = require('../server-controllers/dbconfig');




let usertoken;

module.exports = {
  getRoles: () => {
    return new Promise((resolve) => {
      try {
        db.any('SELECT role_id, role_name FROM role_master;')
        .then((data) => {
          // success
          console.log('Roles recieved');
          resolve({ status: 'OK', message: 'Roles fetched successfully', rolesdata: data });
        })
        .catch((error) => {
          // error
          console.log(error);
          resolve({ status: 'Failed', message: 'Roles list could not be fetched due to some error' });
        });
      } catch (ex) {
        console.log(ex.message);
      }
    });
  },

  geteditUserRole: (userid) => {
    return new Promise((resolve) => {
      try {
        db.any(`SELECT role_id FROM user_role_mapping WHERE user_id = '${userid}';`)
        .then((userroleid) => {
          // success
          console.log('Data recieved');
          console.log(userroleid);
          resolve(userroleid);
        })
        .catch((error) => {
          // error
          console.log(error);
          resolve({ status: 'Failed', message: 'User list could not be fetched due to some error' });
        });
      } catch (ex) {
        console.log(ex.message);
      }
    });
  },

  checkUser: () => {
    return new Promise((resolve) => {
      try {
        db.any(`SELECT userrole from federate_sso  where usersystemid='${usertoken}';`)
        .then((userRole) => {
          console.log(userRole.length);
          if (userRole.length > 0) {
            const userRoleName = userRole[0].userrole;
            console.log(userRoleName);
            resolve({ status: 'OK', message: 'Data fetched successfully', userRoleName, authoriseUser: true });
          } else if (userRole.length === 0) {
            let insertQuery = 'INSERT INTO federate_sso(username, useremail, usersystemid,userrole) ';
            insertQuery += ' VALUES($1, $2, $3, $4, $5, $6) ';
            const dataToDump = [];
            dataToDump.push(user_groups.name);
            dataToDump.push(useremails);
            dataToDump.push(userphones);
            dataToDump.push(countrycodes);
            dataToDump.push(usernames);
            db.one(insertQuery, dataToDump).then((data) => {
              console.log(data);
              console.log('SaveFederateUsersGroupInDB end');
                //return status;
                resolve({ status: 'New User Added', message: 'New User Added Please assign role', authoriseUser: false });

            })
            .catch((error) => {
              console.log(error);
              resolve({ status: 'Failed', message: 'Access Denied', authoriseUser: false });
            });

          }
        });
      } catch (ex) {
        console.log(ex.message);
      }
    });
  },

  getUserList: () => {
    return new Promise((resolve) => {
      try {
        db.any('SELECT user_id, A.role_id, B.role_name from user_role_mapping as A INNER JOIN  role_master as B on A.role_id = B.role_id ORDER BY A.modified_date DESC;')
        .then((data) => {
          // success
          console.log('Data recieved');
          console.log(data);
          resolve({ status: 'OK', message: 'Data fetched successfully', records: data });
        })
        .catch((error) => {
          // error
          console.log(error);
          resolve({ status: 'Failed', message: 'User list could not be fetched due to some error' });
        });
      } catch (ex) {
        console.log(ex.message);
      }
    });
  },

  AddUpdateUserRole: (userData) => {
    return new Promise((resolve) => {
      try {
        console.log(userData);
        if (usertoken !== null && usertoken !== '') {
          db.none(`INSERT INTO user_role_mapping (user_id, role_id, created_by) VALUES ('${userData.userId}','${userData.roleId}','${usertoken}') ON CONFLICT (user_id) DO UPDATE SET role_id = '${userData.roleId}', modified_by = '${usertoken}'`)
          .then(() => {
            console.log('User added/updated successfully');
            resolve({ status: 'OK', message: 'User role updated successfully' });
          }).catch((error) => {
            console.log('User addition failed', error);
            resolve({ status: 'Failed', message: 'User role could not be updated due to some error' });
          });
        } else {
          resolve({ status: 'InvalidSession', message: 'Session expired, redirecting to home page' });
        }
      } catch (ex) {
        console.log(ex.message);
      }
    });
  },

  deleteUser: (userData) => {
    return new Promise((resolve) => {
      try {
        console.log(`in delete method ${userData.userId}`);
        db.none('DELETE FROM user_role_mapping WHERE user_id = $1', [userData.userId])
          .then(() => {
            console.log('User deleted successfully');
            resolve({ status: 'OK', message: 'User deleted successfully' });
          }).catch((error) => {
            console.log('Error in deleting user:', error);
            resolve({ status: 'Failed', message: 'User could not be deleted due to some error' });
          });
      } catch (ex) {
        console.log(ex.message);
      }
    });
  },

  gettoken_id: (tokenId) => {
    return new Promise((resolve) => {
      try {
        console.log(tokenId);
        usertoken = tokenId;
        console.log(`this is usr token ${usertoken}`);
        resolve({ status: 'OK', message: 'This is token id' });
      } catch (ex) {
        console.log(ex.message);
      }
    });
  },
};
