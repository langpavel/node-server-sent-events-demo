
function startEventSource(source) {
  source.addEventListener('message', function(e) {
    document.querySelector('#container').innerHTML +=
      '<br/>' + e.data;
  }, false);
}

if (!!window.EventSource) {

  startEventSource(new EventSource('/events'));

} else {
  // Použijeme náhradní implementaci nebo polyfill - zase ten IE :(
  alert('Tvuj prohlizec nepodporuje EventSource, pouzij polyfill!');
}
