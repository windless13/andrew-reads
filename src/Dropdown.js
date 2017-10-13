import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import DownIcon from './icons/down.svg';
import { Colors } from './constants';


const DropdownToggle = styled.div`
    height: 40px;
    width: 40px;
    background-color: ${Colors.searchGreen};
    mask-image: url(${DownIcon});
    mask-size: contain;
`;

const DropdownContent = styled.div`

`;

export default class Dropdown extends Component {
    state = {
        isOpen: false,
    }

    render() {
        return (
            <div>
                <DropdownToggle>
                </DropdownToggle>
                <DropdownContent>
                    Hello
                </DropdownContent>
            </div>
        )
    }
}
