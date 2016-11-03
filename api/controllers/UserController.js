"use strict";

/**
 * UserController
 * @description :: Server-side logic for manage users
 */

module.exports = {
    addPremission: function(req, res, next) {
        User.findOne({ id: req.user.id }).exec(function(err, user) {
        		user.premissions = user.premissions ? user.premissions : [];
            if(user.premissions.indexOf(req.body.premission) != -1) return res.json('User Already Has this premission.');
            user.premissions.push(req.body.premission);
          	user.save(function (err) { 
          		return res.json(user);
          	});
        });
    },

    removePremission: function(req, res, next) {
        User.findOne({ id: req.user.id }).exec(function(err, user) {
        		user.premissions = user.premissions ? user.premissions : [];
        		var index = user.premissions.indexOf(req.body.premission);
            if(index == -1) return res.json('User does not have this premission.');
            user.premissions.splice(index, 1);
          	user.save(function (err) { 
          		return res.json(user);
          	});
        });
    }
};
