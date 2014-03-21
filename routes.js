
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

  // recommended
  res.header('Cache-Control', 'no-cache');

  var eventId = parseInt(req.get('Last-Event-Id') || 0, 16);

  // client should try reconnect after 10 seconds
  res.write('retry: 10000\n');
  // send welcome event with some other kind of information
  res.write('event: welcome\n');
  res.write('data: Hello Server-Sent Events!\n');
  res.write('data: This is example of multiline message.\n');
  // Two following (line above and next line) newline characters
  // indicates event message end
  res.write('\n');

  // send message every second
  var handle = setInterval(function() {
    eventId++;
    var hexEventId = eventId.toString(16);
    // unique event id
    res.write('id: ' + hexEventId + '\n');
    res.write('data: Event 0x' + hexEventId + ': ' + new Date + '\n');
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