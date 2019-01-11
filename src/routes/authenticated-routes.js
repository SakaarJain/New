// Routes in this module require authentication
import express from 'express';
// Importing the server side modules.
import testFile from '../server-controllers/test';
import users from '../server-controllers/users';
import userRoleManagement from '../server-controllers/userRoleManagement';
import crawler from '../server-controllers/crawler';
//const db = require('../server-controllers/dbconfig');
const pg = require('pg');
//const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

const router = express.Router();

// SSO Authentication will not be checked on these routes
const authCheckarr = ['/crawler'];
// SSO Authentication
router.use('*', (req, res,next) => {
  console.log(req.params[0]);
  //if (authCheckarr.indexOf(req.params[0]) > 0) {
    if (-1 > 0) {
 	console.log('--------------- SSO Auth Required ---------------',req.signedCookies.userid);
 	const userId = req.signedCookies.userid;
  let userRoleName;
  const results = [];
  pg.connect(connectionString, (err, client, done) => {
  // Handle connection errors
  if(err) {
    done();
    console.log(err);
  }
   // SQL Query > Select Data
  const query = client.query(`SELECT userrole FROM federate_sso  where usersystemid='${userId}';`);
  // Stream results back one row at a time
  query.on('row', (row) => {
    console.log(row);
    results.push(row);
    console.log(results.userrole);
  });
  // After all data is returned, close connection and return results
  query.on('end', () => {
    done();
    if (results.userrole === 'Admin') {
    users.GetAllUsersandRenderAdminPage(req, res);
  } else if (results.userrole === 'IT-Admin') {
      users.GetUserGroups(req, res);
    } else {
      // SQL Query > Insert Data
    client.query('INSERT INTO federate_sso(username, useremail, usersystemid,userrole) values($1, $2, $3, $4)',
    ['', '',userId,'IT-Admin']);
    users.GetUserGroups(req, res);
    }

  });
});
}
else {
    console.log('--------------- No SSO Auth Required ---------------');
    const siteurl = req.query.siteurl;
    console.log('In siteurl');
    console.log(siteurl);
    crawler.StartCrawling(siteurl);
    next();
  }
});



router.get('/', (req, res) => {
  res.render('index');
});

// index route
router.get('/about', (req, res) => {
  testFile.test().then((data) => {
    return res.render('about', {
      title: data,
    });
  }).catch((e) => {
    res.status(500, {
      error: e,
    });
  });
});

//admin router
router.get('/admin', (req, res) => {
  users.GetAllUsersandRenderAdminPage(req, res);
});


//Crawler Route
router.get('/crawler', (req, res) => {
  const siteurl = req.query.siteurl;
  console.log('In siteurl');
  console.log(siteurl);
  crawler.StartCrawling(siteurl);
});

//users route
router.get('/users', (req, res) => {
  users.GetUserGroups(req, res);
});

router.get('/new_user_groups', (req, res) => {
  return res.render('user-new');
});

router.get('/user_groups', (req, res) => {
  users.SaveUsersGroupInDB(req, res);
});

router.get('/user_groups_edit', (req, res) => {
  users.UpdateUsersGroupInDB(req, res);
});

router.get('/user_groups_delete', (req, res) => {
  users.DeleteUsersGroupInDB(req, res);
});

module.exports = router;
