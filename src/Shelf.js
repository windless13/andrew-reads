import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

import Book, { Container } from './Book';

const ShelfContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const Title = styled.div`
	font-size: 34px;
	font-weight: 500;
	padding: 10px;
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
					<MediaQuery query={'(max-width: 500px)'}>
						<Container/>
					</MediaQuery>
					<MediaQuery query={'(max-width: 500px)'}>
						<Container/>
					</MediaQuery>



				</ShelfContainer>
			</div>
		)
	}
}

export default Shelf;
