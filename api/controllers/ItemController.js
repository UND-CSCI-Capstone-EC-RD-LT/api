/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	search: function (req, res, next) {
		var departmentId = req.param('did');
		var buildingId = req.param('bid');
		var roomId = req.param('rid');

		return res.ok(departmentId + " - " + buildingId + " - " + roomId);
	}
};

