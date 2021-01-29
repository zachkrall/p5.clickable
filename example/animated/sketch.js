const sketch = (p) => {
  let buttons = [];
  let messages = ["Apple", "Banana", "Orange", "Pear"];
  let message = "";

  const display_text = () => {
    p.push();
    p.textStyle(p.BOLD);
    p.textAlign(p.CENTER);
    p.textSize(20);
    p.fill("#ffffff");
    p.text(message, 0, 110, p.width);
    p.pop();
  };

  p.setup = () => {
    p.createCanvas(430, 200);
    for (let i = 0; i < 4; i++) {
      let c = p.createClickable(1123, 1123);

      /* default attributes */
      c.position(i * 100 + 20, 50)
        .size(90, 40)
        .text(`${messages[i]}`)
        .textStyle(p.BOLD)
        .borderWeight(0)
        .borderRadius(300);

      c.onOutside(({ self }) => {
        self.translate([0, 0, 0], { tween: true });
        self.fill("rgba(255,255,255,0.2)", { tween: true, duration: 0.1 });
        self.textColor("#ffffff", { tween: true, duration: 0.1 });
        // self.translate([0, 0, 0], { tween: true });
      });

      c.onHover(({ self }) => {
        self.translate([0, -10, 0], { tween: true });
        self.fill("rgba(255,255,255,0.9)", { tween: true, duration: 0.1 });
        self.textColor("#000000", { tween: true, duration: 0.1 });
      });

      c.onPress(({ self }) => {
        // self.translate([0, 2, 0], { tween: true });
      });

      c.onRelease(({ self, x, height }) => {
        self.translate([0, 0, 0], { tween: true });
        self.fill("#ffffff", { tween: true, duration: 0.1 });
        self.textColor("#000000");
        // self.translate([0, 0, 0], { tween: true });
      });

      c.onClick(({ self, x, height }) => {
        message = `You clicked ${messages[i]}!`;
      });
      buttons.push(c);
    }
  };

  p.draw = () => {
    p.clear();
    buttons.forEach(({ draw }) => draw());
    display_text();
  };
};

new p5(sketch);
