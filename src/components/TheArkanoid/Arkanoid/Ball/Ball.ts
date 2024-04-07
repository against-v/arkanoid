import { Application, Graphics, type PointData } from "pixi.js";

export class Ball extends Graphics {
  objRadius: number;
  constructor(app: Application, platformWidth: number, platformTopCenterPoint: PointData) {
    super();
    this.objRadius = this.getObjRadius(platformWidth);
    this.x = this.getX(platformTopCenterPoint);
    this.y = this.getY(platformTopCenterPoint);
    this.circle(0, 0, this.objRadius);
    this.fill(0x8f49ea);
  }

  private getObjRadius(platformWidth: number) {
    return platformWidth * 0.1;
  }
  private getX(platformTopCenterPoint: PointData) {
    return platformTopCenterPoint.x;
  }

  private getY(platformTopCenterPoint: PointData) {
    return platformTopCenterPoint.y - this.objRadius;
  }
  public getRadius() {
    return this.objRadius;
  }
}
