import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import DownIcon from './icons/down.svg';
import { COLORS, SHELF } from './constants';

const Container = styled.div`
    text-align: right;
    position: relative;
    height: 0;
`;

const DropdownTitle = styled.div`
    font-family: 'Oswald', 'Verdana', sans-serif;
    font-size: 16px;
    text-align: center;
    background-color: ${COLORS.lightGreen};
`;

const DropdownToggle = styled.div`
    margin-top: -20px;
    margin-right: -30px;
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
    left: 100%;

    border-radius: 10px;
`;

const DropdownLink = styled.a`
    text-align: left;
    display: block;
    padding: 4px 20px;

    &:hover {
        cursor: pointer;
        background-color: lightBlue;

        &:last-child {
            border-radius: 0 0 10px 10px;
        }
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
                    <DropdownTitle>Move to...</DropdownTitle>
                    <DropdownLink
                        highlighted={book.shelf === SHELF.current}
                        onClick={()=> {
                            this.closeDropdown();
                            bookUpdate(book, book.shelf, SHELF.current);
                        }
                    }>
                        Currently Reading
                    </DropdownLink>
                    <DropdownLink
                        highlighted={book.shelf === SHELF.want}
                        onClick={()=> {
                            this.closeDropdown();
                            bookUpdate(book, book.shelf, SHELF.want);
                        }
                    }>
                        Want to Read
                    </DropdownLink>
                    <DropdownLink
                        highlighted={book.shelf === SHELF.read}
                        onClick={()=> {
                            this.closeDropdown();
                            bookUpdate(book, book.shelf, SHELF.read);
                        }
                    }>
                        Read
                    </DropdownLink>
                    <DropdownLink
                        highlighted={!_.includes(SHELF.all, book.shelf)}
                        onClick={()=> {
                            this.closeDropdown();
                            bookUpdate(book, book.shelf, "none");
                        }
                    }>
                        None
                    </DropdownLink>
                </DropdownContent>
            </Container>
        )
    }
}
