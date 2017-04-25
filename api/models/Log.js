/**
 * Log.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {
    user: {
      model: 'User',
      required: true
    },

    action: {
      type: 'string',
      required: true
    },

    model: {
      type: 'string',
      required: true,
    },

    params: {
      type: 'json',
      required: true
    },

    toJSON() {
      return this.toObject();
    }
  },

  beforeUpdate: (values, next) => next(),
  beforeCreate: (values, next) => next(),
  beforeValidate: (values, next) => next(),
};
