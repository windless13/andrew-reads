import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Image from './icons/search.png';
import SearchIcon from './icons/search-bar.png';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import { SHELF } from './constants';

const StickyButton = styled.div`
	height: 60px;
	width: 60px;
	position: fixed;
	right: 30px;
	bottom: 30px;
	background-image: url(${Image});
	background-size: cover;
	background-repeat: no-repeat;
`;

const SearchBar = styled.input`
	width: 100%;
	height: 50px;
	background-image: url(${SearchIcon});
	background-size: 1.1em;
	background-position: 10px center;
	background-repeat: no-repeat;
	font-size: 24px;
	padding-left: 42px;
`;

const SearchResults = styled.div``;
const Title = styled.div``;

export function SearchLink() {
	return (
		<Link to='/search'>
			<StickyButton />
		</Link>
	)
}

export default class Search extends Component {
	static propTypes = {
		bookUpdate: PropTypes.func,
		library: PropTypes.object,
    }

	state = {
		query: '',
		booksShown: [],
	}

	searchHandler = (event) => {
		console.log('hi');
		console.log(event.target.value);
		const query = event.target.value;
		const library = this.props.library;
		debugger;
		const { read, wantToRead, currentlyReading } = this.props.library;
		BooksAPI.search(event.target.value).then((results) => {
			if (results && !results.error) {
				this.setState({
					query: query,
					booksShown: _.map(results, (book) => {
						if (_.find(read, ['id', book.id])) {
							_.assign(book, { shelf: SHELF.read });
						} else if (_.find(wantToRead, ['id', book.id])) {
							_.assign(book, { shelf: SHELF.want });
						} else if (_.find(currentlyReading, ['id', book.id])) {
							_.assign(book, { shelf: SHELF.current });
						} else {
							_.assign(book, { shelf: 'none' });
						}
						return book;
					}),
				});
			} else {
				this.setState({
					query: query,
					booksShown: [],
				});
			}
		});
	}

	render() {
		return (
			<div>
				<form>
					<SearchBar onChange={this.searchHandler.bind(this)} value={this.state.query} />
				</form>
				<SearchResults>
                    <Shelf
                        bookUpdate={this.props.bookUpdate}
                        title={'Search Results'}
                        books={this.state.booksShown}
                    />
				</SearchResults>
			</div>
		)
	}

}


