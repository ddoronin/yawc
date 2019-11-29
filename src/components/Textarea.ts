import styled from 'styled-components';

export const TextArea = styled.textarea`
    outline: 0;
    line-height: 1.5;
    position: relative;
    display: inline-block;
    white-space: nowrap;
    text-align: left;
    background-image: none;
    border: 1px solid transparent;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    user-select: none;
    touch-action: manipulation;
    height: 128px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    color: white;
    background-color: transparent;
    border-color: #d9d9d9;

    &:hover, &:focus {
        border-color: #40a9ff;
    }

    &:active {
        border-color: #096dd9;
    }
`
