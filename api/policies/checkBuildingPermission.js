"use strict";

module.exports = function checkBuildingPermission(req, res, next) {

    var paths = ['/v1/buildings/:id',
                '/v1/items/search/:did/:bid',
                '/v1/items/search/:did/:bid/:rid',
                '/v1/rooms/building/:id'];

    var buildingId = null;
    var departmentId = null;

    if (paths.indexOf(req.options.detectedVerb.path) == -1) return next();

    if(req.options.model == 'item') {
        buildingId = req.param('bid');
        departmentId = req.param('did');
    } else {
        buildingId = req.param('id');
    }

    var query = 'SELECT permission.buildings FROM permission' +
                ' WHERE permission.department = ' + departmentId + 
                ' AND permission.building = ' + buildingId;

    Permission.query(query, function(err, permissions) {
        var permission = {
            "edit": false,
            "create": false,
            "delete": false,
            "view": false
        };

        if (permissions.length > 0) {
            for (var i = 0; i < permissions.length; i++) {
                permissions[i] = JSON.parse(permissions[i].buildings);
                permission = Object.assign(permission, permissions[i]);
            }

            if (permission.view && req.route.method == 'get') return next();
            if (permission.create && req.route.method == 'post') return next();
            if (permission.edit && req.route.method == 'put') return next();
            if (permission.delete && req.route.method == 'delete') return next();
            return next(sails.config.additionals.MISSING_PREMISSION_BUILDING);
        } else {
            query = 'SELECT permission.buildings FROM permission ' +
                'JOIN building ON building.department = permission.department ' + 
                'WHERE permission.id IN (' + req.user.permissions + ')' + 
                ' AND building.id = ' + buildingId + ' AND permission.building <=> NULL';

            Permission.query(query, function(err, permissions) {
                for (var i = 0; i < permissions.length; i++) {
                    permissions[i] = JSON.parse(permissions[i].buildings);
                    permission = Object.assign(permission, permissions[i]);
                }

                if (permission.view && req.route.method == 'get') return next();
                if (permission.create && req.route.method == 'post') return next();
                if (permission.edit && req.route.method == 'put') return next();
                if (permission.delete && req.route.method == 'delete') return next();
                return next(sails.config.additionals.MISSING_PREMISSION_BUILDING);
            });
        }
    });
};
