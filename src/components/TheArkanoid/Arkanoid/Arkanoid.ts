import { Application, Container } from "pixi.js";
import { Platform } from "@/components/TheArkanoid/Arkanoid/Platform";

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
  }
  public async init(root: HTMLElement) {
    await this.app.init({ resizeTo: root });
    this.app.stage.eventMode = "static";
    this.app.stage.hitArea = this.app.screen;
    this.draw();
    root.appendChild(this.app.canvas);
  }
}
