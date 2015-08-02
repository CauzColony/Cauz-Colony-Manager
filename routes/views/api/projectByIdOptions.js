var keystone = require('keystone');


exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
  locals = res.locals;
 
  // Set locals
  locals.section = 'project';
 
  // Load the galleries by sortOrder
  //view.query('steps', keystone.list('Step').model.find({project: id}, 'type text videoId optionA optionB optionC optionD _id').sort('sortOrder'));
 
  // Render the view
  view.render(function() {
    if (e) return res.apiError('error', e);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.apiResponse({});
  });
}