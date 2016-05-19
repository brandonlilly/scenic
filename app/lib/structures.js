import { createWood, createLeaves, createPlanks, createDoor, createGlass, createWool } from './entities'
import { times } from '../utils/integer'
const size = 32

export function createTree({ x, y, z }) {
  const meshes = []

  const leaves = [
    [-1, 3, 0], [1, 3, 0], [0, 3, -1], [0, 3, 1],
    [-1, 4, 0], [1, 4, 0], [0, 4, -1], [0, 4, 1],
    [-2, 4, 0], [2, 4, 0], [0, 4, -2], [0, 4, 2],
    [-1, 4, 1], [1, 4, -1], [-1, 4, -1], [1, 4, 1],
    [-1, 5, 0], [1, 5, 0], [0, 5, -1], [0, 5, 1], [0, 5, 0],
    [0, 6, 0]
  ]

  times(5, i => {
    meshes.push(
      createWood({ x, y: y + size * i, z })
    )
  })

  leaves.forEach(coords => {
    meshes.push(
      createLeaves({
        x: x + size * coords[0],
        y: y + size * coords[1],
        z: z + size * coords[2],
      })
    )
  })

  return meshes
}

export function createHouse({ x, y, z }) {
  const meshes = []

  const floors = [
    "       \n" +
    " LLLLL \n" +
    " LLLLL \n" +
    " LLLLL \n" +
    " LLLLL \n" +
    "   L   ",
    "WWWWWWW\n" +
    "W     W\n" +
    "W     W\n" +
    "W     W\n" +
    "W     W\n" +
    "WWWDWWW",
    "WWWWWWW\n" +
    "W     W\n" +
    "W     W\n" +
    "W     W\n" +
    "W     W\n" +
    "WGW WGW",
    "WWWWWWW\n" +
    "W     W\n" +
    "W     W\n" +
    "W     W\n" +
    "W     W\n" +
    "WWWWWWW",
  ]

  floors.forEach((floor, yIdx) => {
    floor.split("\n").forEach((layer, zIdx) => {
      layer.split('').forEach((char, xIdx) => {
        const xPos = x + size * xIdx
        const yPos = y + size * yIdx
        const zPos = z + size * -zIdx
        switch(char) {
          case "W":
            meshes.push(createPlanks({ x: xPos, y: yPos, z: zPos }))
            break
          case "L":
            meshes.push(createWool({ x: xPos, y: yPos, z: zPos }))
            break
          case "G":
            meshes.push(createGlass({ x: xPos, y: yPos, z: zPos }))
            break
          case "D":
            const door = createDoor({ x: xPos, y: yPos, z: zPos })
            door.rotation.y = -Math.PI / 2
            meshes.push(door)
            break
        }
      })
    })
  })

  return meshes
}
