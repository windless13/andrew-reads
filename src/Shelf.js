import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS } from './constants';
import Book from './Book';

const ShelfContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	border-bottom: 1px solid ${COLORS.border};
`;

const Title = styled.div`
	padding: 25px;
	font: 500 24px 'Oswald', 'Verdana', sans-serif;
`

class Shelf extends Component {
	static propTypes = {
		books: PropTypes.array,
		bookUpdate: PropTypes.func,
		title: PropTypes.string,
	}

	render() {
		const {
			books,
			bookUpdate,
			title
		} = this.props;

		return (
			<div>
				<Title>{title}</Title>

				<ShelfContainer>
					{books.map((bookItem) => {
						return <Book key={bookItem.id} book={bookItem} bookUpdate={bookUpdate}/>;
					})}
				</ShelfContainer>
			</div>
		)
	}
}

export default Shelf;
