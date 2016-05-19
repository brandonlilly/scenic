import React, { Component } from 'react'
import TexturePicker from './TexturePicker'
import textureData from '../lib/textures'
import { createScene, selectImage } from '../scene'

class App extends Component {
  constructor() {
    super()

    // initialize selections for each texture to zero
    let imageSelections = Object.keys(textureData)
      .reduce((obj, name) => ({ ...obj, [name]: 0}), {})

    this.state = { imageSelections }
  }

  onTextureSelect = (textureName) => {
    this.setState({ selectedTexture: textureName })
  }

  componentDidMount = () => {
    createScene({ onTextureSelect: this.onTextureSelect })
  }

  handleSelection = (selection) => {
    const { imageSelections, selectedTexture } = this.state

    this.setState({
      imageSelections: {
        ...this.state.imageSelections,
        [selectedTexture]: selection
      }
    })

    selectImage(selectedTexture, selection)
  }

  render() {
    const { selectedTexture, imageSelections } = this.state
    const texture = textureData[selectedTexture]
    const selectedImage = imageSelections[selectedTexture]

    return (
      <div>
        { texture && texture.alts ?
          <TexturePicker
            texture={texture}
            selected={selectedImage}
            onSelect={this.handleSelection}
          /> :
          null
        }
      </div>
    )
  }
}

export default App
