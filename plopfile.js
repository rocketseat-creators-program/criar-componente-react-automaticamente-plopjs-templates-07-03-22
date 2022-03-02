module.exports = function (plop) {
	plop.setGenerator('basic-component', {
		description: 'Auto create a basic component',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is the component name?',
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{name}}/{{name}}.tsx',
				templateFile: 'plop-templates/basic-component.tsx.hbs',
			},
		],
	});
};
