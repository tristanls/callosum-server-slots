/*

test.js - integration test

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

var CallosumServerSlots = require('../index.js');

var test = module.exports = {};

test['new CallosumServerSlots returns zero on first get'] = function (test) {
    test.expect(1);
    var slots = new CallosumServerSlots();
    test.equal(slots.get(), 0);
    test.done();
};

test['CallosumServerSlots returns lowest numbered slot always'] = function (test) {
    test.expect(15000);
    var slots = new CallosumServerSlots();
    for (var i = 0; i < 10000; i++) {
        test.equal(slots.get(), i);
    }
    // return all even slots in reverse order
    for (i = 9998; i >= 0; i -= 2) {
        slots.put(i);
    }
    // should get all even slots in ascending order
    for (i = 0; i < 10000; i += 2) {
        test.equal(slots.get(), i);
    }
    test.done();
};

test['it is an error to put a slot greater than the maximum given out so far'] = function (test) {
    test.expect(1);
    var slots = new CallosumServerSlots();
    slots.on('error', function (error) {
        test.ok(true); // error emitted
        test.done();
    });
    slots.put(17);
};