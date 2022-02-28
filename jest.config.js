module.exports = {
	testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(js|jsx|ts|tsx)?$',
	collectCoverageFrom: ['src/stores/', 'src/**/*.{js,jsx,ts,tsx}'],
	moduleNameMapper: {
		/* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

		// Handle CSS imports (without CSS modules)
		'^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

		/* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
		'^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$':
			'<rootDir>/__mocks__/fileMock.js',
		// Resolves a single path as expected 👍

		// Handle ts paths (alias)
		'^contexts/(.*)$': '<rootDir>/src/contexts/$1',
		'^stores/(.*)$': '<rootDir>/src/stores/$1',
		'^i18n/(.*)$': '<rootDir>/src/i18n/$1',
		'^components/(.*)$': '<rootDir>/src/components/$1',
		'^pages/(.*)$': '<rootDir>/src/pages/$1',
		'^styles/(.*)$': '<rootDir>/src/styles/$1',
		'^src/(.*)$': '<rootDir>/src/$1',
	},
	testPathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/.next/',
		'<rootDir>/.yalc/',
		'<rootDir>/cypress/',
		'<rootDir>/__mocks__',
	],
	transform: {
		/* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
		'^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
	},
	transformIgnorePatterns: [
		'/node_modules/',
		'^.+\\.module\\.(css|sass|scss)$',
	],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
