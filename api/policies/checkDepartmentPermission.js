"use strict";

module.exports = function checkDepartmentPermission(req, res, next) {

    var paths = ['/v1/departments/:id',
                '/v1/items/search/:did',
                '/v1/items/search/:did/:bid',
                '/v1/items/search/:did/:bid/:rid',
                '/v1/buildings/department/:id',
                '/v1/departments/:id/building'];

    var departmentId = null;

    if (paths.indexOf(req.options.detectedVerb.path) == -1) return next();

    if(req.options.model == 'item') {
        departmentId = req.param('did');
    } else {
        departmentId = req.param('id');
    }

    var query = 'SELECT permission.departments FROM permission ' +
                'WHERE permission.id IN (' + req.user.permissions + ') AND permission.department = ' + departmentId;

    Permission.query(query, function(err, permissions) {
        var permission = {
            "edit": false,
            "create": false,
            "delete": false,
            "view": false
        };

        for (var i = 0; i < permissions.length; i++) {
            permissions[i] = JSON.parse(permissions[i].departments);
            permission = Object.assign(permission, permissions[i]);
        }

        if (permission.view && req.route.method == 'get') return next();
        if (permission.create && req.route.method == 'post') return next();
        if (permission.edit && req.route.method == 'put') return next();
        if (permission.delete && req.route.method == 'delete') return next();
        return next(sails.config.additionals.MISSING_PREMISSION_DEPARTMENTS);
    });
};
