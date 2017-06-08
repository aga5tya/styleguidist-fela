import React, { Component, Children, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types';
import { createRenderer as createFelaRenderer, ThemeProvider } from 'fela'
import { Provider } from 'react-fela'
import { Theme as themeVariables } from './Theme'
// should be from another file. Use this to drive themes.

const defaultOpts = {
	selectorPrefix: 'bms-',
	dev: false,
	fontNode: undefined,
	cssNode: undefined
}

export const createRenderer = opts => {
	const usedOpts = Object.assign({}, defaultOpts, opts)
	const plugins = []
	const enhancers = []

	if (usedOpts.dev === true) {
		// plugins.push(validator());
		// enhancers.push(beautifier());
		// enhancers.push(monolithic());
		// enable these when you have something solid
	}

	return createFelaRenderer({
		plugins,
		enhancers,
		selectorPrefix: [usedOpts.selectorPrefix]
	})
}

export const StyleProvider = ({
	selectorPrefix,
	dev,
	cssNode,
	fontNode,
	children,
	...restProps
}) => {
	const renderer = createRenderer({
		selectorPrefix,
		dev,
		fontNode
	})
	const child = Children.only(children)
	return (
		<Provider renderer={renderer} mountNode={cssNode}>
			<ThemeProvider theme={themeVariables}>
				{isValidElement(child)
					? cloneElement(child, { ...restProps })
					: child}
			</ThemeProvider>
		</Provider>
	)
}

StyleProvider.defaultProps = defaultOpts
StyleProvider.propTypes = {
	dev: PropTypes.bool,
	selectorPrefix: PropTypes.string,
	cssNode: PropTypes.object,
	fontNode: PropTypes.object,
	children: PropTypes.node.isRequired
}
