const space = 4;

export const theme = {
    typography: {
        fontSize: 14,
        fontFamily: `'Ubuntu', sans-serif`
    },
    default: {
        color: 'white',
        backgroundColor: 'black',
        borderColor: '#d9d9d9',
        borderRadius: space
    },
    focus: {
        color: 'white',
        borderColor: '#40a9ff'
    },
    active: {
        color: '#096dd9',
        borderColor: '#096dd9'
    },
    disabled: {
        color: 'grey',
        backgroundColor: '#444444'
    },
    spacing: (n: number) => n * space,
    size: {
        lineHeight: '1.5',
        height: 8 * space
    }
};

export const inputCss = {
    base:`
        background-image: none;
        background-color: ${theme.default.backgroundColor};
        border: 1px solid ${theme.default.borderColor};
        border-radius: ${theme.spacing(1)}px;
        box-sizing: border-box;
        color: ${theme.default.color};
        font-family: ${theme.typography.fontFamily};
        font-size: ${theme.typography.fontSize}px;
        height: ${theme.size.height}px;
        line-height: ${theme.size.lineHeight};
        margin: ${theme.spacing(1)}px;
        outline: 0;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
    `,
    active: `
        color: ${theme.active.color};
        border-color: ${theme.active.borderColor};
    `, 
    
    hover: `
        color: ${theme.focus.color};
        border-color: ${theme.focus.borderColor};
    `,

    focus: `
        color: ${theme.focus.color};
        border-color: ${theme.focus.borderColor};
        border-style: dashed;
    `,

    disabled: `
        color: ${theme.disabled.color};
        background-color: ${theme.disabled.backgroundColor}
    `
};

export default theme;
