"use strict";

var _blocks = require("./blocks");

var _registerBlock = require("./registerBlock");

var _registerBlock2 = _interopRequireDefault(_registerBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_blocks.blocks.forEach(function (block) {
	(0, _registerBlock2.default)(block, _blocks.nameSpace);
});

//# sourceMappingURL=registerBlocks.js.map