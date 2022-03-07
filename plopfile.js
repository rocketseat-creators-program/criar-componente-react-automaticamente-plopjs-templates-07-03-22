const pascalToSpecialCase = (str, separator) =>
	str.replace(/[A-Z]/g, (letter, index) =>
		index === 0 ? letter.toLowerCase() : `${separator}${letter.toLowerCase()}`
	);

// eslint-disable-next-line quotes
const translationTemplate = `{{camelCase name}}: {title: '{{name}}'},\n$1`;
const translationPattern =
	/(\/\/ PLOP WILL AUTO-IMPORT YOUR COMPONENT TRANSLATION HERE. DO NOT REMOVE)/g;

const createComponent = {
	type: 'add',
	path: 'src/components/{{name}}/{{name}}.tsx',
	templateFile: 'plop-templates/basic-component.tsx.hbs',
};

const createStyle = [
	{
		type: 'add',
		path: 'src/components/{{name}}/_{{dash-case name}}.style.scss',
		templateFile: 'plop-templates/component.style.scss.hbs',
	},
	{
		type: 'modify',
		path: 'src/styles/main.scss',
		pattern:
			/(\/\/ PLOP WILL AUTO-IMPORT YOUR COMPONENT STYLE HERE. DO NOT REMOVE)/g,
		template:
			// eslint-disable-next-line quotes
			"@import '../components/{{name}}/{{dash-case name}}.style';\n$1",
	},
];

const createTranslations = [
	{
		type: 'modify',
		path: 'src/i18n/locales/en.ts',
		pattern: translationPattern,
		template: translationTemplate,
	},
	{
		type: 'modify',
		path: 'src/i18n/locales/fr.ts',
		pattern: translationPattern,
		template: translationTemplate,
	},
];

const createBasicComponent = [
	createComponent,
	...createStyle,
	...createTranslations,
];

const promptQuestions = [
	{
		type: 'input',
		name: 'name',
		message: 'What is the component name (please, use PascalCase)?',
	},
];

const createJestFile = {
	type: 'add',
	path: 'src/components/{{name}}/{{underscore-case name}}.test.tsx',
	templateFile: 'plop-templates/jest.test.tsx.hbs',
};

const createCypressFile = {
	type: 'add',
	path: 'src/components/{{name}}/{{underscore-case name}}.spec.tsx',
	templateFile: 'plop-templates/cypress.test.tsx.hbs',
};

module.exports = function (plop) {
	plop.setHelper('dash-case', function (text) {
		return pascalToSpecialCase(text, '-');
	});
	plop.setHelper('underscore-case', function (text) {
		return pascalToSpecialCase(text, '_');
	});

	plop.setGenerator('basic-component', {
		description:
			'Auto create the basic component setup with styles and translation',
		prompts: promptQuestions,
		actions: createBasicComponent,
	});

	plop.setGenerator('jest-component', {
		description:
			'Auto create a basic component setup with styles, translation and test(JEST) file',
		prompts: promptQuestions,
		actions: [...createBasicComponent, createJestFile],
	});

	plop.setGenerator('cypress-component', {
		description:
			'Auto create a basic component setup with styles, translation and test(CYPRESS) file',
		prompts: promptQuestions,
		actions: [...createBasicComponent, createCypressFile],
	});
};
