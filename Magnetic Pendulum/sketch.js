let myShader;

function preload() {
  myShader = loadShader('shader.vert', 'trajectory.frag');
}

function setup() {
  let cnv = createCanvas(600, 600, WEBGL);
  noStroke();
  shader(myShader);
  myShader.setUniform("resolution", [width, height]);
}

function draw() {
  background(0);
  rect(-width/2, -height/2, width, height);

  saveCanvas('trajectory.png');

  noLoop();
}