
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};


/*
 * GET event source.
 */

exports.events = function(req, res){
  res.header('Content-Type', 'text/event-stream;encoding=utf-8');

  setInterval(function() {
    res.write('data: ' + (new Date).toISOString() + '\n\n', 'utf-8');
  }, 1000);

};