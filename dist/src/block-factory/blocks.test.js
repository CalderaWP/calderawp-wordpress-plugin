"use strict";

require("babel-polyfill");

var _blocks = require("./blocks");

describe('namespace', function () {
	it('is correct', function () {
		expect(_blocks.blockDefinitions.namespace).toEqual(_blocks.nameSpace);
	});
});

describe('blocks', function () {
	it('Has the right number of blocks', function () {
		expect(_blocks.blockDefinitions.blocks.length).toEqual(_blocks.blocks.length);
	});
});

//# sourceMappingURL=blocks.test.js.map