import { BaseEntity } from "./base-entity"

export class Platform extends BaseEntity {
  constructor(
    ctx: CanvasRenderingContext2D,
    pos: { x: number, y: number }
  ) {
    super(200, 50, ctx, pos)
  }

  draw() {
    const { pos } = this

    this.ctx.fillStyle = 'blue'
    this.ctx.fillRect(pos.x, pos.y, this.width, this.height)
  }
}