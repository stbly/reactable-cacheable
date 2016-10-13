import React from 'react';
import CacheableTable from './reactable-cacheable/cacheable-table'
import CacheableRow from './reactable-cacheable/cacheable-row'
import { Table, Tr, Td, Thead, Th } from 'reactable'

const ReactableCacheable = { CacheableTable, CacheableRow, Tr, Td, Thead, Th } 
export default ReactableCacheable
if(typeof(window) !== 'undefined') { window.ReactableCacheable = ReactableCacheable; }
