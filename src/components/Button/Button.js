import React from 'react'
import PropTypes from 'prop-types'
import { createComponent } from 'react-fela'

const ButtonStyle = props => ({
	width: '300px',
	height: '50px',
	color: props.color,
	fontSize: props.size === 'large' ? '40px' : '12px',
	border: 'none',
	borderRadius: '3px',
	background: '#cecece'
})

const Btn = createComponent(ButtonStyle, 'button')

// if not wrapped in a stateless component, the export is not found.
// Probably issue with styleguidist or fela.
const Button = props => {
	return <Btn {...props}>{props.children}</Btn>
}

Button.propTypes = {
	/** Button label */
	children: PropTypes.string,
	/** The color for the button */
	color: PropTypes.string,
	/** The size of the button */
	size: PropTypes.oneOf(['small', 'normal', 'large']),
	/** Gets called when the user clicks on the button */
	onClick: PropTypes.func
}

Button.defaultProps = {
	color: '#333',
	size: 'normal',
	onClick: () => {}
}

export default Button
