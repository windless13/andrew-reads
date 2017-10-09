import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Image from './andrew.png';

const StickyButton = styled.div.attrs({
	className: 'andrew-test',
})`
	display: block;
	height: 100px;
	width: 100px;
`;

export function SearchLink() {
	return (
		<StickyButton/>
	)
}

export default function Search() {
	return (
		<div>
			Hi!
		</div>
	)
}