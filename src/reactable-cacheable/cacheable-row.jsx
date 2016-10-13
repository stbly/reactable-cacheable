import React from 'react';

import { Tr, Td } from 'reactable'
import { toArray } from './../../node_modules/reactable/lib/reactable/lib/to_array';
import { filterPropsFrom } from './../../node_modules/reactable/lib/reactable/lib/filter_props_from';
class CacheableRow extends Tr {
	componentDidMount () {
		console.log('row mounted')
	}
	componentDidUpdate (nextProps, nextState) {
		console.log('updating')
	}
}



export default CacheableRow
