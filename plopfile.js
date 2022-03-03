module.exports = function (plop) {
	plop.setHelper('dash-case', function (text) {
		return text.replace(/[A-Z]/g, (letter, index) =>
			index === 0 ? letter.toLowerCase() : `-${letter.toLowerCase()}`
		);
	});

	plop.setGenerator('basic-component', {
		description: 'Auto create a basic component',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is the component name (Please, use PascalCase)?',
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{name}}/{{name}}.tsx',
				templateFile: 'plop-templates/basic-component.tsx.hbs',
			},
			{
				type: 'add',
				path: 'src/components/{{name}}/_{{dash-case name}}.style.scss',
				templateFile: 'plop-templates/component.style.scss.hbs',
			},
		],
	});
};
