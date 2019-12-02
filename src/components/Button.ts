import theme, { inputCss } from './theme';
import styled from 'styled-components';

export const Button = styled.button`
    ${inputCss.base}
    cursor: pointer;
    padding: 0 ${theme.spacing(3)}px;
    text-align: center;

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
`;
