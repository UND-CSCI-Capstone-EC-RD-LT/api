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

        var _items = [];

        var params = {};

        if (departmentId) params = {id: departmentId};

        Department.find().where(params).populate('buildings').exec(function(err, departments) {
            if (err || !departments || departments.length == 0) return next(sails.config.additionals.DEPARTMENT_NOT_FOUND);

            var buildings = [];
            if (!buildingId) {
	            for (var x in departments) {
	                var building = departments[x].buildings;
	                for (var y in building) {
	                    if (building[y].id != null) buildings.push(building[y].id);
	                }
	            }
	          } else {
	          	buildings.push(buildingId);
	          }

	          params = {building: buildings};
	   
            Room.find().where(params).exec(function(err, rooms) {
                if (err || !rooms || rooms.length == 0) return next(sails.config.additionals.ROOM_NOT_FOUND);

                var room = [];
                if (!roomId) {
	                for (var x in rooms) {
	                    if (rooms[x].id != null) room.push(rooms[x].id);
	                }
	              } else {
	              	room.push(roomId);
	              }

	              params = {room: room};

                Item.find().where(params).exec(function(err, items) {
                    if (err || !items || items.length == 0) return next(sails.config.additionals.ITEM_NOT_FOUND);
                    return res.ok(items);
                });
            });
        });
    }
};
