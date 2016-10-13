import React from 'react';
import { render } from 'react-dom'

import { CacheableTable, Tr, Td } from './../../lib/reactable-cacheable'


class Container extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			data: [
			    {
			        name: 'Name 1',
			        age: '32'
			    },
			    {
			        name: 'Name 2',
			        age: '21'
			    },
			    {
			        name: 'Name 3',
			        age: '59'
			    }
			]
		}
	}

	addItem () {
		var data = this.state.data
		data.push({name:'new name', age:'23'})
		this.setState({
			data
		})
	}

	getRows () {
		const data = this.state.data
		return data.map( (item, index) => {
			var key = 'row-' + index

			console.log('get rows')
			return (
				<Tr key={key}>
		            <Td key={key + item.name} column="name" data={item.name}>
		            	{item.name}
		            </Td>
		            <Td key={key + item.age} column="age" data={item.age}>
		            	{item.age}
	            	</Td>
				</Tr>
			)
		})
	}

	render () {
		console.log('render')
		return(
			<div>
				<CacheableTable sortable filterable={['name']}>
					{ this.getRows() }
				</CacheableTable>
				<button onClick={this.addItem.bind(this)} > Add Item </button>
			</div>
		)
	}
} 
	


render(
	<Container />,
	document.getElementById('root')
)