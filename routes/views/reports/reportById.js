var keystone = require('keystone');

exports = module.exports = function(req, res) {
  
  var view = new keystone.View(req, res),
      _ = require('lodash'),
    locals = res.locals,
    AnswerSet = keystone.list('AnswerSet'),
    express = require('express'),
    csv = require('csv'),
    moment = require('moment');

  AnswerSet.model
  .find({project: req.query.project})
  .populate('answers project')
  .sort('date')
  .exec()
  .then(function(sets)
  {
    if(sets && sets.length > 0)
    {
      var projectName = sets[0].project.name,
      header = ['Date Submitted'],
      source = [];
      for (var i = 0; i < sets.length; i++)
      {
        var line = [moment(sets[i].date).format('M/D/YY H:mm:ss')];
        for (var j = 0; j < sets[i].answers.length; j++)
        {
          if(i === 0)
          {
            header.push('Answer ' + (j + 1))
          }
          line.push(sets[i].answers[j].answer);
        };

        source.push(line);
      };

      var retArray = [header];
      retArray = retArray.concat(source);
    }

  
    try {
      res.attachment(sets[0].project.name + '.csv');
      csv().from(retArray).to(res);
    }
    catch(err) {
      console.log('error',err)
      res.send(err);
    }

  });
  
};
