/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    search: function(req, res, next) {
        var departmentId = req.param('did');
        var buildingId = req.param('bid');
        var roomId = req.param('rid');

        if (!req.user.departments) return next(sails.config.additionals.MISSING_PREMISSION_DEPARTMENTS);
        if (departmentId && req.user.departments.indexOf(parseInt(departmentId)) == -1) return next(sails.config.additionals.MISSING_PREMISSION_DEPARTMENT);
        if (buildingId && req.user.buildings.indexOf(parseInt(buildingId)) == -1) return next(sails.config.additionals.MISSING_PREMISSION_BUILDING);

        query = 'SELECT item.*, itemtype.name AS typeName, itemtype.description AS typeDescription ' +
            'FROM item ' +
            'INNER JOIN ' +
            '(room INNER JOIN ' + 
            '(building INNER JOIN department ON department.id = building.department) ' +
            'ON building.id = room.building) ' +
            'ON item.room = room.id ' +
            'INNER JOIN itemtype ON itemtype.id = item.type ';

        if (!departmentId) {
            query = query + ' WHERE (department.id IN (' + req.user.departments + '))';
        }

        if (departmentId) {
            query = query + ' WHERE (department.id = ' + departmentId;
            if (buildingId) query = query + ' AND building.id = ' + buildingId; else query = query + ' AND building.id IN (' + req.user.buildings + ')';
            if (roomId) query = query + ' AND room.id = ' + roomId;
            query = query + ')';
        }

        Item.query(query, function(err, items) {
            if (err || !items || items.length == 0) return next(sails.config.additionals.ITEMS_SEARCH_NOT_FOUND);
            return res.ok(items);
        });
    },

    barcode: function(req, res, next) {
        var barcode = req.param('barcode');

        Item.find().where({'barcode' : barcode}).exec(function(err, items) {
            if (err || !items || items.length == 0) return next(sails.config.additionals.ITEM_NOT_FOUND);
            return res.ok(items);
        });
    }
};
