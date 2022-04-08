export class Player {
  private width = 50
  private height = 50
  private velocity = {
    y: 5,
    x: 0
  }
  private jumpVeloc = 15
  private gravity = .5
  private runVelocity = 5
  private hasSupportUnderneath = false

  constructor(
    private ctx: CanvasRenderingContext2D,
    private pos: { x: number, y: number },
    private bound: { x: number, y: number }
  ) {}

  draw() {
    this.ctx.fillRect(
      this.pos.x, this.pos.y,
      this.width, this.height
    )
  }

  update() {
    const { pos, bound } = this

    if (pos.y + this.height + this.velocity.y <= bound.y) {
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