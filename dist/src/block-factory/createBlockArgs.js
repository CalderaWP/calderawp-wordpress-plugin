'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createBlockArgs;
var findBlock = exports.findBlock = function findBlock(slug, blocks) {
	return blocks.find(function (b) {
		return slug === b.slug;
	});
};

/**
 * Create block arguments to pass to registerBlockType
 */
function createBlockArgs(block, namespace, edit, save) {
	var args = block;
	if (Object.keys(block.attributes).length) {
		//@TODO event here?
		args.attributes = block.attributes;
	}

	if (!block.hasOwnProperty('icon')) {
		block.icon = 'smiley';
	}

	if (!block.hasOwnProperty('category')) {
		block.category = 'common';
	}

	return _extends({}, args, {
		edit: edit,
		save: save
	});
}

//# sourceMappingURL=createBlockArgs.js.map