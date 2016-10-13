'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _libReactableCacheable = require('./../../lib/reactable-cacheable');

var Container = (function (_React$Component) {
	_inherits(Container, _React$Component);

	function Container(props) {
		_classCallCheck(this, Container);

		_get(Object.getPrototypeOf(Container.prototype), 'constructor', this).call(this, props);
		this.state = {
			data: [{
				name: 'Name 1',
				age: '32'
			}, {
				name: 'Name 2',
				age: '21'
			}, {
				name: 'Name 3',
				age: '59'
			}]
		};
	}

	_createClass(Container, [{
		key: 'addItem',
		value: function addItem() {
			var data = this.state.data;
			data.push({ name: 'new name', age: '23' });
			this.setState({
				data: data
			});
		}
	}, {
		key: 'getRows',
		value: function getRows() {
			var data = this.state.data;
			return data.map(function (item, index) {
				var key = 'row-' + index;

				console.log('get rows');
				return _react2['default'].createElement(
					_libReactableCacheable.Tr,
					{ key: key },
					_react2['default'].createElement(
						_libReactableCacheable.Td,
						{ key: key + item.name, column: 'name', data: item.name },
						item.name
					),
					_react2['default'].createElement(
						_libReactableCacheable.Td,
						{ key: key + item.age, column: 'age', data: item.age },
						item.age
					)
				);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			console.log('render');
			return _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement(
					_libReactableCacheable.CacheableTable,
					{ sortable: true, filterable: ['name'] },
					this.getRows()
				),
				_react2['default'].createElement(
					'button',
					{ onClick: this.addItem.bind(this) },
					' Add Item '
				)
			);
		}
	}]);

	return Container;
})(_react2['default'].Component);

(0, _reactDom.render)(_react2['default'].createElement(Container, null), document.getElementById('root'));
