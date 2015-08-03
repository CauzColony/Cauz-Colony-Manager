var keystone = require('keystone');


exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
  locals = res.locals,
  id = req.body.id;
 
  // Set locals
  locals.section = 'project';
 
  // Load the galleries by sortOrder
  view.query('steps', keystone.list('Step').model.find({project: id}, 'type text videoId optionA optionB optionC optionD _id').sort('sortOrder'));
 
  // Render the view
  view.render(function(e) {
    if (e) return res.apiError('error', e);

    for (var i = locals.steps.length - 1; i >= 0; i--) 
    {
      var step = locals.steps[i].toObject();

      if(step.type === 'survey.multiple-choice')
      {
        step.options = [
          step.optionA,
          step.optionB,
          step.optionC,
          step.optionD
        ];

        locals.steps[i] = step;
      }else if(step.type === 'survey.rating')
      {
        step.options = [ 1, 2, 3, 4 ];
        locals.steps[i] = step;
      }
    }
    
    keystone.list('Project').model.find({_id: id}).populate(['charity', 'offer', 'shareMessage']).sort('sortOrder').exec(function(e, project){
      if (e) return res.apiError('error', e);

      project = project[0];

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.apiResponse({
        title: project.name,
        id: id,
        offer: {
          link: project.offer.link,
          image: project.offer.image.secure_url
        },
        charityId: project.charity._id,
        charityName: project.charity.name,
        steps: locals.steps,
        shareMessage: project.shareMessage
      });
    })
  });
}