import THREE, {
  AmbientLight,
  Clock,
  Color,
  Fog,
  Object3D,
  PointLight,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer
} from 'three'
import { createCamera } from './camera'
import { createBox } from './box'
import { randomize } from './utils'
import { createFlyControls } from './flyControls'
import { minBy } from './utils/array'
import { createHighlight } from './highlight'

export function createScene() {
  const scene = new Scene()
  const camera = createCamera()
  const raycaster = new Raycaster()
  const mouse = new Vector2()
  const clock = new Clock()

  // scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );


  const boxSize = 40

  window.camera = camera

  const highlight = createHighlight({ size: boxSize })
  scene.add(highlight)

  let grid = []
  for (let x = 0; x < 10; x++) {
    for(let y = 0; y < 12; y++) {
      for(let z = 0; z < 3; z++) {
        if (z == 0 || Math.random() > 0.8) {
          const box = createBox({
            x: (x * boxSize) - (boxSize * 10) / 2,
            y: (z * boxSize) - 100,
            z: -(y * boxSize) - 200,
            size: boxSize,
          })
          grid.push(box)
          scene.add(box)
        }
      }
    }
  }

  const ambLight = new AmbientLight( 0x404040 )
  scene.add( ambLight )

  const pointLight = new PointLight( 0xff5566, 1, 500 )
  pointLight.position.set( 50, 50, 50 )
  scene.add(pointLight)

  const renderer = new WebGLRenderer({
    antialiasing: true,
    precision: "highp",
    stencil: true,
    preserveDrawingBuffer: true,
    alpha: true,
  })

  const container = document.getElementById("scene")
  container.appendChild(renderer.domElement)

  const object = new Object3D()
  const controls = createFlyControls(object, {
    movementSpeed: 100,
    domElement:   container,
    rollSpeed:    Math.PI / 3,
    autoForward:  false,
    dragToLook:   true,
    predicate:    arg => true,
  })

  object.add(camera)
  scene.add(object)

  let delta = 0

  animate()
  function animate() {
    requestAnimationFrame(animate)
    render()
  }

  let hovered
  function render() {
    delta = clock.getDelta()
    controls.update(delta)

    if (hovered) {
      // setFaceColor(hovered.object, hovered.faceIndex, 0xffffff)
    }

    raycaster.setFromCamera(mouse, camera)
    let intersects = raycaster.intersectObjects(grid)
    hovered = minBy(intersects, intersect => intersect.distance)

    if (hovered) {
      highlight.position.set(
        hovered.object.position.x + hovered.face.normal.x,
        hovered.object.position.y + hovered.face.normal.y,
        hovered.object.position.z + hovered.face.normal.z,
      )

      // setFaceColor(hovered.object, hovered.faceIndex, 0x336699)
    }

    renderer.render(scene, camera)
  }

  window.addEventListener('resize', onWindowResize, true)
  onWindowResize()
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('mousemove', onMouseMove, false)
  function onMouseMove(event) {
  	// calculate mouse position in normalized device coordinates
  	// (-1 to +1) for both components
  	mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
  }

  window.addEventListener('click', (event) => {
    console.log('hovered', hovered)

    const box = createBox({
      x: hovered.object.position.x + hovered.face.normal.x * boxSize,
      y: hovered.object.position.y + hovered.face.normal.y * boxSize,
      z: hovered.object.position.z + hovered.face.normal.z * boxSize,
      size: boxSize
    })
    grid.push(box)
    scene.add(box)
  }, false)
}

createScene()

function setFaceColor(object, faceIndex, color) {
  faceIndex = faceIndex % 2 === 1 ? faceIndex - 1 : faceIndex

  object.geometry.faces[faceIndex].color.set(color)
  object.geometry.faces[faceIndex + 1].color.set(color)
  object.geometry.faces
  object.geometry.colorsNeedUpdate = true
}
