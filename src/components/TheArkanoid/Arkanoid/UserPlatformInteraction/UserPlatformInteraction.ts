import type { Application } from "pixi.js";
import type { Platform } from "@/components/TheArkanoid/Arkanoid/Platform";
import { FederatedPointerEvent } from "pixi.js";

export class UserPlatformInteraction {
  app: Application;
  platform: Platform;
  platformPointerX: number;
  constructor(app: Application, platform: Platform) {
    this.app = app;
    this.platform = platform;
    this.platformPointerX = 0;
  }

  private handlePointerDown(e: FederatedPointerEvent) {
    this.platformPointerX = this.platform.x - e.globalX;
    this.app.stage.on("pointermove", this.handlePointerMove, this);
    this.app.stage.on("pointerup", this.handlePointerUp, this);
    this.app.stage.on("pointerupoutside", this.handlePointerUp, this);
  }

  private handlePointerMove(e: FederatedPointerEvent) {
    const newX = e.globalX + this.platformPointerX;
    if (newX <= 0) {
      this.platform.x = 0;
      return;
    }
    const maxX = this.app.screen.width - this.platform.width;
    if (newX >= maxX) {
      this.platform.x = maxX;
      return;
    }
    this.platform.x = newX;
  }

  private handlePointerUp() {
    this.app.stage.off("pointermove", this.handlePointerMove);
    this.platformPointerX = 0;
  }
  init() {
    this.platform.eventMode = "static";
    this.platform.cursor = "pointer";
    this.platform.on("pointerdown", this.handlePointerDown, this);
  }
}
