import { Application, FederatedPointerEvent, Graphics } from "pixi.js";

export class Platform extends Graphics {
  app: Application;
  appWidth: number;
  appHeight: number;
  objWidth: number;
  objHeight: number;
  objPointerX: number;
  constructor(app: Application) {
    super();
    this.app = app;
    this.appWidth = app.screen.width;
    this.appHeight = app.screen.height;
    this.objPointerX = 0;

    this.objWidth = this.getWidth();
    this.objHeight = this.getHeight();
    this.x = this.getX();
    this.y = this.getY();
    this.rect(0, 0, this.objWidth, this.objHeight);
    this.fill(0xff0000);

    this.eventMode = "static";
    this.cursor = "pointer";
    this.on("pointerdown", this.handlePointerDown);
  }
  private getWidth() {
    return this.appWidth * 0.3;
  }
  private getHeight() {
    return this.appHeight * 0.04;
  }

  private getX() {
    return this.appWidth / 2 - this.objWidth / 2;
  }

  private getY() {
    return this.appHeight - this.objHeight - 10;
  }

  private handlePointerDown(e: FederatedPointerEvent) {
    this.objPointerX = this.x - e.globalX;
    this.app.stage.on("pointermove", this.handlePointerMove, this);
    this.app.stage.on("pointerup", this.handlePointerUp, this);
    this.app.stage.on("pointerupoutside", this.handlePointerUp, this);
  }

  private handlePointerMove(e: FederatedPointerEvent) {
    const newX = e.globalX + this.objPointerX;
    if (newX <= 0) {
      this.x = 0;
      return;
    }
    const maxX = this.appWidth - this.objWidth;
    if (newX >= maxX) {
      this.x = maxX;
      return;
    }
    this.x = newX;
  }

  private handlePointerUp() {
    this.app.stage.off("pointermove", this.handlePointerMove);
    this.objPointerX = 0;
  }
}
