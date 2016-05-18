import THREE, {
  AmbientLight,
  Clock,
  Color,
  Fog,
  Geometry,
  NearestFilter,
  Object3D,
  PointLight,
  Raycaster,
  Scene,
  SpotLight,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three'
import { createCamera } from './camera'
import { createBox } from './box'
import { createFlyControls } from './flyControls'
import { minBy } from './utils/array'
import { createHighlight } from './highlight'
import { createSkybox } from './skybox'
import textureData from './lib/textures'
import { createGrass, createDirt, createWood, createDoor } from './lib/entities'
import { createTree, createHouse } from './lib/structures'

export function createScene() {
  const scene = new Scene()
  const camera = createCamera()
  const raycaster = new Raycaster()
  const mouse = new Vector2()
  const clock = new Clock()

  const boxSize = 32

  const skybox = createSkybox()
  scene.add(skybox)


  const renderer = new WebGLRenderer({
    antialiasing: true,
    precision: "highp",
    preserveDrawingBuffer: true,
    alpha: true,
  })

  renderer.shadowMap.enabled = false
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  const highlight = createHighlight({ size: boxSize })
  scene.add(highlight)

  let grid = []
  for (let x = 0; x < 10; x++) {
    for(let y = 0; y < 12; y++) {
      for(let z = 0; z < 1; z++) {
        if (z == 0 || Math.random() > 0.95) {
          const box = createGrass({
            x: (x * boxSize) - (boxSize * 10) / 2,
            y: (z * boxSize),
            z: (y * boxSize) - (boxSize * 12) / 2,
          })
          grid.push(box)
          scene.add(box)
        }
      }
    }
  }

  const treeMeshes = createTree({ x: 64, y: 32, z: 64 })
  treeMeshes.forEach(mesh => scene.add(mesh))
  grid = grid.concat(treeMeshes)

  const houseMeshes = createHouse({ x: -7 * boxSize, y: 0, z: 6 * boxSize })
  houseMeshes.forEach(mesh => scene.add(mesh))
  grid = grid.concat(houseMeshes)

  const ambLight = new AmbientLight( 0x999999 )
  scene.add( ambLight )

  let pointLight = new PointLight( 0x4477aa, 1, 500 )
  pointLight.position.set( 50, 150, 100 )
  pointLight.castShadow = true
  scene.add(pointLight)

  pointLight = new SpotLight( 0xff5566, 1, 500, Math.PI / 4)
  pointLight.position.set( -50, 280, -280 )
  pointLight.castShadow = true
  scene.add(pointLight)

  let sun = new PointLight( 0xffffff, 1, 3000, 0 )
  sun.position.set( -1300, 950, 1500 )
  sun.castShadow = true
  scene.add(sun)

  const container = document.getElementById("scene")
  container.appendChild(renderer.domElement)

  const object = new Object3D()
  const controls = createFlyControls(object, {
    movementSpeed: 150,
    domElement:   container,
    rollSpeed:    Math.PI / 3,
    autoForward:  false,
    dragToLook:   true,
    predicate:    arg => true,
  })

  window.controls = controls

  object.add(camera)
  scene.add(object)

  object.position.set(135, 60, -245)
  object.rotation.x = 2.9429
  object.rotation.y = 0.4816
  object.rotation.z = -3.0102

  let delta = 0
  let hovered

  animate()

  function animate() {
    render()
    requestAnimationFrame(animate)
  }

  function render() {
    delta = clock.getDelta()
    controls.update(delta)

    raycaster.setFromCamera(mouse, camera)
    let intersects = raycaster.intersectObjects(grid)
    hovered = intersects[0]

    if (hovered) {
      highlight.position.set(
        hovered.object.position.x + hovered.face.normal.x,
        hovered.object.position.y + hovered.face.normal.y,
        hovered.object.position.z + hovered.face.normal.z,
      )
    }

    renderer.render(scene, camera)
  }

  const sceneEl = document.getElementById('scene')

  window.addEventListener('resize', onWindowResize, true)
  sceneEl.addEventListener('mousemove', onMouseMove, false)
  sceneEl.addEventListener('click', onLeftClick, false)
  sceneEl.addEventListener('contextmenu', onRightClick, false)
  sceneEl.addEventListener('keypress', onKeyPress, false)

  onWindowResize()

  function changeTexture(image) {
    const texture = (new TextureLoader()).load(`textures/${image}.png`)
    texture.magFilter = NearestFilter

    grid.forEach(box => {
      box.material.map = texture
      box.material.map.needsUpdate = true
    })
  }

  function onKeyPress(event) {
    const keys = { t: 116, y: 121 }

    // t is pressed
    if (event.keyCode == keys.t) {
      changeTexture("grass-and-side")
    }
    if (event.keyCode == keys.y) {
      changeTexture("grass_side")
    }
  }

  function onLeftClick(event) {
    event.preventDefault()
    if (hovered) {
      // scene.remove(hovered.object)
      // const index = grid.indexOf(hovered.object)
      // grid.splice(index, 1)
      let materialIndex = hovered.face.materialIndex
      let type = hovered.object.material.materials[materialIndex].minecraftType
      console.log(type)
    }
    return false
  }

  function onRightClick(event) {
    if (hovered) {
      const box = createBox({
        x: hovered.object.position.x + hovered.face.normal.x * boxSize,
        y: hovered.object.position.y + hovered.face.normal.y * boxSize,
        z: hovered.object.position.z + hovered.face.normal.z * boxSize,
        size: boxSize
      })
      grid.push(box)
      scene.add(box)
    }
  }

  function onWindowResize() {
    const { width, height } = sceneEl.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  function onMouseMove(event) {
    const { width, height, left } = sceneEl.getBoundingClientRect()

    // x and y expected to be between -1 and 1
  	mouse.x = (event.clientX - left) / width * 2 - 1
  	mouse.y = - (event.clientY / height) * 2 + 1
  }

}
