import { Application, Container } from "pixi.js";
import { Platform } from "@/components/TheArkanoid/Arkanoid/Platform";
import { Ball } from "@/components/TheArkanoid/Arkanoid/Ball/Ball";
import { UserPlatformInteraction } from "@/components/TheArkanoid/Arkanoid/UserPlatformInteraction";

export class Arkanoid {
  elements: Container[];
  app: Application;

  constructor() {
    this.app = new Application();
    this.elements = [];
  }

  private draw() {
    const platform = new Platform(this.app);
    this.app.stage.addChild(platform);
    const userPlatformInteraction = new UserPlatformInteraction(this.app, platform);
    userPlatformInteraction.init();

    const ball = new Ball(this.app, platform.getWidth(), platform.getTopCenterPoint());
    this.app.stage.addChild(ball);
  }
  public async init(root: HTMLElement) {
    await this.app.init({ resizeTo: root });
    this.app.stage.eventMode = "static";
    this.app.stage.hitArea = this.app.screen;
    this.draw();
    root.appendChild(this.app.canvas);
  }
}
