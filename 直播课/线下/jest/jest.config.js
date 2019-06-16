module.exports = {
    testMatch: ['/tests/**/ts?(x)'],
    transform: {
        ".(ts|tsx)": 'ts-jest'
    },
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    rootDir: "",
    testEnvironment: 'jsdom',
    collectCoverage: true,
    coveragePathIgnorePatter: ['/node_modules', '/test'],

};