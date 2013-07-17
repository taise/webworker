self.onmessage = function(event) {
  var msg = "This worker called by " + event.data;
    self.postMessage(msg);
}
