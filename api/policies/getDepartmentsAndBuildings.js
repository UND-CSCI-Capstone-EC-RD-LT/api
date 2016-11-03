"use strict";

module.exports = function getDepartmentsAndBuildings(req, res, next) {
    User.findOne({ id: req.user.id }).exec(function(err, user) {
        user.premissions = user.premissions ? user.premissions : [];

        if (user.premissions.length > 0) {
            var query = 'SELECT premission.department, premission.building ' +
                'FROM premission WHERE premission.id IN (' + user.premissions + ')';

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
