import { BaseEntity } from "./base-entity"

export class Player extends BaseEntity {
  public velocity = {
    y: 5,
    x: 0
  }
  private jumpVeloc = 15
  private gravity = .5
  public runVelocity = 5
  public hasSupportUnderneath = false
  private bound: { x: number, y: number }
  public isOnCollision = false

  constructor(
    ctx: CanvasRenderingContext2D,
    pos: { x: number, y: number },
    bound: { x: number, y: number }
  ) {
    super(50, 50, ctx, pos)

    this.bound = bound
  }

  draw() {
    this.ctx.fillStyle = 'red'

    const halfSize = Math.round(this.width / 2)

    this.ctx.beginPath()
    this.ctx.arc(
      this.pos.x + halfSize,
      this.pos.y + halfSize,
      halfSize,
      0,
      2 * Math.PI,
      false
    )

    this.ctx.fill()
  }

  update() {
    const { pos, bound } = this

    if ((
      pos.y + this.height + this.velocity.y <= bound.y
    ) && !this.isOnCollision) {
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