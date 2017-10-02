import React, { Component } from 'react';
import './AndrewReads.css';
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf';

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
            <div className="AndrewReads">
                <Shelf books={this.state.library.read}/>
            </div>
        );
    }
}

export default AndrewReads;
