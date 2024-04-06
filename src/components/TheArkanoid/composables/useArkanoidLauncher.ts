import { Application, Text } from "pixi.js";

export const useArkanoidLauncher = () => {
  const init = async (root: HTMLElement) => {
    const app = new Application();
    await app.init({ resizeTo: root });
    const text = new Text({
      text: "Hello Pixi!",
      style: {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xff1010,
        align: "center"
      }
    });
    app.stage.addChild(text);
    root.appendChild(app.canvas);
  };

  return { init };
};
