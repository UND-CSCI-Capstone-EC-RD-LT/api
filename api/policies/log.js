"use strict";

module.exports = function log(req, res, next) {
  if (req.options.model == 'log') return next();

  let data = {
    user: req.user.id,
    action: req.options.action,
    model: req.options.model,
    params: JSON.parse(`{${Object.keys(req.params).map(key => `"${key}":${req.params[key]}`).join(',')}}`)
  };

  Log.create(data).exec((err, log) => err ? res.serverError(err) : next());
};
