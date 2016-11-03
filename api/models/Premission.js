/**
 * Premission.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,

    attributes: {
        creator: {
            model: 'User',
            required: true
        },

        department: {
            model: 'Department',
            required: true
        },

        building: {
            model: 'Building',
            defaultsTo: null
        },

        name: {
            type: 'text',
            required: true
        },

        user: {
            type: 'json',
            defaultsTo: null
        },

        premission: {
            type: 'json',
            defaultsTo: null
        },

        department: {
            type: 'json',
            defaultsTo: null
        },

        building: {
            type: 'json',
            defaultsTo: null
        },

        room: {
            type: 'json',
            defaultsTo: null
        },

        item: {
            type: 'json',
            defaultsTo: null
        },

        itemtype: {
            type: 'json',
            defaultsTo: null
        },

        toJSON() {
            return this.toObject();
        }
    },

    beforeUpdate: (values, next) => next(),
    beforeCreate: (values, next) => next(),
    beforeValidate(values, next) {
    var userId = values.creator;
    if (userId) {
        User.findOne(userId, function(err, user) {
            if (err || !user) return next(sails.config.additionals.USER_NOT_FOUND);
            return next();
        });
    } else {
            return next();
    }
},

};
