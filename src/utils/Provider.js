import React, { Component, Children, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { createRenderer as createFelaRenderer } from 'fela'
import { Provider, ThemeProvider } from 'react-fela'

//get the react devtools to work
require('preact/devtools')

// should be from another file. Use this to drive themes.
import themeVariables  from './Theme'

// default Opts, when shipped as a Provider to others, this has to be from props.
// but styleguidist needs this at global.
const defaultOpts = {
	selectorPrefix: 'bms-',
	dev: false,
	fontNode: undefined,
	cssNode: undefined
}

const createRenderer = opts => {
	const usedOpts = Object.assign({}, defaultOpts, opts)
	const plugins = []
	const enhancers = []

	if (usedOpts.dev === true) {
		// enable these when you have something solid
		// plugins.push(validator());
		// enhancers.push(beautifier());
		// enhancers.push(monolithic());
	}

	return createFelaRenderer({
		plugins,
		enhancers,
		selectorPrefix: [usedOpts.selectorPrefix]
	})
}

//get the mount node for styles from the html.
const getFelaMountNode = () => {
	const node = document.getElementById('fela-stylesheet')
	const parent = node && node.parentNode
	if (!node || !parent) {
		throw new Error('missing stylesheet node for Fela')
	}
	// Always create a new style element to handle hot reloading.
	// During isomorphic injection new dom is needed to sync style state.
	const nextNode = document.createElement('style')
	nextNode.id = 'fela-stylesheet'
	parent.replaceChild(nextNode, node)
	return nextNode
}

// Keep one node to track the styles. Easier since jss also has its styles.
const felaMountNode = getFelaMountNode()

// Use the below function to customer dev/prod mode plugins
const felaRenderer = createRenderer({})

export default class StyleProvider extends Component {
	render() {
		const child = Children.only(this.props.children)
		return (
			<Provider renderer={felaRenderer} mountNode={felaMountNode}>
				<ThemeProvider theme={themeVariables}>
					{isValidElement(child)
						? cloneElement(child, { ...this.props })
						: child}
				</ThemeProvider>
			</Provider>
		)
	}
}

StyleProvider.propTypes = {
	dev: PropTypes.bool,
	selectorPrefix: PropTypes.string,
	cssNode: PropTypes.object,
	fontNode: PropTypes.object,
	children: PropTypes.node.isRequired
}

export { createRenderer }