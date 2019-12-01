const space = 4;

export const theme = {
    typography: {
        fontSize: 14,
        fontFamily: `'Ubuntu', sans-serif`
    },
    default: {
        color: 'white',
        borderColor: '#d9d9d9',
        borderRadius: space
    },
    focus: {
        color: '#40a9ff',
        borderColor: '#40a9ff'
    },
    active: {
        color: '#096dd9',
        borderColor: '#096dd9'
    },
    spacing: (n: number) => n * space,
    size: {
        lineHeight: '1.5',
        height: 8 * space
    }
};

export default theme;
