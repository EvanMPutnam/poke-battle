import p5, from "p5";
import { Arena } from "./view/arena";
import { Pokemon } from "./data/pokemon";
import { pokemonArenaConfig } from "./configuration/config";


const sketch = (p: p5) => {

  const fps = 15;
  const arena = new Arena<Pokemon>(pokemonArenaConfig);
  const xDim = pokemonArenaConfig.xDim;
  const yDim = pokemonArenaConfig.yDim;

  p.keyPressed = () => {
  };

  p.windowResized = () => {
  }

  p.setup = () => {
    p.frameRate(fps);
    p.createCanvas(xDim, yDim);
  };

  p.draw = () => {
    arena.tick();
    arena.draw(p);
    p.updatePixels();
  };
};

new p5(sketch);