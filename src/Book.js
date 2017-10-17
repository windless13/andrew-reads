import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Dropdown from './Dropdown';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 30px 20px;
    border: 1px solid blue;

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

  	${props => props.isInvisible && `
  		height: 0;
  	`}
`;

const OuterPicture = styled.div`
  position: relative;
  width: 100%;
  box-shadow: 10px 10px 10px gray;
`

const Picture = styled.div`
	padding-top: 170%;
	background-image: url(${props => props.url});
	background-size: 100%;
	background-repeat: no-repeat;
`;

const MyPicture = styled.div`
    background-image: url(${props => props.url});
    background-size: contain;
    background-repeat: no-repeat;
    height: 200px;
    width: 100px;
`

const Title = styled.div`
	font-size: 12px;
	font-style: italic;
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
/*
                <OuterPicture>
                    <Picture url={imageLinks ? imageLinks.thumbnail : ''}/>
                    <Dropdown book={book} bookUpdate={this.props.bookUpdate} />
                </OuterPicture>
*/

		return (
			<Container>
                <img src={imageLinks ? imageLinks.thumbnail : ''} />
                <Dropdown book={book} bookUpdate={this.props.bookUpdate} />
				<Title>{title} - {subtitle}</Title>
				<Author>{authors}</Author>
			</Container>
		)
	}
}

export default Book;