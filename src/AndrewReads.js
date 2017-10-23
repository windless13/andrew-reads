import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import Search, { SearchLink } from './Search';
import { COLORS, SHELF } from './constants';
import Back from './icons/back.png';

const Header = styled.div`
    position: relative;
    text-align: center;
    padding: 24px 0;
    background-color: ${COLORS.darkGreen};
    color: white;
    font: 28px 'Oswald', 'Verdana', sans-serif;
    text-transform: uppercase;
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
            [SHELF.read]: [],
            [SHELF.want]: [],
            [SHELF.current]: [],
        }
    }

    updateBookStatus = (bookToUpdate, oldStatus, newStatus) => {
        bookToUpdate.shelf = newStatus;
        BooksAPI.update(bookToUpdate, newStatus).then((res) => {
            if (res) {
                this.setState((prevState) => {
                    let newLibrary = prevState.library;
                    const prevShelf = _.includes(SHELF.all, oldStatus)
                        ? prevState.library[oldStatus]
                        : [];

                    newLibrary[oldStatus] = prevShelf.filter((book) => {
                        return bookToUpdate.id !== book.id;
                    });

                    if (_.includes(SHELF.all, newStatus)) {
                        newLibrary[newStatus] = _.concat(prevState.library[newStatus], bookToUpdate);
                    }

                    return { library: newLibrary };
                });
            }
        });
    }

    componentDidMount() {
        BooksAPI.getAll().then((data) => {
            const library = {};
            library[SHELF.read] = data.filter((book) => {
                return book.shelf === SHELF.read;
            });

            library[SHELF.want] = data.filter((book) => {
                return book.shelf === SHELF.want;
            });

            library[SHELF.current] = data.filter((book) => {
                return book.shelf === SHELF.current;
            });

            this.setState({
                library
            });
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
                        <Shelf
                            bookUpdate={this.updateBookStatus}
                            title={'Currently Reading'}
                            books={this.state.library.currentlyReading}
                        />
                        <Shelf
                            bookUpdate={this.updateBookStatus}
                            title={'Want to Read'}
                            books={this.state.library.wantToRead}
                        />
                        <Shelf
                            bookUpdate={this.updateBookStatus}
                            title={'Read'}
                            books={this.state.library.read}
                        />
                        <SearchLink />
                    </div>
                )}/>
                <Route path='/search' render={() => (
                    <Search library={this.state.library} bookUpdate={this.updateBookStatus} />
                )}/>
            </div>
        );
    }
}

export default AndrewReads;
