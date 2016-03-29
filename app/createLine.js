import THREE, {
  Geometry,
  Color,
  TextureLoader,
  Vector2,
} from 'three'
import { MeshLine, MeshLineMaterial } from './vendor/MeshLine'

export function createLine(camera) {
  let geometry = new THREE.Geometry();
  // for( let j = 0; j < Math.PI; j += 2 * Math.PI / 100 ) {
  //   let v = new THREE.Vector3(Math.cos(j), Math.sin(j), 0);
  //   geometry.vertices.push(v);
  // }

  for(let i = 0; i <= 200; i++) {
    let v = new THREE.Vector3(i, Math.cos(4 * Math.PI / 200 * i)*10, Math.sin(4 * Math.PI / 200 * i)*10)
    geometry.vertices.push(v)
  }

  const meshLine = new MeshLine()
  meshLine.setGeometry(geometry)

  var resolution = new Vector2(window.innerWidth, window.innerHeight);

  // const textureLoader = new TextureLoader()

  const material = new MeshLineMaterial({
    // map: textureLoader.load("textures/stroke.png"),
    // useMap: params.strokes,
    color: new Color(0x336699),
    opacity: .5,
    dashArray: new Vector2(10, 5),
    resolution: resolution,
    // sizeAttenuation: params.sizeAttenuation,
    lineWidth: 2,
    near: 1,
    far: 5000,
    // depthTest: !params.strokes,
    blending: THREE.NormalBlending,
    // transparent: params.strokes,
    side: THREE.DoubleSide
  })

  const mesh = new THREE.Mesh(meshLine.geometry, material);

  return mesh
}
