var keystone = require('keystone'),
    Answer = keystone.list('Answer').model;


exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
  locals = res.locals,
  answers = req.body.answers;
 
  // Set locals
  locals.section = 'answers';
 
  // Load the galleries by sortOrder
  //view.query('steps', keystone.list('Step').model.find({project: id}, 'type text videoId optionA optionB optionC optionD _id').sort('sortOrder'));
 
  // Render the view
  view.render(function() {
    if(answers && answers instanceof Array)
    {
      for (var i = answers.length - 1; i >= 0; i--) 
      {
        var answer = new Answer(answers[i]);
        answer.save(function(e){
          if (e) return res.apiError('error', e);
        })
      }

      res.setHeader('Access-Control-Allow-Origin', '*');

      res.apiResponse({});
    }else
    {
      res.apiError('error', 'null answers');
    }
  });
}