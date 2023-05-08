const providerPath = 'plopTemplates/provider.tsx'
const componentPath = 'plopTemplates/component.tsx'
const featurePath = 'plopTemplates/feature.tsx'

/** @type {import('plop').NodePlopAPI} */
module.exports = (plop) => {
	// Feature generator
	plop.setGenerator('feature', {
		prompts: [{ type: 'input', name: 'module' }],
		actions: () => {
			const actions = [
				{
					type: 'add',
					path: 'src/features/{{module}}/components/index.tsx',
					templateFile: featurePath,
				},
			]

			return actions
		},
	})

	// Components generator
	plop.setGenerator('component', {
		prompts: [
			{ type: 'input', name: 'module' },
			{ type: 'input', name: 'name' },
		],
		actions: () => {
			const actions = [
				{
					type: 'add',
					path: 'src/features/{{module}}/components/{{name}}.tsx',
					templateFile: componentPath,
				},
			]

			return actions
		},
	})

	// UI generator
	plop.setGenerator('ui', {
		prompts: [{ type: 'input', name: 'name' }],
		actions: () => {
			const actions = [
				{
					type: 'add',
					path: 'src/ui/{{name}}.tsx',
					templateFile: componentPath,
				},
			]

			return actions
		},
	})

	// Primitive generator
	plop.setGenerator('primitive', {
		prompts: [{ type: 'input', name: 'name' }],
		actions: () => {
			const actions = [
				{
					type: 'add',
					path: 'src/ui/primitives/{{name}}.tsx',
					templateFile: componentPath,
				},
			]

			return actions
		},
	})

	// Provider generator
	plop.setGenerator('provider', {
		prompts: [{ type: 'input', name: 'name' }],
		actions: () => {
			const actions = [
				{
					type: 'add',
					path: 'src/providers/{{name}}.tsx',
					templateFile: providerPath,
				},
			]

			return actions
		},
	})
}
