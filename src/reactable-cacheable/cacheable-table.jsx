import React from 'react';
import { filterPropsFrom } from './../../node_modules/reactable/lib/reactable/lib/filter_props_from';
import { extractDataFrom } from './../../node_modules/reactable/lib/reactable/lib/extract_data_from';
import { isUnsafe } from './../../node_modules/reactable/lib/reactable/unsafe';

import { Table, Thead, Th, Tr, Td, Tfoot, Paginator } from 'reactable'
import CacheableRow from './cacheable-row'

class CacheableTable extends Table {
    
    constructor(props) {
        super(props)
        this.rowData = {}
    }

    initialize(props) {
        super.initialize(props)
        
        this.data = this.indexData(this.data)
    }

    indexData (data) {
        return data.map( (item, index) => {
            return Object.assign({}, item, {
                cacheId: index + 1
            })
        })
    }

    componentWillReceiveProps(nextProps) {
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
        super.componentWillReceiveProps(nextProps)
    }

    resetCache() {
        console.log('reset cache')
        this.rowData = null
    }


    parseChildData(props) {
        let data = [], tfoot;

        // Transform any children back to a data array
        if (typeof(props.children) !== 'undefined') {
            React.Children.forEach(props.children, function(child) {
                if (typeof(child) === 'undefined' || child === null) {
                    return;
                }
                        
                switch (child.type) {
                    case Thead:
                    break;
                    case Tfoot:
                        if (typeof(tfoot) !== 'undefined') {
                            console.warn ('You can only have one <Tfoot>, but more than one was specified.' +
                                          'Ignoring all but the last one');
                        }
                        tfoot = child;
                    break;
                    case CacheableRow:
                    case Tr:
                        let childData = child.props.data || {};

                        React.Children.forEach(child.props.children, function(descendant) {
                            // TODO
                            /* if (descendant.type.ConvenienceConstructor === Td) { */
                            if (
                                typeof(descendant) !== 'object' ||
                                descendant == null
                            ) {
                                return;
                            } else if (typeof(descendant.props.column) !== 'undefined') {
                                let value;

                                if (typeof(descendant.props.data) !== 'undefined') {
                                    value = descendant.props.data;
                                } else if (typeof(descendant.props.children) !== 'undefined') {
                                    value = descendant.props.children;
                                } else {
                                    console.warn('exports.Td specified without ' +
                                                 'a `data` property or children, ' +
                                                 'ignoring');
                                    return;
                                }

                                childData[descendant.props.column] = {
                                    value: value,
                                    props: filterPropsFrom(descendant.props),
                                    __reactableMeta: true
                                };
                            } else {
                                console.warn('exports.Td specified without a ' +
                                             '`column` property, ignoring');
                            }
                        });

                        data.push({
                            data: childData,
                            props: filterPropsFrom(child.props),
                            __reactableMeta: true
                        });
                    break;

                    default:
                        console.warn ('The only possible children of <Table> are <Thead>, <Tr>, ' +
                                      'or one <Tfoot>.');
                }
            }.bind(this));
        }

        return { data, tfoot };
    }

    createRows (userColumnsSpecified, columns) {
        var dataMap = []

        var data = this.data

        if (data && typeof data.map === 'function') {
            // Build up the columns array
            return data.map( (rawData, i) => {
                let data = rawData;
                let props = {};
                let cacheId = rawData.cacheId

                if (rawData.__reactableMeta === true) {
                    data = rawData.data;
                    props = rawData.props;
                }

                // Loop through the keys in each data row and build a td for it
                for (let k in data) {
                    if (userColumnsSpecified === false && k !== 'cacheId') {
                        // Update the columns array with the data's keys if columns were not
                        // already specified

                        if (userColumnsSpecified === false) {
                            let column = {
                                key:   k,
                                label: k
                            };

                            // Only add a new column if it doesn't already exist in the columns array
                            if (
                                columns.find(function(element) {
                                return element.key === column.key;
                            }) === undefined
                            ) {
                                columns.push(column);
                            }
                        }
                    }
                }

                let existingRow = this.rowData[cacheId]
                if (!existingRow || existingRow.data !== data) {
                    existingRow = this.rowData[cacheId] = {
                        row: <Tr columns={columns} key={cacheId} data={data} {...props} />,
                        data
                    }
                }

                return existingRow.row
            })
        } else {
            return []
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

    render() {
        let children = []
        let columns;
        let userColumnsSpecified = false;
        let showHeaders = typeof this.props.hideTableHeader === 'undefined';

        let firstChild = null;


        if (this.props.children) {
            if (
                this.props.children.length > 0 &&
                this.props.children[0] &&
                this.props.children[0].type === Thead
            ) {
                firstChild = this.props.children[0]
            } else if (
                this.props.children.type === Thead
            ) {
                firstChild = this.props.children
            }
        }

        if (firstChild !== null) {
            columns = Thead.getColumns(firstChild);
        } else {
            columns = this.props.columns || [];
        }

        if (columns.length > 0) {
            userColumnsSpecified = true;
            columns = this.translateColumnsArray(columns);
        }

        // Build up table rows
        children = this.createRows(userColumnsSpecified, columns)

        if (this.props.sortable === true) {
            for (let i = 0; i < columns.length; i++) {
                this._sortable[columns[i].key] = 'default';
            }
        }

        // Determine if we render the filter box
        let filtering = false;
        if (
            this.props.filterable &&
                Array.isArray(this.props.filterable) &&
                    this.props.filterable.length > 0 &&
                        !this.props.hideFilterInput
        ) {
            filtering = true;
        }

        // Apply filters
        let filteredChildren = children;
        if (this.state.filter !== '') {
            filteredChildren = this.applyFilter(this.state.filter, filteredChildren);
        }

        // Determine pagination properties and which columns to display
        let itemsPerPage = 0;
        let pagination = false;
        let numPages;
        let currentPage = this.state.currentPage;
        let pageButtonLimit = this.props.pageButtonLimit || 10;

        let currentChildren = filteredChildren;
        if (this.props.itemsPerPage > 0) {
            itemsPerPage = this.props.itemsPerPage;
            numPages = Math.ceil(filteredChildren.length / itemsPerPage);

            if (currentPage > numPages - 1) {
                currentPage = numPages - 1;
            }

            pagination = true;
            currentChildren = filteredChildren.slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
            );
        }

        // Manually transfer props
        let props = filterPropsFrom(this.props);

        let noDataText = this.props.noDataText ? <tr className="reactable-no-data"><td colSpan={columns.length}>{this.props.noDataText}</td></tr> : null;

        var tableHeader = null;
        if (columns && columns.length > 0 && showHeaders) {
            tableHeader = (
                <Thead columns={columns}
                       filtering={filtering}
                       onFilter={filter => {
                     this.setState({ filter: filter });
                     if (this.props.onFilter) {
                        this.props.onFilter(filter)
                     }
                 }}
                       filterPlaceholder={this.props.filterPlaceholder}
                       filterClassName={this.props.filterClassName}
                       currentFilter={this.state.filter}
                       sort={this.state.currentSort}
                       sortableColumns={this._sortable}
                       onSort={this.onSort.bind(this)}
                       key="thead"/>
            )
        }
        return <table {...props}>
            {tableHeader}
            <tbody className="reactable-data" key="tbody">
                {currentChildren.length > 0 ? currentChildren : noDataText}
            </tbody>
            {pagination === true ?
             <Paginator colSpan={columns.length}
                 pageButtonLimit={pageButtonLimit}
                 numPages={numPages}
                 currentPage={currentPage}
                 onPageChange={page => {
                     this.setState({ currentPage: page });
                     if (this.props.onPageChange) {
                        this.props.onPageChange(page)
                     }
                 }}
                 previousPageLabel={this.props.previousPageLabel}
                 nextPageLabel={this.props.nextPageLabel}
                 key="paginator"/>
             : null}
            {this.tfoot}
        </table>;
    }
}

export default CacheableTable