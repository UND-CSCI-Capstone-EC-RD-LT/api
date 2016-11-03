"use strict";

module.exports = function getDepartmentsAndBuildings(req, res, next) {
    var query = 'SELECT premission.department, premission.building ' +
        'FROM premission WHERE premission.id IN (' + req.user.premissions + ')';

    Premission.query(query, function(err, premissions) {
        req.user.departments = [];
        req.user.buildings = [];

        for (var i = 0; i < premissions.length; i++) {
            if (premissions[i].department != null) req.user.departments.push(premissions[i].department);
            if (premissions[i].building != null) req.user.buildings.push(premissions[i].building);
        }
        return next();
    });
};
