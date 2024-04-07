import type { Application, Container } from "pixi.js";
import type { Ball } from "@/components/TheArkanoid/Arkanoid/Ball";
import { Platform } from "@/components/TheArkanoid/Arkanoid/Platform";

const SPEED = 10;

const testForAABB = (object1: Container, object2: Container) => {
  const bounds1 = object1.getBounds();
  const bounds2 = object2.getBounds();

  return (
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.x + bounds1.width > bounds2.x &&
    bounds1.y < bounds2.y + bounds2.height &&
    bounds1.y + bounds1.height > bounds2.y
  );
};

export class BallInteraction {
  app: Application;
  ball: Ball;
  platform: Platform;
  isStartAnimationRunning: boolean;
  yDirection: number;
  xDirection: number;
  bounceAngle: number;
  constructor(app: Application, ball: Ball, platform: Platform) {
    this.app = app;
    this.ball = ball;
    this.platform = platform;
    this.isStartAnimationRunning = false;
    this.yDirection = -1;
    this.xDirection = 0;
    this.bounceAngle = 0;
  }

  private tickerCb() {
    this.interactionWithBorders();
    this.interactionWithPlatform();

    const bounceAngleInRadians = this.bounceAngle * (Math.PI / 180);
    const ballSpeedX = SPEED * Math.cos(bounceAngleInRadians) * this.xDirection;
    this.ball.x = this.ball.x + ballSpeedX;
    this.ball.y = this.ball.y + this.yDirection * SPEED;
  }

  private handlePointerDown() {
    this.ball.eventMode = "passive";
    this.app.ticker.add(this.tickerCb, this);
  }
  public init() {
    this.ball.eventMode = "static";
    this.ball.cursor = "pointer";
    this.ball.on("pointerdown", this.handlePointerDown, this);
    this.isStartAnimationRunning = true;
  }

  private stopAnimation() {
    this.app.ticker.remove(this.tickerCb, this);
  }

  private interactionWithBorders() {
    if (this.yDirection === -1 && this.ball.y <= this.ball.getRadius()) {
      this.yDirection = 1;
    }

    if (this.yDirection === 1 && this.ball.y >= this.app.screen.height - this.ball.getRadius()) {
      this.stopAnimation();
    }

    if (this.xDirection === -1 && this.ball.x - this.ball.getRadius() <= 0) {
      this.xDirection = 1;
    }

    if (this.xDirection === 1 && this.ball.x + this.ball.getRadius() >= this.app.screen.width) {
      this.xDirection = -1;
    }
  }

  private interactionWithPlatform() {
    if (this.yDirection !== 1) {
      return;
    }
    const ballIsTooHigh =
      this.ball.y < this.app.screen.height - this.ball.getRadius() - this.platform.height;
    if (ballIsTooHigh) {
      return;
    }
    if (!testForAABB(this.ball, this.platform)) {
      return;
    }

    this.yDirection = -1;
    this.ball.y = this.ball.y + this.yDirection * SPEED;

    const relativeIntersectX = this.platform.getTopCenterPoint().x - this.ball.x;
    let normalizedRelativeIntersectionX =
      1 - Math.abs(relativeIntersectX / (this.platform.width / 2));
    if (relativeIntersectX > 0) {
      normalizedRelativeIntersectionX =
        1 - Math.abs((relativeIntersectX - this.ball.getRadius()) / (this.platform.width / 2));
    }
    if (relativeIntersectX < 0) {
      normalizedRelativeIntersectionX =
        1 - Math.abs((relativeIntersectX + this.ball.getRadius()) / (this.platform.width / 2));
    }
    if (relativeIntersectX >= 0) {
      this.bounceAngle = normalizedRelativeIntersectionX * 90;
    } else {
      this.bounceAngle = normalizedRelativeIntersectionX * 90 * -1;
    }
    switch (Math.sign(this.bounceAngle)) {
      case 1:
        this.xDirection = -1;
        break;
      case -1:
        this.xDirection = 1;
        break;
      default:
        this.xDirection = 0;
    }
  }
}
