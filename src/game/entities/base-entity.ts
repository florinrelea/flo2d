export class BaseEntity {
  constructor(
    public width: number,
    public height: number,
    protected ctx: CanvasRenderingContext2D,
    public pos: { x: number, y: number }
  ) {}
}