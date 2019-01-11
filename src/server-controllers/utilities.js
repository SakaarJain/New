const appDataObj = require('../server-controllers/appObjects');
// Get User Dashboard Data
exports.GetDasboardData = function GetDasboardData(userData) {
	const user = [];
  for(let i = 0; i < userData.length; i++){
		const userDashboardData = new appDataObj.AdminDashboard();
		userDashboardData.systemid= userData[i].usersystemid;
		userDashboardData.userRole=userData[i].userrole;
		if(userDashboardData.userRole==='Admin'){
		userDashboardData.isAdmin=true;
		}
		user.push(userDashboardData);
	}
	return user;
}
