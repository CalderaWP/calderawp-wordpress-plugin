"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createBlockName;


/**
 * Create the block's name based on slug and namespace
 *
 * @param namespace
 * @param slug
 * @return {string}
 */
function createBlockName(namespace, slug) {
  return namespace + "/" + slug;
}
module.exports = exports["default"];

//# sourceMappingURL=createBlockName.js.map