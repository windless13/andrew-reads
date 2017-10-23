import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Dropdown from './Dropdown';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 30px 20px;

    @media screen and (max-width: 480px) {
        width: 100px;
        height: 200px;
    }

    @media screen and (min-width: 480px) {
        width: 125px;
        height: 250px;
    }

    @media screen and (min-width: 1024px) {
        width: 150px;
        height: 300px;
    }
`;

const Title = styled.div`
	font: bold 12px Helvetica;
	margin-top: 12px;
`;

const Author = styled.div`
	font-size: 10px;
`;


class Book extends Component {
	static propTypes = {
		book: PropTypes.object,
        bookUpdate: PropTypes.func,
	}

	render() {
		const book = this.props.book || {};
    	const { title, subtitle, authors, imageLinks } = book;

		return (
			<Container>
                <img alt={title} src={imageLinks ? imageLinks.thumbnail : ''} />
                <Dropdown book={book} bookUpdate={this.props.bookUpdate} />
				<Title>{title} - {subtitle}</Title>
				<Author>
                {_.map(authors, (author) => {
                    return author === _.first(authors)
                        ? author
                        : `, ${author}`;
                })}
                </Author>
			</Container>
		)
	}
}

export default Book;