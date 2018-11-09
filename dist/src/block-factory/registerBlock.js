'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = registerBlock;

var _createBlockName = require('./createBlockName');

var _createBlockName2 = _interopRequireDefault(_createBlockName);

var _blocks = require('@wordpress/blocks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerBlock(block, namespace) {
	var name = (0, _createBlockName2.default)(namespace, block.slug);
	delete block.wpDependencies;
	delete block.slug;
	return (0, _blocks.registerBlockType)(name, block);
}
module.exports = exports['default'];

//# sourceMappingURL=registerBlock.js.map