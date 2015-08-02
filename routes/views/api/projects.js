var keystone = require('keystone');


exports = module.exports = function(req, res) {
 
  var view = new keystone.View(req, res),
  locals = res.locals,
  query = (req.query.testing)? {testing: true}:{active: true},
  payload;
 
  // Set locals
  locals.section = 'project';
 
  // Load the galleries by sortOrder
  view.query('projects', keystone.list('Project').model.find(query).populate('charity').sort('sortOrder'));
 
  // Render the view
  view.render(function(err) {
    var ret = [],
        i = 0,
        limit = locals.projects.length,
        item;


    if (err) return res.apiError('error', err);

    for (i; i < limit; i++) {
      item = locals.projects[i];
      ret.push({
        id: item._id,
        image: item.charity.logo.secure_url
      })
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.apiResponse(ret);
  });
}