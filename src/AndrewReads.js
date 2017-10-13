import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import Search, { SearchLink } from './Search';
import { Colors } from './constants';
import Back from './icons/back.png';

const Header = styled.div`
    position: relative;
    font-size: 28px;
    text-align: center;
    padding: 24px 0;
    background-color: ${Colors.darkGreen};
    color: white;
`

const BackButton = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(${Back});
    background-size: contain;
    background-repeat: no-repeat;

    &::after {
        position: relative;
        content: 'Back';
        left: 30px;
        color: black;
        font-size: 24px;
    }
`;

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
                    <Route path='/search' render={() => (
                        <Link to='/'>
                            <BackButton />
                        </Link>
                    )}/>

                    My Reads
                </Header>
                <Route exact path='/' render={() => (
                    <div>
                        <Shelf title={'Currently Reading'} books={this.state.library.currentlyReading}/>
                        <Shelf title={'Want to Read'} books={this.state.library.wantToRead}/>
                        <Shelf title={'Read'} books={this.state.library.read}/>
                        <SearchLink />
                    </div>
                )}/>
                <Route path='/search' render={() => (
                    <Search/>
                )}/>

            </div>
        );
    }
}

export default AndrewReads;
