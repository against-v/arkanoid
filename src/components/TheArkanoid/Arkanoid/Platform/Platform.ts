import { Application, Graphics, type PointData } from "pixi.js";

export class Platform extends Graphics {
  private app: Application;
  private appWidth: number;
  private appHeight: number;
  private objWidth: number;
  private objHeight: number;
  private objTopCenterPoint: PointData;
  constructor(app: Application) {
    super();
    this.app = app;
    this.appWidth = app.screen.width;
    this.appHeight = app.screen.height;

    this.objWidth = this.getObjWidth();
    this.objHeight = this.getObjHeight();
    this.x = this.getX();
    this.y = this.getY();
    this.rect(0, 0, this.objWidth, this.objHeight);
    this.fill(0xff0000);

    this.objTopCenterPoint = this.getObjTopCenterPoint();
  }
  private getObjWidth() {
    return this.appWidth * 0.3;
  }
  private getObjHeight() {
    return this.appHeight * 0.04;
  }

  private getX() {
    return this.appWidth / 2 - this.objWidth / 2;
  }

  private getY() {
    return this.appHeight - this.objHeight - 10;
  }

  private getObjTopCenterPoint() {
    return {
      x: this.x + this.objWidth / 2,
      y: this.y
    };
  }

  public getWidth() {
    return this.objWidth;
  }
  public getHeight() {
    return this.objHeight;
  }
  public getTopCenterPoint() {
    return this.objTopCenterPoint;
  }
}
