import type { Application, Container } from "pixi.js";
import type { Ball } from "@/components/TheArkanoid/Arkanoid/Ball";
import { Ticker } from "pixi.js";
import { Platform } from "@/components/TheArkanoid/Arkanoid/Platform";

const UP = -1;
const DOWN = 1;
const RIGHT = 1;
const LEFT = -1;
const SPEED = 3;

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
    this.yDirection = UP;
    this.xDirection = 0;
    this.bounceAngle = 0;
  }

  private tickerCb(time: Ticker) {
    const delta = time.deltaTime;
    if (this.yDirection === UP && this.ball.y <= this.ball.getRadius()) {
      this.ball.y = this.ball.getRadius();
      this.yDirection = DOWN;
    } else {
      this.ball.y = this.ball.y + this.yDirection * SPEED * delta;
    }

    if (this.yDirection === DOWN && this.ball.y >= this.app.screen.height - this.ball.getRadius()) {
      this.stopAnimation();
    } else {
      this.ball.y = this.ball.y + this.yDirection * SPEED * delta;
    }

    if (
      this.yDirection === DOWN &&
      this.ball.y >= this.app.screen.height - this.ball.getRadius() - this.platform.height
    ) {
      if (testForAABB(this.ball, this.platform)) {
        // debugger;
        this.yDirection = UP;
        this.ball.y = this.ball.y + this.yDirection * SPEED * delta;
        const platformCenterX = this.platform.x + this.platform.width / 2;
        const ballCenterX = this.ball.x;
        const relativeIntersectX = platformCenterX - ballCenterX;
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
        if (this.bounceAngle > 0) {
          this.xDirection = LEFT;
        } else if (this.bounceAngle < 0) {
          this.xDirection = RIGHT;
        } else {
          this.xDirection = 0;
        }
      }
    }

    if (this.xDirection === LEFT && this.ball.x - this.ball.getRadius() <= 0) {
      this.xDirection = RIGHT;
    }

    if (this.xDirection === RIGHT && this.ball.x + this.ball.getRadius() >= this.app.screen.width) {
      this.xDirection = LEFT;
    }

    const bounceAngleInRadians = this.bounceAngle * (Math.PI / 180);
    const ballSpeedX = SPEED * Math.cos(bounceAngleInRadians) * this.xDirection;
    this.ball.x = this.ball.x + ballSpeedX * delta;
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
}
