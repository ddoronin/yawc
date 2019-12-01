import theme from './theme';
import styled from 'styled-components';

export const Button = styled.button`
    background-image: none;
    background-color: black;
    border: 1px solid ${theme.default.borderColor};
    border-radius: ${theme.spacing(1)}px;
    color: ${theme.default.color};
    cursor: pointer;
    display: inline-block;
    font-size: ${theme.typography.fontSize}px;
    height: ${theme.size.height}px;
    line-height: ${theme.size.lineHeight};
    outline: 0;
    padding: 0 ${theme.spacing(3)}px;
    text-align: center;
    touch-action: manipulation;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    user-select: none;
    white-space: nowrap;

    &:active {
        color: ${theme.active.color};
        border-color: ${theme.active.borderColor};
        background-color: black;
    }

    &:hover(not:disabled), &:focus {
        color: ${theme.focus.color};
        border-color: ${theme.focus.borderColor};
    }

    &:disabled {
        color: gray;
    }
`;
