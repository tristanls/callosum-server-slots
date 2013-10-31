# callosum-server-slots

_Stability: 1 - [Experimental](https://github.com/tristanls/stability-index#stability-1---experimental)_

[![NPM version](https://badge.fury.io/js/callosum-server-slots.png)](http://npmjs.org/package/callosum-server-slots)

Server slot management for [Callosum](https://github.com/tristanls/callosum): a self-balancing distributed services protocol.

## Usage

```javascript
var CallosumServerSlots = require('callosum-server-slots');
var callosumServerSlots = new CallosumServerSlots();

callosumServerSlots.on('error', function (error) {
    console.log(error); 
});

var slot = callosumServerSlots.get();
// after the slot is no longer used
callosumServerSlots.put(slot);
```

## Tests

    npm test

## Overview

Server slot management for [Callosum](https://github.com/tristanls/callosum): a self-balancing distributed services protocol.

The slot manganger will always return the lowest available slot. For example, the following sequence of commands and their results is guaranteed:

```javascript
var assert = require('assert');
var CallosumServerSlots = require('callosum-server-slots');
var callosumServerSlots = new CallosumServerSlots();

callosumServerSlots.on('error', function (error) {
    console.log(error); 
});

var slotA = callosumServerSlots.get();
assert.ok(slotA == 0);

var slotB = callosumServerSlots.get();
assert.ok(slotB == 1);

var slotC = callosumServerSlots.get();
assert.ok(slotC == 2);

callosumServerSlots.put(slotA);
var slotD = callosumServerSlots.get();
assert.ok(slotD == 0);

var slotE = callosumServerSlots.get();
assert.ok(slotE == 3);
```
## Documentation

### CallosumServerSlots

**Public API**

  * [new CallosumServerSlots()](#new-callosumserverslots)
  * [callosumServerSlots.get()](#callosumserverslotsget)
  * [callosumServerSlots.put(slot)](#callosumserverslotsputslot)
  * [Event 'error'](#event-error)

### new CallosumServerSlots()

Creates a new CallosumServerSlots instance.

### callosumServerSlots.get()

  * Return: _Integer_ Next lowest available slot.

### callosumServerSlots.put(slot)

  * `slot`: _Integer_ Slot number previously gotten from this instance.

Puts back the `slot` so that it is available for retrieval again.

### Event `error`

  * `function (error) {}`
    * `error`: _Object_ An error that occurred.

Emitted when CallosumServerSlots encounters an error. If no handler is registered, an exception will be thrown.