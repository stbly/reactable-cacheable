'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _node_modulesReactableLibReactableLibFilter_props_from = require('./../../node_modules/reactable/lib/reactable/lib/filter_props_from');

var _node_modulesReactableLibReactableLibExtract_data_from = require('./../../node_modules/reactable/lib/reactable/lib/extract_data_from');

var _node_modulesReactableLibReactableUnsafe = require('./../../node_modules/reactable/lib/reactable/unsafe');

var _reactable = require('reactable');

var _cacheableRow = require('./cacheable-row');

var _cacheableRow2 = _interopRequireDefault(_cacheableRow);

var CacheableTable = (function (_Table) {
    _inherits(CacheableTable, _Table);

    function CacheableTable(props) {
        _classCallCheck(this, CacheableTable);

        _get(Object.getPrototypeOf(CacheableTable.prototype), 'constructor', this).call(this, props);
        this.rowData = {};
    }

    _createClass(CacheableTable, [{
        key: 'initialize',
        value: function initialize(props) {
            _get(Object.getPrototypeOf(CacheableTable.prototype), 'initialize', this).call(this, props);

            this.data = this.indexData(this.data);
        }
    }, {
        key: 'indexData',
        value: function indexData(data) {
            return data.map(function (item, index) {
                return Object.assign({}, item, {
                    cacheId: index + 1
                });
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // console.log('componentWillReceiveProps()')
            // if (this.props.data) {
            //     console.log('data exists')
            //     if ( nextProps.data !== this.props.data ) this.resetCache()
            // } else if (this.props.resetCache) {
            //     console.log('resetCache property engaged')
            //     this.resetCache()
            // } else {
            //     console.log('not clearing row cache')
            // }
            // this.updatedIndexedData( nextProps.data )   

            // console.log('-----------------------')
            _get(Object.getPrototypeOf(CacheableTable.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
        }
    }, {
        key: 'resetCache',
        value: function resetCache() {
            console.log('reset cache');
            this.rowData = null;
        }
    }, {
        key: 'parseChildData',
        value: function parseChildData(props) {
            var data = [],
                tfoot = undefined;

            // Transform any children back to a data array
            if (typeof props.children !== 'undefined') {
                _react2['default'].Children.forEach(props.children, (function (child) {
                    if (typeof child === 'undefined' || child === null) {
                        return;
                    }

                    switch (child.type) {
                        case _reactable.Thead:
                            break;
                        case _reactable.Tfoot:
                            if (typeof tfoot !== 'undefined') {
                                console.warn('You can only have one <Tfoot>, but more than one was specified.' + 'Ignoring all but the last one');
                            }
                            tfoot = child;
                            break;
                        case _cacheableRow2['default']:
                        case _reactable.Tr:
                            var childData = child.props.data || {};

                            _react2['default'].Children.forEach(child.props.children, function (descendant) {
                                // TODO
                                /* if (descendant.type.ConvenienceConstructor === Td) { */
                                if (typeof descendant !== 'object' || descendant == null) {
                                    return;
                                } else if (typeof descendant.props.column !== 'undefined') {
                                    var value = undefined;

                                    if (typeof descendant.props.data !== 'undefined') {
                                        value = descendant.props.data;
                                    } else if (typeof descendant.props.children !== 'undefined') {
                                        value = descendant.props.children;
                                    } else {
                                        console.warn('exports.Td specified without ' + 'a `data` property or children, ' + 'ignoring');
                                        return;
                                    }

                                    childData[descendant.props.column] = {
                                        value: value,
                                        props: (0, _node_modulesReactableLibReactableLibFilter_props_from.filterPropsFrom)(descendant.props),
                                        __reactableMeta: true
                                    };
                                } else {
                                    console.warn('exports.Td specified without a ' + '`column` property, ignoring');
                                }
                            });

                            data.push({
                                data: childData,
                                props: (0, _node_modulesReactableLibReactableLibFilter_props_from.filterPropsFrom)(child.props),
                                __reactableMeta: true
                            });
                            break;

                        default:
                            console.warn('The only possible children of <Table> are <Thead>, <Tr>, ' + 'or one <Tfoot>.');
                    }
                }).bind(this));
            }

            return { data: data, tfoot: tfoot };
        }
    }, {
        key: 'createRows',
        value: function createRows(userColumnsSpecified, columns) {
            var _this = this;

            var dataMap = [];

            var data = this.data;

            if (data && typeof data.map === 'function') {
                // Build up the columns array
                return data.map(function (rawData, i) {
                    var data = rawData;
                    var props = {};
                    var cacheId = rawData.cacheId;

                    if (rawData.__reactableMeta === true) {
                        data = rawData.data;
                        props = rawData.props;
                    }

                    // Loop through the keys in each data row and build a td for it
                    for (var k in data) {
                        if (userColumnsSpecified === false && k !== 'cacheId') {
                            // Update the columns array with the data's keys if columns were not
                            // already specified

                            if (userColumnsSpecified === false) {
                                (function () {
                                    var column = {
                                        key: k,
                                        label: k
                                    };

                                    // Only add a new column if it doesn't already exist in the columns array
                                    if (columns.find(function (element) {
                                        return element.key === column.key;
                                    }) === undefined) {
                                        columns.push(column);
                                    }
                                })();
                            }
                        }
                    }

                    var existingRow = _this.rowData[cacheId];
                    if (!existingRow || existingRow.data !== data) {
                        existingRow = _this.rowData[cacheId] = {
                            row: _react2['default'].createElement(_reactable.Tr, _extends({ columns: columns, key: cacheId, data: data }, props)),
                            data: data
                        };
                    }

                    return existingRow.row;
                });
            } else {
                return [];
            }
        }

        /*
            applyFilter(filter, children) {
                // Helper function to apply filter text to a list of table rows
                filter = filter.toLowerCase();
                let matchedChildren = [];
        
                return children.map( child => {
        
                    let data = child.props.data;
        
                    for (let filterColumn in this._filterable) {
                        if (typeof(data[filterColumn]) !== 'undefined') {
                            // Default filter
                            if (typeof(this._filterable[filterColumn]) === 'undefined' || this._filterable[filterColumn]=== 'default') {
                                if (extractDataFrom(data, filterColumn).toString().toLowerCase().indexOf(filter) > -1) {
                                    return child
                                } else {
                                    return React.cloneElement(child, {style: {display: 'none'}} )
                                }
                            } else {
                                // Apply custom filter
                                if (this._filterable[filterColumn](extractDataFrom(data, filterColumn).toString(), filter)) {
                                    return child
                                } else {
                                    return React.cloneElement(child, {style: {display: 'none'}} )
                                }
                            }
                        }
                    }
                })
            }*/
        /*
        applyFilter(filter, children) {
            // Helper function to apply filter text to a list of table rows
            filter = filter.toLowerCase();
            let matchedChildren = [];
             for (let i = 0; i < children.length; i++) {
                let data = children[i].props.data;
                 for (let filterColumn in this._filterable) {
                    var foundColumn = data[filterColumn]
                    if (typeof(foundColumn) !== 'undefined') {
                         console.log(foundColumn)
                        // Default filter
                        if (typeof(this._filterable[filterColumn]) === 'undefined' || this._filterable[filterColumn]=== 'default') {
                            var extractedData = extractDataFrom(data, filterColumn).toString().toLowerCase()
                            
                            
                            if ( extractedData.indexOf(filter) > -1) {
                                console.log('case 1', extractedData, filter)
                                matchedChildren.push(children[i]);
                                break;
                            }
                        } else {
                            var filterFunction = this._filterable[filterColumn]
                            var extractedData = extractDataFrom(data, filterColumn).toString()
                            var functionResult = filterFunction(extractedData, filter)
                            // Apply custom filter
                             if ( functionResult ) {
                                console.log('case 2', filterFunction, functionResult)
                                matchedChildren.push(children[i]);
                                
                                console.log('---------------------------')
                                break;
                            }
                        }
                    }
                }
            }
             return matchedChildren;
        }*/

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var children = [];
            var columns = undefined;
            var userColumnsSpecified = false;
            var showHeaders = typeof this.props.hideTableHeader === 'undefined';

            var firstChild = null;

            if (this.props.children) {
                if (this.props.children.length > 0 && this.props.children[0] && this.props.children[0].type === _reactable.Thead) {
                    firstChild = this.props.children[0];
                } else if (this.props.children.type === _reactable.Thead) {
                    firstChild = this.props.children;
                }
            }

            if (firstChild !== null) {
                columns = _reactable.Thead.getColumns(firstChild);
            } else {
                columns = this.props.columns || [];
            }

            if (columns.length > 0) {
                userColumnsSpecified = true;
                columns = this.translateColumnsArray(columns);
            }

            // Build up table rows
            children = this.createRows(userColumnsSpecified, columns);

            if (this.props.sortable === true) {
                for (var i = 0; i < columns.length; i++) {
                    this._sortable[columns[i].key] = 'default';
                }
            }

            // Determine if we render the filter box
            var filtering = false;
            if (this.props.filterable && Array.isArray(this.props.filterable) && this.props.filterable.length > 0 && !this.props.hideFilterInput) {
                filtering = true;
            }

            // Apply filters
            var filteredChildren = children;
            if (this.state.filter !== '') {
                filteredChildren = this.applyFilter(this.state.filter, filteredChildren);
            }

            // Determine pagination properties and which columns to display
            var itemsPerPage = 0;
            var pagination = false;
            var numPages = undefined;
            var currentPage = this.state.currentPage;
            var pageButtonLimit = this.props.pageButtonLimit || 10;

            var currentChildren = filteredChildren;
            if (this.props.itemsPerPage > 0) {
                itemsPerPage = this.props.itemsPerPage;
                numPages = Math.ceil(filteredChildren.length / itemsPerPage);

                if (currentPage > numPages - 1) {
                    currentPage = numPages - 1;
                }

                pagination = true;
                currentChildren = filteredChildren.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            }

            // Manually transfer props
            var props = (0, _node_modulesReactableLibReactableLibFilter_props_from.filterPropsFrom)(this.props);

            var noDataText = this.props.noDataText ? _react2['default'].createElement(
                'tr',
                { className: 'reactable-no-data' },
                _react2['default'].createElement(
                    'td',
                    { colSpan: columns.length },
                    this.props.noDataText
                )
            ) : null;

            var tableHeader = null;
            if (columns && columns.length > 0 && showHeaders) {
                tableHeader = _react2['default'].createElement(_reactable.Thead, { columns: columns,
                    filtering: filtering,
                    onFilter: function (filter) {
                        _this2.setState({ filter: filter });
                        if (_this2.props.onFilter) {
                            _this2.props.onFilter(filter);
                        }
                    },
                    filterPlaceholder: this.props.filterPlaceholder,
                    filterClassName: this.props.filterClassName,
                    currentFilter: this.state.filter,
                    sort: this.state.currentSort,
                    sortableColumns: this._sortable,
                    onSort: this.onSort.bind(this),
                    key: 'thead' });
            }
            return _react2['default'].createElement(
                'table',
                props,
                tableHeader,
                _react2['default'].createElement(
                    'tbody',
                    { className: 'reactable-data', key: 'tbody' },
                    currentChildren.length > 0 ? currentChildren : noDataText
                ),
                pagination === true ? _react2['default'].createElement(_reactable.Paginator, { colSpan: columns.length,
                    pageButtonLimit: pageButtonLimit,
                    numPages: numPages,
                    currentPage: currentPage,
                    onPageChange: function (page) {
                        _this2.setState({ currentPage: page });
                        if (_this2.props.onPageChange) {
                            _this2.props.onPageChange(page);
                        }
                    },
                    previousPageLabel: this.props.previousPageLabel,
                    nextPageLabel: this.props.nextPageLabel,
                    key: 'paginator' }) : null,
                this.tfoot
            );
        }
    }]);

    return CacheableTable;
})(_reactable.Table);

exports['default'] = CacheableTable;
module.exports = exports['default'];
