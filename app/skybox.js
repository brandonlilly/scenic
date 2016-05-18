import THREE from 'three'

// https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_cubemap_balls_refraction.html
export function createSkybox() {
  var geometry = new THREE.SphereBufferGeometry( 100, 32, 16 )
  var path = "textures/skybox/"
  var format = '.jpg'
  var urls = [
    path + 'px' + format, path + 'nx' + format,
    path + 'py' + format, path + 'ny' + format,
    path + 'pz' + format, path + 'nz' + format
  ]
  var textureCube = new THREE.CubeTextureLoader().load( urls )
  textureCube.mapping = THREE.CubeRefractionMapping

  var shader = THREE.ShaderLib[ "cube" ]
  shader.uniforms[ "tCube" ].value = textureCube
  var material = new THREE.ShaderMaterial( {
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  } ),
  mesh = new THREE.Mesh( new THREE.BoxGeometry( 5000, 5000, 5000 ), material )
  mesh.position.set(0, 500, 0)
  return mesh
}
