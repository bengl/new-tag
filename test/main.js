const pitesti = require('pitesti');
window.assert = require('assert');
const { Writable } = require('stream');
require('../index.js');

const done = window.hostDone ? x => setTimeout(() => hostDone(x), 1) : () => {};
const write = window.hostWrite ? hostWrite : () => {}
const out = document.getElementById('test-output');
const outputStream = new Writable({
  write(chunk, encoding, cb) {
    out.innerHTML += chunk;
    write(chunk);
    cb();
  }
});

window.test = pitesti({ outputStream, done });
