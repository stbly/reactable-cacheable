import React from 'react';
import { filterPropsFrom } from './../../node_modules/reactable/lib/reactable/lib/filter_props_from';
import { extractDataFrom } from './../../node_modules/reactable/lib/reactable/lib/extract_data_from';
import { isUnsafe } from './../../node_modules/reactable/lib/reactable/unsafe';

import { Table, Thead, Th, Tr, Td, Tfoot, Paginator } from 'reactable'

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