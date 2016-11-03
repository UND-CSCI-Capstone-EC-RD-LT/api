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

        if (!req.user.departments) return res.json('User does not have premissions for any department.');
        if (departmentId && req.user.departments.indexOf(parseInt(departmentId)) == -1) return res.json('User does not have premission to access this department.');
        if (!req.user.buildings) return res.json('User does not have premissions for any building.');
        if (buildingId && req.user.buildings.indexOf(parseInt(buildingId)) == -1) return res.json('User does not have premission to access this building.');

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
    }
};
