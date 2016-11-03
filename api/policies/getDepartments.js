"use strict";

module.exports = function getDepartments(req, res, next) {

    var departmentId = req.param('did');

    var query = 'SELECT user.premissions FROM user WHERE user.id = ' + req.user.id;

    User.query(query, function(err, user) {
        var premissions = user[0].premissions.split(',');
        if (premissions.length > 0) {
            var query = 'SELECT premission.department, premission.building ' +
                'FROM premission WHERE premission.id IN (' + premissions + ')';
            Premission.query(query, function(err, premission) {
            		req.user.departments = [];
            		req.user.buildings = [];
                for (var i = 0; i < premission.length; i++) {
                		if (premission[i].department != null) req.user.departments.push(premission[i].department);
                		if (premission[i].building != null) req.user.buildings.push(premission[i].building);
                }
                return next();
            });
        } else {
            return next();
        }
    });
};
