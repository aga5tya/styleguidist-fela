const loaders = require('loaders'),
	path = require('path')

module.exports = {
	components: 'src/components/**/[A-Za-z]*.js',
	template: 'src/utils/index.html',
	handlers: function (componentPath) {
		return require('react-docgen').defaultHandlers.concat(function (documentation, path) {
			// Calculate a display name for components based upon the declared class name.
			if (path.value.type === 'ClassDeclaration' && path.value.id.type === 'Identifier') {
				documentation.set('displayName', path.value.id.name)

				// Calculate the key required to find the component in the module exports
				if (path.parentPath.value.type === 'ExportNamedDeclaration') {
					documentation.set('path', path.value.id.name)
				}
			}

			console.log(path.parentPath.value)
			// The component is the default export
			if (path.parentPath.value.type === 'ExportDefaultDeclaration') {
				documentation.set('path', 'default')
			}
		},
		// To better support higher order components
		require('react-docgen-displayname-handler').createDisplayNameHandler(componentPath)
	  )
	},
	webpackConfig: {
		module: {
			loaders: loaders.all
		},
		resolve: {
			alias: {
				'rsg-components/Wrapper': path.join(
					__dirname,
					'src/utils/Provider'
				)
			}
		}
	},

	theme: {
		color: {
			baseBackground: '#F5F5FA',
			sidebarBackground: '#FFFFFF'
		}
	}
}
