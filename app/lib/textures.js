import {
  TextureLoader,
  MeshLambertMaterial,
  NearestFilter
} from 'three'

let textures = {
  cobblestone: {
    display: 'Cobblestone',
    alts: 1,
    width: 32,
    height: 32,
  },
  cobblestone_mossy: {
    display: 'Mossy Cobblestone',
    alts: 1,
    width: 32,
    height: 32,
  },
  dirt: {
    display: 'Dirt',
    alts: 1,
    width: 32,
    height: 32,
  },
  door: {
    display: 'Door',
    alts: 6,
    width: 32,
    height: 64,
  },
  glass: {
    display: 'Glass',
    alts: 1,
    width: 32,
    height: 32,
    transparent: true,
  },
  grass_top: {
    display: 'Grass Top',
    alts: 2,
    width: 32,
    height: 32,
  },
  grass_side: {
    display: 'Grass Side',
    alts: 1,
    width: 32,
    height: 32,
  },
  leaves_oak: {
    display: 'Leaves',
    alts: 4,
    width: 32,
    height: 32,
    transparent: true,
  },
  log_oak: {
    display: 'Log (Oak)',
    alts: 5,
    width: 32,
    height: 32,
  },
  log_oak_top: {
    display: 'Log Top (Oak)',
    alts: 6,
    width: 32,
    height: 32,
  },
  planks_oak: {
    display: 'Wood Planks',
    alts: 6,
    width: 32,
    height: 32,
  },
  stone: {
    display: 'Stone',
    alts: 1,
    width: 32,
    height: 32,
  },
  wool: {
    display: 'Wool',
    alts: 1,
    width: 32,
    height: 32,
  },
}

for (let name in textures) {
  const texture = textures[name]
  const { transparent, alts } = texture

  const images = []
  for(let i = 0; i < alts; i++) {
    const image = (new TextureLoader()).load(`textures/${name}/${i}.png`)
    image.magFilter = NearestFilter
    images.push(image)
  }

  const material = new MeshLambertMaterial({
    map: images[0],
    transparent: transparent || false,
  })
  material.minecraftType = name

  textures[name] = {
    ...texture,
    material,
    images,
    name,
  }
}

export default textures
