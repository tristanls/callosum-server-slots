/*

index.js - "callosum-server-slots": Server slot management for Callosum: a 
                   self-balancing distributed services protocol

The MIT License (MIT)

Copyright (c) 2013 Tristan Slominski

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/

"use strict";

var events = require('events'),
    PriorityQueue = require('priority-heap-queue'),
    util = require('util');

var CallosumServerSlots = module.exports = function CallosumServerSlots () {
    var self = this;
    events.EventEmitter.call(self);

    self.minQueue = new PriorityQueue({kind: 'min'});
    self.maxSlotGiven = 0; 
};

util.inherits(CallosumServerSlots, events.EventEmitter);

CallosumServerSlots.prototype.get = function get () {
    var self = this;

    var slot = self.minQueue.extractMin();
    if (slot === undefined) {
        slot = self.maxSlotGiven;
        self.maxSlotGiven++;
    }
    return slot;
};

/*
  * `slot`: _Integer_ Slot number previously gotten from this instance.
*/
CallosumServerSlots.prototype.put = function put (slot) {
    var self = this;

    if (slot >= self.maxSlotGiven)
        return self.emit('error', new Error('Invalid slot: ' + slot));

    self.minQueue.insert(slot, slot);
};