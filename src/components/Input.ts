import theme, { inputCss } from './theme';
import styled from 'styled-components';

export const Input = styled.input`
    ${inputCss.base}
    padding: 0 ${theme.spacing(1)}px;
    text-align: left;

    :active {
        ${inputCss.active}
    }

    :hover(not:disabled) {
        ${inputCss.hover}
    }

    :focus {
        ${inputCss.focus}
    }

    :disabled {
        ${inputCss.disabled}
    }
`
