import { Graphics, type PointData } from "pixi.js";

export class Brick extends Graphics {
  objWidth: number;
  objHeight: number;
  points: number;
  constructor(position: PointData, width: number, height: number, color: number, points: number) {
    super();
    this.objWidth = width;
    this.objHeight = height;
    this.points = points;
    this.rect(0, 0, this.objWidth, this.objHeight);
    this.fill(color);
    this.stroke({ width: 1, color: 0x000000 });
    this.x = position.x;
    this.y = position.y;
  }
}
