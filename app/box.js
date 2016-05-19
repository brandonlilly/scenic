import {
  CubeGeometry,
  Mesh,
  MeshFaceMaterial,
  MeshLambertMaterial,
  NearestFilter,
  TextureLoader
} from 'three'

const grass_top_texture = (new TextureLoader()).load("textures/grass_top/0.png")
const grass_side_texture = (new TextureLoader()).load("textures/grass_side/0.png")
const dirt_texture = (new TextureLoader()).load("textures/dirt/0.png")

grass_top_texture.magFilter = NearestFilter
grass_side_texture.magFilter = NearestFilter
dirt_texture.magFilter = NearestFilter

const grass_top_material = new MeshLambertMaterial({ map: grass_top_texture })
const grass_side_material = new MeshLambertMaterial({ map: grass_side_texture })
const dirt_material = new MeshLambertMaterial({ map: dirt_texture })
grass_side_material.minecraftType = "grass_side"
grass_top_material.minecraftType = "grass_top"
dirt_material.minecraftType = "dirt"

const materials = [
  grass_side_material,
  grass_side_material,
  grass_top_material,
  dirt_material,
  grass_side_material,
  grass_side_material,
]
const faceMaterial = new MeshFaceMaterial(materials)

export function createBox({ x, y, z, size }) {
  const geometry = new CubeGeometry(size, size, size)

  const box = new Mesh(
    geometry,
    faceMaterial
  )

  box.position.set(x, y, z)

  return box
}
