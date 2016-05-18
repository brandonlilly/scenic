import { createScene } from './scene'
import React from 'react'
import ReactDOM from 'react-dom'
import TexturePicker from './components/TexturePicker'

createScene()

ReactDOM.render(
  <TexturePicker />,
  document.getElementById('app')
)
