import styled from 'styled-components';

export const Button = styled.button`
    outline: 0;
    line-height: 1.5;
    position: relative;
    display: inline-block;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    user-select: none;
    touch-action: manipulation;
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    color: white;
    background-color: transparent;
    border-color: #d9d9d9;

    &:hover, &:focus {
        color: #40a9ff;
        border-color: #40a9ff;
    }

    &:active {
        color: #096dd9;
        border-color: #096dd9;
    }
`