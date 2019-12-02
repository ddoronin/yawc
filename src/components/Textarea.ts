import theme, { inputCss } from './theme';
import styled from 'styled-components';

export const TextArea = styled.textarea`
    ${inputCss.base}
    height: ${theme.spacing(2 * theme.typography.fontSize)}px;
    padding: ${theme.spacing(1)}px;
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
