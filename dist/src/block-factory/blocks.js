"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.blocks = exports.nameSpace = exports.blockDefinitions = undefined;

var _createBlockArgs = require("./createBlockArgs");

var _createBlockArgs2 = _interopRequireDefault(_createBlockArgs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var blockDefinitions = exports.blockDefinitions = require('../../blocks.json');
var nameSpace = exports.nameSpace = blockDefinitions.namespace;
var blocks = exports.blocks = [];
blockDefinitions.blocks.forEach(function (thisBlock) {
	blocks.push(thisBlock);
});

//# sourceMappingURL=blocks.js.map