import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Image from './icons/search.png';

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
	font-size: 24px;
	padding-left: 12px;
`;

export function SearchLink() {
	return (
		<Link to='/search'>
			<StickyButton />
		</Link>
	)
}

export default function Search() {
	return (
		<div>
			<form>
				<SearchBar />
			</form>
		</div>
	)
}