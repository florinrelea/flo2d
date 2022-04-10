import { BaseEntity } from "./base-entity"
import left from '../../assets/img/GrassCliffLeft.png'
import mid from '../../assets/img/GrassCliffMid.png'
import right from '../../assets/img/GrassCliffRight.png'
import { createImage } from "../utils/image"

const platformSize = [128, 128]


export class Platform extends BaseEntity {
  private img: CanvasImageSource

  constructor(
    ctx: CanvasRenderingContext2D,
    pos: { x: number, y: number },
    dir = 'mid' as 'left' | 'mid' | 'right'
  ) {
    const w = platformSize[0] / 2
    const h = platformSize[1] / 2

    super(w, h, ctx, pos)

    let src

    if (dir === 'left') {
      src = left
    } else if (dir === 'mid') {
      src = mid
    } else {
      src = right
    }

    this.img = createImage(src)
  }

  draw() {
    const { pos } = this

    this.ctx.drawImage(this.img, pos.x, pos.y, this.width, this.height)
  }
}