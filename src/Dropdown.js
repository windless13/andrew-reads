import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import DownIcon from './icons/down.svg';
import { COLORS } from './constants';

const Container = styled.div`
    text-align: right;
`;

const DropdownToggle = styled.div`
    height: 40px;
    width: 40px;
    background-color: ${props => props.isVisible
        ? COLORS.darkGreen
        : COLORS.searchGreen
    };
    mask-image: url(${DownIcon});
    mask-size: contain;
    display: inline-block;

    &:hover {
        cursor: pointer;
    }
`;

const DropdownContent = styled.div`
    display: ${props => props.isVisible ? 'block' : 'none'};

    position: absolute;
    z-index: 1;
    background: white;
    right: 0;
`;

const DropdownLink = styled.a`
    display: block;
    padding: 4px 20px;

    &:hover {
        cursor: pointer;
        background-color: pink;
    }

    ${props => props.highlighted && `
        border: 1px solid black;
    `}
`;

export default class Dropdown extends Component {
    static propTypes = {
        bookUpdate: PropTypes.func,
    }

    state = {
        isOpen: false,
    }


    componentWillMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false);
    }

    closeDropdown = () => {
        this.setState({ isOpen: false });
    }

    handleClick = (event) => {
        if (!ReactDOM.findDOMNode(this).contains(event.target)) {
            this.closeDropdown();
        }
    }

    toggle = () => {
        console.log('toggle');
        this.setState((prevState) => {
            return { isOpen: !prevState.isOpen };
        }, () => {

        });
    }

    render() {
        const {
            book,
            bookUpdate,
        } = this.props;

        return (
            <Container>
                <DropdownToggle
                    isVisible={this.state.isOpen}
                    onClick={this.toggle}>
                </DropdownToggle>
                <DropdownContent isVisible={this.state.isOpen}>
                    Move to...
                    <DropdownLink
                        highlighted={book.shelf === 'currentlyReading'}
                        onClick={()=> {
                            this.closeDropdown();
                            bookUpdate(book, book.shelf, 'currentlyReading');
                        }
                    }>
                        Currently Reading
                    </DropdownLink>                    <DropdownLink
                        highlighted={book.shelf === 'wantToRead'}
                        onClick={()=> {
                            this.closeDropdown();
                            bookUpdate(book, book.shelf, 'wantToRead');
                        }
                    }>
                        Want to Read
                    </DropdownLink>
                    <DropdownLink
                        highlighted={book.shelf === 'read'}
                        onClick={()=> {
                            this.closeDropdown();
                            bookUpdate(book, book.shelf, 'read');
                        }
                    }>
                        Read
                    </DropdownLink>
                    <DropdownLink
                        highlighted={!_.includes(['currentlyReading', 'wantToRead', 'read'], book.shelf)}
                        onClick={()=> {
                            this.closeDropdown();
                            bookUpdate(book, book.shelf);
                        }
                    }>
                        None
                    </DropdownLink>
                </DropdownContent>
            </Container>
        )
    }
}
