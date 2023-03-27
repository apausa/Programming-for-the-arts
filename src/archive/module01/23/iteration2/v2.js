// Mode 2. Background is individual. 

let pattern = null;

function setup() {
  createCanvas(500, 500);
  noLoop();
  
  const grid = width / 8;
  const palette = ['#FFF', '#AAA', '#555', '#000'];

  pattern = new Pattern(grid, palette);
}

function draw() {
  noStroke(0);

  pattern.render();
}

class Pattern { 
  constructor(grid, palette) { 
    this.grid = grid;
    this.shapes =  this.returnShapes();
    this.radius = this.grid * 2;
    this.diameter = this.grid / 2;
    this.palette = palette;
  }
  
  triangle0(x, y) {
    triangle(x, y, x  + this.grid, y, x + this.grid, y + this.grid);
  }
  
  triangle1(x, y) {
    triangle(x, y, x, y + this.grid, x + this.grid, y);
  }
  
  returnColor(previousColor) {
    const currentColor = this.palette[round(random(0, this.palette.length - 1))];

    return (previousColor === currentColor)
      ? this.returnColor(previousColor)
      : currentColor;
  }

  render() {
   	for (let i = 0; i < this.grid; i++) {
      for (let j = 0; j < this.grid; j++) {
        const [x, y] = [i * this.grid, j * this.grid];
        const background = this.returnColor(null);
        const figure = this.returnColor(background);

        fill(`${background}`)
        square(x, y, this.grid);

        fill(`${figure}`);
        switch (this.shapes[i][j]) { 
          case 0: this.triangle0(x, y); break;
          case 1: this.triangle1(x, y); break;
          default: break;
  	}}}
  }

  returnShapes() {  
    let arr = [];

    for (let i = 0; i < this.grid; i++) {
      arr[i] = [];

      for (let j = 0; j < this.grid; j++) {
        arr[i][j] = round(random(0, 2));
    }}

    return arr;
  }
}