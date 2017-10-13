import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Dropdown from './Dropdown';

export const Container = styled.div`
	display: flex;
	flex: 1 0 0;
	flex-direction: column;
	margin: 10px 20px;
  	min-width: 100px;
  	min-height: 175px;
  	max-width: 200px;

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
		book: PropTypes.object
	}

	state = {
		query: ''
	}


	render() {
		const book = this.props.book || {};
    	const { title, subtitle, authors, imageLinks } = book;


		return (
			<Container>
				<OuterPicture>
					<Picture url={imageLinks ? imageLinks.thumbnail : ''}/>
                    <Dropdown />
				</OuterPicture>
				<Title>{title} - {subtitle}</Title>
				<Author>{authors}</Author>
			</Container>
		)
	}
}

export default Book;