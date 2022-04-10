import { BaseEntity } from './../entities/base-entity'
import { Player } from './../entities/player'

export function collisionHandler(
  player: Player,
  entities: BaseEntity[]
) {
  const collidedWith = entities.find(e => (
    player.pos.y + player.height <= e.pos.y &&
    player.pos.y + player.height + player.velocity.y >= e.pos.y
  ) && (
    player.pos.x >= e.pos.x && player.pos.x <= e.pos.x + e.width
  ))

  if (collidedWith) {
    player.velocity.y = 0
    player.isOnCollision = true
    player.hasSupportUnderneath = true
  } else {
    player.isOnCollision = false
  }
}