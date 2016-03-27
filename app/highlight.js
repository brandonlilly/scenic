import {
  CubeGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial
} from 'three'

export function createHighlight({ size }) {
  const geometry = new CubeGeometry(size - 1, size - 1, size - 1)
  const material = new MeshBasicMaterial({
    color: 0xe4b717,
    side: DoubleSide,
    transparent: true,
    wireframe: true,
    opacity: 0.5,
  })
  const highlight = new Mesh(geometry, material)

  return highlight
}
