/**
 * LogController
 *
 * @description :: Server-side logic for managing itemtypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  model: (req, res, next) => Log.find({ model: req.param('model') }).exec((err, logs) => (err || !logs || !logs.length) ? next(sails.config.additionals.LOGS_NOT_FOUND) : res.ok(logs) ),
  modelById: (req, res, next) => Log.find({ model: req.param('model'), params : { 'contains' : `"${req.param('model')}":${req.param('id')}` } }).exec((err, logs) => (err || !logs || !logs.length) ? next(sails.config.additionals.LOGS_NOT_FOUND) : res.ok(logs) ),
};
