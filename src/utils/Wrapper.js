import React, { Component } from 'react';
import { StyleProvider as FelaProvider } from './Provider'

require('preact/devtools');

const getFelaMountNode = () => {
  const node = document.getElementById('fela-stylesheet')
  const parent = node && node.parentNode
  if (!node || !parent) {
    throw new Error('missing stylesheet node for Fela')
  }
  // Always create a new element to handle hot reloading.
  const nextNode = document.createElement('style')
  nextNode.id = 'fela-stylesheet'
  parent.replaceChild(nextNode, node)
  return nextNode
}

export default class Wrapper extends Component {
  render() {
    return (
      <FelaProvider cssNode={getFelaMountNode()}>
        {this.props.children}
      </FelaProvider>
    );
  }
}