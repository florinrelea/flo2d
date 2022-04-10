import { BaseEntity } from './../entities/base-entity'
import { Player } from '../entities/player'

const rightBound = 400
const leftBound = 100

function scrollBackground(playerXVel: number, entities: BaseEntity[], dir: 'left' | 'right') {
  entities.forEach(e => {
    if (dir === 'right') {
      e.pos.x -= playerXVel
    } else {
      e.pos.x += playerXVel
    }
  })
}

export function handlePlayerMovement(
  moveLeft: boolean,
  moveRight: boolean,
  player: Player,
  entities: BaseEntity[]
) {
  if (moveLeft && player.pos.x >= leftBound) {
    player.move('left')
  } else if (moveRight && player.pos.x < rightBound) {
    player.move('right')
  } else {
    player.resetVeloc('x')

    if (moveRight || moveLeft) {
      scrollBackground(player.runVelocity, entities, moveRight ? 'right' : 'left')
    }
  }
}