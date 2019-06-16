module.exports = {
    testMatch: ['/tests/**/ts?(x)'],
    transform: {
        ".(ts|tsx)": 'ts-jest'
    },
    moduleFileExtensions: ['js', 'ts', 'tsx'],
};