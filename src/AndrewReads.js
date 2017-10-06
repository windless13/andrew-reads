import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import Search from './Search';
import { Colors } from './constants';

const Header = styled.div`
    font-size: 48px;
    text-align: center;
    padding: 24px 0;
    background-color: ${Colors.darkGreen};
    color: white;
`

class AndrewReads extends Component {
    state = {
        library: {
            read: [],
            wantToRead: [],
            currentlyReading: [],
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then((data) => {
            const library = {};
            library.read = data.filter((book) => {
                return book.shelf === 'read';
            });

            library.wantToRead = data.filter((book) => {
                return book.shelf === 'wantToRead';
            });

            library.currentlyReading = data.filter((book) => {
                return book.shelf === 'currentlyReading';
            });

            this.setState({
                library
            })
            console.log(this.state);
        })

    }

    render() {
        return (
            <div>
                <Header>
                    My Reads
                </Header>
                <Route exact path='/' render={() => (
                    <Shelf title={'Read'} books={this.state.library.read}/>
                )}/>
                <Route path='/search' render={() => (
                    <Search/>
                )}/>
            </div>
        );
    }
}

export default AndrewReads;
