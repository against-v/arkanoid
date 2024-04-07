import type { Application } from "pixi.js";
import { Brick } from "@/components/TheArkanoid/Arkanoid/Brick";
import { getRandomElement } from "@/utils/getRandomElement";

const ROWS = 5;
const BRICKS_TOTAL = 40;
const BRICKS_IN_ROW = 8;

const BRICKS = [
  {
    color: 0x0400ff,
    points: 1
  },
  {
    color: 0xe60505,
    points: 2
  },
  {
    color: 0x27a832,
    points: 3
  }
];
export class BricksCollection {
  app: Application;
  bricksCollection: Brick[];
  onBeforeDestroyBrick: (points: number) => void;
  constructor(app: Application, onBeforeDestroyBrick: (points: number) => void) {
    this.app = app;
    this.onBeforeDestroyBrick = onBeforeDestroyBrick;
    this.bricksCollection = [];
    this.buildCollection();
  }

  public buildCollection() {
    const width = this.app.screen.width / BRICKS_IN_ROW;
    const height = (this.app.screen.height * 0.4) / ROWS;
    for (let i = 0; i < BRICKS_TOTAL; i++) {
      const position = {
        x: (i % BRICKS_IN_ROW) * width,
        y: Math.floor(i / BRICKS_IN_ROW) * height
      };
      const { color, points } = getRandomElement(BRICKS);
      const res = new Brick(position, width, height, color, points);
      this.bricksCollection.push(res);
    }
  }

  public getBricksCollection() {
    return this.bricksCollection;
  }

  public destroyBrick(index: number) {
    this.onBeforeDestroyBrick(this.bricksCollection[index].points);
    this.bricksCollection[index].destroy();
    this.bricksCollection.splice(index, 1);
  }
}
