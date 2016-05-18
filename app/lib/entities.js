import {
  BoxGeometry,
  CubeGeometry,
  Mesh,
  MeshFaceMaterial
} from 'three'
import textureData from './textures'

const size = 32

export function createGrass({x, y, z}) {
  const geometry = new CubeGeometry(size, size, size)

  const materials = [
    textureData.grass_side.material,
    textureData.grass_side.material,
    textureData.grass_top.material,
    textureData.dirt.material,
    textureData.grass_side.material,
    textureData.grass_side.material,
  ]
  const faceMaterial = new MeshFaceMaterial(materials)
  const mesh = new Mesh(geometry, faceMaterial)
  mesh.castShadow = true
  mesh.receiveShadow = true

  mesh.position.set(x, y, z)

  return mesh
}

export function createDirt({x, y, z}) {
  const geometry = new CubeGeometry(size, size, size)

  const materials = [
    textureData.dirt.material,
    textureData.dirt.material,
    textureData.dirt.material,
    textureData.dirt.material,
    textureData.dirt.material,
    textureData.dirt.material,
  ]
  const faceMaterial = new MeshFaceMaterial(materials)
  const mesh = new Mesh(geometry, faceMaterial)
  mesh.castShadow = true
  mesh.receiveShadow = true

  mesh.position.set(x, y, z)

  return mesh
}

export function createWood({x, y, z}) {
  const geometry = new CubeGeometry(size, size, size)

  const materials = [
    textureData.log_oak.material,
    textureData.log_oak.material,
    textureData.log_oak_top.material,
    textureData.log_oak_top.material,
    textureData.log_oak.material,
    textureData.log_oak.material,
  ]
  const faceMaterial = new MeshFaceMaterial(materials)
  const mesh = new Mesh(geometry, faceMaterial)
  mesh.castShadow = true
  mesh.receiveShadow = true

  mesh.position.set(x, y, z)

  return mesh
}

export function createLeaves({x, y, z}) {
  const geometry = new CubeGeometry(size, size, size)

  const materials = [
    textureData.leaves_oak.material,
    textureData.leaves_oak.material,
    textureData.leaves_oak.material,
    textureData.leaves_oak.material,
    textureData.leaves_oak.material,
    textureData.leaves_oak.material,
  ]
  const faceMaterial = new MeshFaceMaterial(materials)
  const mesh = new Mesh(geometry, faceMaterial)
  mesh.castShadow = true
  mesh.receiveShadow = true

  mesh.position.set(x, y, z)

  return mesh
}

export function createPlanks({x, y, z}) {
  const geometry = new CubeGeometry(size, size, size)

  const materials = [
    textureData.planks_oak.material,
    textureData.planks_oak.material,
    textureData.planks_oak.material,
    textureData.planks_oak.material,
    textureData.planks_oak.material,
    textureData.planks_oak.material,
  ]
  const faceMaterial = new MeshFaceMaterial(materials)
  const mesh = new Mesh(geometry, faceMaterial)
  mesh.castShadow = true
  mesh.receiveShadow = true

  mesh.position.set(x, y, z)

  return mesh
}

export function createGlass({x, y, z}) {
  const geometry = new CubeGeometry(size, size, size)

  const materials = [
    textureData.glass.material,
    textureData.glass.material,
    textureData.glass.material,
    textureData.glass.material,
    textureData.glass.material,
    textureData.glass.material,
  ]
  const faceMaterial = new MeshFaceMaterial(materials)
  const mesh = new Mesh(geometry, faceMaterial)
  mesh.castShadow = true
  mesh.receiveShadow = true

  mesh.position.set(x, y, z)

  return mesh
}

export function createWool({x, y, z}) {
  const geometry = new CubeGeometry(size, size, size)

  const materials = [
    textureData.wool.material,
    textureData.wool.material,
    textureData.wool.material,
    textureData.wool.material,
    textureData.wool.material,
    textureData.wool.material,
  ]
  const faceMaterial = new MeshFaceMaterial(materials)
  const mesh = new Mesh(geometry, faceMaterial)
  mesh.castShadow = true
  mesh.receiveShadow = true

  mesh.position.set(x, y, z)

  return mesh
}

export function createDoor({x, y, z}) {
  const height = size * 2
  const geometry = new BoxGeometry(2, height, size)

  // textureData.door.material.map.repeat.set(-1)

  const materials = [
    textureData.door.material,
    textureData.door.material,
    textureData.door.material,
    textureData.door.material,
    textureData.door.material,
    textureData.door.material,
  ]
  const faceMaterial = new MeshFaceMaterial(materials)
  const mesh = new Mesh(geometry, faceMaterial)
  mesh.castShadow = true
  mesh.receiveShadow = true

  mesh.position.set(x, y + size / 2, z)

  return mesh
}
