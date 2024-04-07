import { Application, Container } from "pixi.js";
import { Platform } from "@/components/TheArkanoid/Arkanoid/Platform";
import { Ball } from "@/components/TheArkanoid/Arkanoid/Ball";
import { UserPlatformInteraction } from "@/components/TheArkanoid/Arkanoid/UserPlatformInteraction";
import { BallInteraction } from "@/components/TheArkanoid/Arkanoid/BallInteraction";
import { BricksCollection } from "@/components/TheArkanoid/Arkanoid/BricksCollection";

export class Arkanoid {
  elements: Container[];
  app: Application | null;
  points: number;
  onFinishGame: () => void;

  constructor(onFinishGame: (points: number) => void) {
    this.app = null;
    this.elements = [];
    this.points = 0;
    this.onFinishGame = () => onFinishGame(this.points);
  }

  private draw() {
    if (!this.app) {
      return;
    }
    const platform = new Platform(this.app);
    this.app.stage.addChild(platform);
    const userPlatformInteraction = new UserPlatformInteraction(this.app, platform);
    userPlatformInteraction.init();
    const bricksCollection = new BricksCollection(this.app, this.onBeforeDestroyBrickCb);
    this.app.stage.addChild(...bricksCollection.getBricksCollection());
    const ball = new Ball(this.app, platform.getWidth(), platform.getTopCenterPoint());
    this.app.stage.addChild(ball);
    const ballInteraction = new BallInteraction(
      this.app,
      ball,
      platform,
      bricksCollection,
      this.onFinishGame
    );
    ballInteraction.init();
  }

  private onBeforeDestroyBrickCb = (points: number) => {
    this.points += points;
  };
  public async init(root: HTMLElement) {
    this.app = new Application();
    await this.app.init({ resizeTo: root });
    this.app.stage.eventMode = "static";
    this.app.stage.hitArea = this.app.screen;
    this.draw();
    root.appendChild(this.app.canvas);
  }

  public destroy() {
    if (!this.app) {
      return;
    }
    this.app.destroy({ removeView: true });
  }
}
