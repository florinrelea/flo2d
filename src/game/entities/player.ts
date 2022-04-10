import { BaseEntity } from "./base-entity"
import img from '../../assets/img/player.png'
import { createImage } from "../utils/image"

export class Player extends BaseEntity {
  public velocity = {
    y: 5,
    x: 0
  }
  private jumpVeloc = 15
  private gravity = .5
  public runVelocity = 5
  public hasSupportUnderneath = false
  public isOnCollision = false
  private img: CanvasImageSource

  constructor(
    ctx: CanvasRenderingContext2D,
    pos: { x: number, y: number }
  ) {
    super(100, 100, ctx, pos)

    this.img = createImage(img)
  }

  draw() {
    this.ctx.fillStyle = 'red'

    this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
  }

  update() {
    const { pos } = this

    if (!this.isOnCollision) {
      this.velocity.y += this.gravity
      this.hasSupportUnderneath = false
    } else {
      this.velocity.y = 0
      this.hasSupportUnderneath = true
    }

    pos.y += this.velocity.y
    pos.x += this.velocity.x

    this.draw()
  }

  jump() {
    if (!this.hasSupportUnderneath) return

    this.velocity.y = -this.jumpVeloc
  }

  move(dir: 'left' | 'right') {
    if (dir === 'left') {
      this.velocity.x = -this.runVelocity
    }

    if (dir === 'right') {
      this.velocity.x = this.runVelocity
    }
  }

  resetVeloc(dir: 'x' | 'y') {
    if (dir === 'x') {
      this.velocity.x = 0
    } else {
      this.velocity.y = 0
    }
  }
}