import {
  TextureLoader,
  MeshLambertMaterial,
  NearestFilter
} from 'three'

let textures = [
  'cobblestone',
  'cobblestone_mossy',
  'dirt',
  'door',
  'glass',
  'grass_top',
  'grass_side',
  'leaves_oak',
  'log_oak',
  'log_oak_top',
  'planks_oak',
  'stone',
  'wool',
]

let textureData = {}
textures.forEach(texture => {
  const image = (new TextureLoader()).load(`textures/${texture}/0.png`)
  image.magFilter = NearestFilter

  const material = new MeshLambertMaterial({ map: image, transparent: true })

  textureData[texture] = {
    name: texture,
    material,
  }
})

export default textureData
