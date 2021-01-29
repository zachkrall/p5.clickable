import p5 from "p5";
import "../../dist/p5.clickable.esm.js";

describe("Button Props", () => {
  let c = p5.prototype.createClickable();

  /* set clickable attributes */
  c.label("Hello, World")
    .size(300, 400)
    .fill("#00ff00")
    .onHover(({ self }) => {
      self.label("I'm Hovered");
    });

  it("has correct label", () => {
    expect(c._label).toMatch("Hello, World");
  });

  it("has correct width", () => {
    expect(c.w).toBe(300);
  });

  it("has correct fill color", () => {
    expect(c._fill).toBe("#00ff00");
  });
});
