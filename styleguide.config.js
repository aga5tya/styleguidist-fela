const loaders = require('loaders')
const path = require('path')
module.exports = {
	components: 'src/components/**/[A-Za-z]*.js',
	template: 'src/utils/index.html',
	defaultExample: false,

	webpackConfig: {
		module: {
			loaders: loaders.all
		},
		resolve: {
			alias: {
				'react': 'preact-compat',
				'react-dom': 'preact-compat',
                'react-fela': 'preact-fela',
				'rsg-components/Wrapper': path.join(
					__dirname,
					'src/utils/Wrapper'
				)
			}
		}
	}
}
