import {
  PerspectiveCamera,
} from 'three'

function newCamera(Camera, { viewAngle, aspectRatio, near, far }){
  return new Camera(viewAngle, aspectRatio, near, far)
}

export function createCamera() {
  const camera = newCamera(PerspectiveCamera, {
    viewAngle: 60,
    aspectRatio: window.innerWidth / 2 / window.innerHeight,
    near: 1,
    far: 5000
  })
  camera.position.z = 0
  camera.position.y = 0
  camera.position.x = 0

  return camera
}
