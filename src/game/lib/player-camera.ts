import { GenericObject } from './../entities/generic-object'
import { BaseEntity } from './../entities/base-entity'
import { Player } from '../entities/player'

const rightBound = 400
const leftBound = 100

function scrollBackground(
  playerXVel: number,
  entities: BaseEntity[],
  bgElements: GenericObject[],
  dir: 'left' | 'right'
) {
  entities.forEach(e => {
    if (dir === 'right') {
      e.pos.x -= playerXVel
    } else {
      e.pos.x += playerXVel
    }
  })

  bgElements.forEach(e => {
    const vel = Math.round(100 * (playerXVel / 2)) / 100

    if (dir === 'right') {
      e.pos.x -= vel
    } else {
      e.pos.x += vel
    }
  })
}

export function handlePlayerMovement(
  moveLeft: boolean,
  moveRight: boolean,
  player: Player,
  entities: BaseEntity[],
  bgElements: GenericObject[],
  boundaries: { x: number, y: number }
) {
  if (moveLeft && player.pos.x >= leftBound) {
    player.move('left')
  } else if (moveRight && player.pos.x < rightBound) {
    player.move('right')
  } else {
    player.resetVeloc('x')

    if (moveRight || moveLeft) {
      scrollBackground(
        player.runVelocity,
        entities,
        bgElements,
        moveRight ? 'right' : 'left'
      )
    }
  }

  if (player.pos.y > boundaries.y) {
    // Player lost
    player.pos.x = 10
    player.pos.y = 20
  }
}
