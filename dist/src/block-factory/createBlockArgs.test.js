'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createBlockArgs = require('./createBlockArgs');

var _createBlockArgs2 = _interopRequireDefault(_createBlockArgs);

var _element = require('@wordpress/element');

var _registerBlock = require('./registerBlock');

var _registerBlock2 = _interopRequireDefault(_registerBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var blocks = JSON.parse('{\n\t"packageName": "calderaWordPressPlugin",\n\t"namespace": "caldera-wordpress-plugin",\n\t"blocks":\n\t\t[\n\t\t\t{\n\t\t\t\t"title" : "Say Hi",\n\t\t\t\t"slug": "hello",\n\t\t\t\t"wpDependencies": [\n\t\t\t\t\t"editor",\n\t\t\t\t\t"components"\n\t\t\t\t],\n\t\t\t\t"attributes" :{\n\t\t\t\t\t"name": {\n\t\t\t\t\t\t"type": "string",\n\t\t\t\t\t\t"default": "Roy"\n\t\t\t\t\t},\n\t\t\t\t\t"salutation": {\n\t\t\t\t\t\t"type": "string",\n\t\t\t\t\t\t"default": "Hi"\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t]\n}');

var Edit = function Edit(props) {
	return (0, _element.createElement)('div', {}, 'Edit Callback');
};

var Save = function Save(props) {
	return (0, _element.createElement)('div', {}, 'Save Callback');
};

var theBlock = (0, _createBlockArgs.findBlock)('hello', blocks.blocks);
var prepared = (0, _createBlockArgs2.default)(theBlock, blocks.namespace, Edit, Save);

describe('findBlock', function () {
	it('finds a block', function () {
		expect((0, _createBlockArgs.findBlock)('hello', blocks.blocks)).toEqual(blocks.blocks[0]);
	});
});
describe('createBlockArgs', function () {

	it('adds edit callback', function () {
		expect(_typeof(prepared.edit)).toBe('function');
	});
	it('adds save callback', function () {
		expect(_typeof(prepared.save)).toBe('function');
	});
	it('adds missing icon ', function () {
		expect(prepared.icon).toBe('smiley');
	});
	it('Does not ovveride icon when passed  ', function () {
		var prepared = (0, _createBlockArgs2.default)(_extends({}, theBlock, {
			icon: 'contact'
		}), blocks.namespace, Edit, Save);
		expect(prepared.icon).toBe('contact');
	});

	it('adds missing category ', function () {
		expect(prepared.category).toBe('common');
	});
	it('Does not ovveride category when passed  ', function () {
		var prepared = (0, _createBlockArgs2.default)(_extends({}, theBlock, {
			category: 'widget'
		}), blocks.namespace, Edit, Save);
		expect(prepared.category).toBe('widget');
	});

	it('deletes slug and wp depencies', function () {
		expect(prepared.hasOwnProperty('wpDependencies')).toBe(false);
		expect(prepared.hasOwnProperty('slug')).toBe(false);
	});

	it('Matches snapshot', function () {
		expect(JSON.stringify(prepared)).toMatchSnapshot();
	});
});

describe('registerBlock', function () {
	var block = (0, _registerBlock2.default)(prepared, blocks.namespace);

	it('returns well-formed object', function () {
		expect(typeof block === 'undefined' ? 'undefined' : _typeof(block)).toBe('object');
		expect(block.attributes.name.default).toBe('Roy');
		expect(_typeof(block.edit)).toBe('function');
		expect(_typeof(block.save)).toBe('function');
	});
	it('Removed unheeded props', function () {
		expect(block.hasOwnProperty('slug')).toBe(false);
		expect(block.hasOwnProperty('wpDependencies')).toBe(false);
	});
});

//# sourceMappingURL=createBlockArgs.test.js.map