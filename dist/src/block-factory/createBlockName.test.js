'use strict';

var _createBlockName = require('./createBlockName');

var _createBlockName2 = _interopRequireDefault(_createBlockName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('createBlockName', function () {

	it('is correct', function () {
		expect((0, _createBlockName2.default)('namespace', 'roy')).toBe('namespace/roy');
	});
});

//# sourceMappingURL=createBlockName.test.js.map