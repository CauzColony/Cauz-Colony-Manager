var keystone = require('keystone');

exports = module.exports = function(req, res) {
  
  var view = new keystone.View(req, res),
    locals = res.locals,
    _ = require('lodash');

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'Reports';
  //view.query('projects', );

  keystone.list('AnswerSet').model.find({})
  .populate('project')
  .sort('sortOrder')
  .exec(function(e,data)
  {
    locals.projects = _.uniq(_.pluck(data, 'project'));

    view.render('reports/index');
  });
};
