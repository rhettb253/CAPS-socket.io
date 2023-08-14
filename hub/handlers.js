"use strict";

function logIt(payload) {
  console.log("Event:", payload.event);
  console.log("Current time:", getCurrentTime());
  console.log("Payload: ", payload.data);
}

// could have just used console.log(new Date().toLocaleTimeString('en-US', {hour12:false}))
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const currentTime = `${hours}:${minutes}:${seconds}`;
  return currentTime;
}

class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(driverOrPayload) {
    this.queue.unshift(driverOrPayload);
  }

  dequeue() {
    return this.queue.pop();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

module.exports = { Queue, logIt};
