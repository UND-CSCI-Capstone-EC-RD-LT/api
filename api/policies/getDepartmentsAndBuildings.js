"use strict";

module.exports = function getDepartmentsAndBuildings(req, res, next) {
    var query = 'SELECT user.premissions FROM user WHERE user.id = ' + req.user.id;

    User.query(query, function(err, user) {
        var premissions = user[0].premissions;

        if (premissions.length > 0) {
            var query = 'SELECT premission.department, premission.building ' +
                'FROM premission WHERE premission.id IN (' + premissions.replace(/[\[\]']+/g,'') + ')';

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
