import {
  CubeGeometry,
  Mesh,
  MeshLambertMaterial
} from 'three'

export function createBox({ x, y, z, size }) {
  const geometry = new CubeGeometry(size, size, size)
  const material = new MeshLambertMaterial({ color: 0xFFFFFF, wireframe: false })
  const box = new Mesh(geometry, material)

  box.position.set(x, y, z)

  return box
}
