(function () {
  var worker = new Worker('/js/worker.js');
  worker.postMessage("ui-thread");
  worker.onmessage = function(event) {
   console.log(event.data);
  };
})();
