'use strict';

onmessage = function(event) {
    var msg = 'This worker called by ' + event.data;
    postMessage(msg);
};
