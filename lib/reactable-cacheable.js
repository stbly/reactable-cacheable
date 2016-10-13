'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactableCacheableCacheableTable = require('./reactable-cacheable/cacheable-table');

var _reactableCacheableCacheableTable2 = _interopRequireDefault(_reactableCacheableCacheableTable);

var _reactableCacheableCacheableRow = require('./reactable-cacheable/cacheable-row');

var _reactableCacheableCacheableRow2 = _interopRequireDefault(_reactableCacheableCacheableRow);

var _reactable = require('reactable');

var ReactableCacheable = { CacheableTable: _reactableCacheableCacheableTable2['default'], CacheableRow: _reactableCacheableCacheableRow2['default'], Tr: _reactable.Tr, Td: _reactable.Td, Thead: _reactable.Thead, Th: _reactable.Th };
exports['default'] = ReactableCacheable;

if (typeof window !== 'undefined') {
  window.ReactableCacheable = ReactableCacheable;
}
module.exports = exports['default'];
