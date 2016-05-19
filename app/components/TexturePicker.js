import React from 'react'
import { times } from '../utils/integer'
import { classSet } from '../utils/react'

const TextureDisplay = ({ texture, index, active, onClick }) => {
  const { name, width, height } = texture

  const url = `textures/${name}/${index}.png`
  const style = {
    backgroundImage: `url("${url}")`,
    width: width * 3,
    height: height * 3,
  }
  const classes = classSet({ textureDisplay: true, active })

  return (
    <article className={classes} style={style} onClick={onClick}></article>
  )
}

const TexturePicker = ({ texture, selected, onSelect }) => {
  return (
    <div className="texturePicker">
      <h2>{texture.display}</h2>
      <section>
        {times(texture.alts, index => (
          <TextureDisplay
            texture={texture}
            index={index}
            onClick={event => {
              event.preventDefault()
              onSelect(index)
            }}
            active={index === selected}
            key={`${texture.name}-${index}`}
          />
        ))}
      </section>
    </div>
  )
}

export default TexturePicker
