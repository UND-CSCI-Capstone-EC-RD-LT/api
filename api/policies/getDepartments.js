"use strict";

// policies/canWrite.js
module.exports = function getDepartments (req, res, next) {

	sails.log.debug('getDepartments');
	return next();
	/*
	var query = '';
  
  Departments.query(query).exec(function (err, user) {
    if (err) { return res.serverError(err); }
    req.user.departments = 
    return next();
  });
  */
};