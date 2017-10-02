import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

import Book, { Container } from './Book';

const ShelfContainer = styled.div`
	display: flex;
	justify-content: center;
`;

// const FlexPlaceholder = styled.div`
// 	flex: 1 0 0;
// 	min-width: 100px;
//  	margin: 10 20px;

// `

class Shelf extends Component {
	static propTypes = {
		books: PropTypes.array
	}

	render() {
		return (
			<ShelfContainer>
				{this.props.books.map((bookItem) => {
					return <Book key={bookItem.id} book={bookItem}/>;
				})}
			</ShelfContainer>
		)
	}

}

export default Shelf;
