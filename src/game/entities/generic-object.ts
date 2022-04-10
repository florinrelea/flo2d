import { createImage } from '../utils/image'
import { BaseEntity } from './base-entity'

export class GenericObject extends BaseEntity {
  private img: CanvasImageSource

  constructor({
    width,
    height,
    image,
    ctx,
    pos
  }: {
    width: number
    height: number
    image: string
    ctx: CanvasRenderingContext2D
    pos: { x: number, y: number }
  }) {
    super(width, height, ctx, pos)

    this.img = createImage(image)
  }

  draw() {
    this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
  }
}