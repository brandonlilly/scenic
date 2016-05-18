import React from 'react'

const TextureDisplay = ({ texture, image }) => {
  const url = `textures/${texture}/${image}.png`

  const style = {backgroundImage: `url("${url}")`}

  return (
    <div className="textureDisplay" style={style}></div>
  )
}

const TexturePicker = () => {
  const texture = "planks_oak"
  const images = [ "0", "1", "2", "3", "4", "5" ]


  return (
    <div className="texturePicker">
      <h2>{texture}</h2>
      {images.map(image => (
        <TextureDisplay texture={texture} image={image} key={image} />
      ))}
    </div>
  )
}

export default TexturePicker
