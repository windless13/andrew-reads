import React from 'react';
import ReactDOM from 'react-dom';
import AndrewReads from './AndrewReads';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<AndrewReads />, div);
});
