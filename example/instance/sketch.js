const sketch = (p) => {
  let image1;
  let button1;
  let button2;

  p.preload = () => {
    image1 = p.loadImage("./logo.png");
  };

  p.setup = () => {
    p.createCanvas(500, 500);
    button1 = p.createClickable();
    button2 = p.createClickable();

    button1
      .position(50, 50)
      .onHover(() => {
        button1.fill("blue");
      })
      .onPress(() => {
        button1.fill("red");
      })
      .onRelease(() => {
        // alert("Clicked!");
        button1.fill("green");
      })
      .onOutside(() => {
        button1.fill("yellow");
      })
      .onClick(({ x, y }) => {
        button1.position(x + 4, y + 2);
      });

    button2
      .position(50, 200)
      .onHover(() => {
        button2.fill("blue");
      })
      .onPress(() => {
        button2.fill("red");
      })
      .onRelease(() => {
        // alert("Clicked!");
        button2.fill("green");
      })
      .onClick(({ x, y }) => {
        button2.position(x + 4, y + 2);
      });
  };

  p.draw = () => {
    p.background("#c4c4c4");
    p.text(button1.state, 10, 10);
    p.text(button1.x, 10, 20);
    button1.draw();
    button2.draw();
  };
};

new p5(sketch);

// let c
// function setup() {
//   createCanvas(400,400)
//   c = createClickable()
//   console.log(c)
// }
// function draw(){
//   background(50)
//   c.draw()
// }
