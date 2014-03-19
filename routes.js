
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index');
};


/*
 * GET event source.
 */

exports.events = function(req, res) {
  console.log("Client connected");

  res.header('Content-Type', 'text/event-stream; charset=UTF-8');

  res.write('data: Hello Server-Sent Events!\n');
  res.write('data: This is example of multiline message.\n');
  // Two following (line above and next line) newline characters
  // indicates event message end
  res.write('\n');

  // send message every second
  var handle = setInterval(function() {
    res.write('data: ' + new Date + '\n');
    // Two following (line above and next line) newline characters
    // indicates event message end
    res.write('\n');
  }, 1000);

  // when client disconnects
  res.on('close', function() {
    console.log("Client disconnected");
    clearInterval(handle);
  });

  // when server disconnects using res.end()
  res.on('finish', function() {
    console.log("Server disconnected");
    clearInterval(handle);
  });

  // uncomment this to simulate server fault after 30 seconds
  /*
  setTimeout(function() {
    res.end();
  }, 30000);
  */
};