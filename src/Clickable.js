import { TweenLite } from "gsap";

class Clickable {
  constructor({ p5instance, x, y }) {
    this.p = p5instance;
    this.x = x || 0;
    this.y = y || 0;
    this.w = 40;
    this.h = 40;

    /* TRANSFORM */
    this._scale = 1.0;
    this._translate = {
      x: 0,
      y: 0,
      z: 0,
    };

    /* BOX */
    this._fill = "#C4C4C4";
    this._borderWeight = 2;
    this._borderColor = "#000000";
    this._borderRadius = 10;

    /* TEXT */
    this._label = null;
    this._textAlignH = this.p.CENTER;
    this._textAlignV = this.p.CENTER;
    this._textColor = "black";
    this._textStroke = null;
    this._textStyle = this.p.NORMAL;

    /* IMAGE */

    this.disabled = false;
    this.state = "outside";
    this.stateChanged = true;

    /* DEFAULT EVENTS */
    this._onOutside = ({ self }) => {
      self.fill("#C4C4C4");
    };
    this._onHover = ({ self }) => {
      self.fill("#AAAAAA");
    };
    this._onPress = ({ self }) => {
      self.fill("#C4C4C4");
    };
    this._onRelease = ({ self }) => {
      self.fill("#C4C4C4");
    };
    this._onStateChange = () => {};
    this._onClick = () => {};

    this.draw = this.draw.bind(this);
    this.getContext = this.getContext.bind(this);
    this.updateState = this.updateState.bind(this);
    this.executeClick = this.executeClick.bind(this);
    this.resize = this.resize.bind(this);
  }

  getContext() {
    /* passed to ^on.* functions */
    return {
      self: this,
      x: this.x,
      y: this.y,
      width: this.w,
      height: this.h,
      fill: this._fill,
      label: this._label,
      scale: this._scale,
    };
  }

  attr(attribute, value, t = { tween: false, duration: 0.3, type: null }) {
    if (t.tween && this.stateChanged) {
      if (typeof value === "object") {
        TweenLite.to(this[attribute], t.duration || 0.3, value);
      } else {
        let v = {};
        v[attribute] = value;
        TweenLite.to(this, t.duration || 0.3, v);
      }
    } else if (this.stateChanged) {
      this[attribute] = value;
    }
    return this;
  }

  resize(width, height, transition) {
    this.attr("h", height, transition);
    return this.attr("w", width, transition);
  }
  size(width, height, transition) {
    /* alias for resize */
    return this.resize(width, height, transition);
  }

  updateState(s) {
    this.state = s;
    this.stateChanged = true;
    this._onStateChange(s);
  }

  onStateChange(fn) {
    this._onStateChange = () => fn();
    return this;
  }

  position(x, y, transition) {
    this.attr("x", x, transition);
    return this.attr("y", y, transition);
  }
  locate(x, y, transition) {
    return this.position(x, y, transition);
  }
  scale(val) {
    return this.attr("_scale", val);
  }
  translate([x, y, z], transition) {
    return this.attr(
      "_translate",
      {
        x,
        y,
        z,
      },
      transition
    );
  }

  /* BACKGROUND ATTRIBUTES */
  fill(val, transition) {
    return this.attr("_fill", val, { type: "color", ...transition });
  }
  borderWeight(val) {
    return this.attr("_borderWeight", val);
  }
  borderRadius(val) {
    return this.attr("_borderRadius", val);
  }
  cornerRadius(val) {
    /* alias for borderRadius */
    return this.attr("_borderRadius", val);
  }
  borderColor(val) {
    return this.attr("_borderColor", val);
  }

  /* TEXT ATTRIBUTES */
  label(val) {
    return this.attr("_label", val);
  }
  text(val) {
    return this.attr("_label", val);
  }
  textColor(val) {
    return this.attr("_textColor", val);
  }
  textStroke(val) {
    return this.attr("_textStroke", val);
  }
  textAlign([vertical = this._textAlignV, horizontal = this._textAlignH]) {
    this.attr("_textAlignH", horizontal);
    return this.attr("_textAlignV", vertical);
  }
  textStyle(val) {
    return this.attr("_textStyle", val);
  }

  /* CLICKABLE EVENTS */
  onOutside(fn) {
    this._onOutside = fn;
    return this;
  }
  onHover(fn) {
    if (typeof fn === "function") {
      this._onHover = fn;
    } else {
      throw new Error(
        `onHover only accepts a function. You provided a ${typeof fn}`
      );
    }
    return this;
  }

  onPress(fn) {
    this._onPress = fn;
    return this;
  }

  onRelease(fn) {
    this._onRelease = fn;
    return this;
  }

  onClick(fn) {
    this.stateChanged = true;
    this._onClick = fn;
    return this;
  }

  executeClick() {
    this.updateState("clicked");
    this._onClick(this.getContext());
  }

  draw() {
    this.p.push();

    this.p.translate(this._translate.x, this._translate.y, this._translate.z);
    this.p.scale(this._scale);

    ({
      pressed: this._onPress,
      hover: this._onHover,
      released: this._onRelease,
      outside: this._onOutside,
    }[this.state](this.getContext()));

    /* BACKGROUND */
    this.p.push();
    if (this._borderWeight > 0) {
      this.p.stroke(this._borderColor);
      this.p.strokeWeight(this._borderWeight);
    } else {
      this.p.noStroke();
    }
    this.p.fill(this._fill);
    this.p.rect(this.x, this.y, this.w, this.h, this._borderRadius);
    this.p.pop();

    /* TEXT VALUES */
    this.p.push();
    {
      this.textColor ? this.p.fill(this._textColor) : this.p.noFill();
    }
    {
      this._textStroke ? this.p.stroke(this._textStroke) : this.p.noStroke();
    }
    this.p.textAlign(this._textAlignV, this._textAlignH);
    this.p.textStyle(this._textStyle);
    this.p.text(this._label, this.x, this.y, this.w, this.h);
    this.p.pop();

    this.p.pop();
  }
}

/**
 *  createClickable
 *
 *  function that is later added as p5 function
 */
export const createClickable = function (x, y) {
  let c = new Clickable({
    p5instance: this,
    x,
    y,
  });
  /* add reference to __clickable__ array */
  this.__clickable__.clickables.push(c);
  return c;
};

/**
 *  cl_pre
 *
 *  runs before each draw loop
 */
export const cl_pre = function () {
  const { __clickable__: cl, mouseX, mouseY, mouseIsPressed } = this;
  const { clickables, previousCursor } = cl;

  clickables.forEach(({ updateState, executeClick, x, y, w, h, state }) => {
    let mouseIsOver =
      mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
    /* conditions for when mouse state is outside */
    if (!mouseIsOver && state !== "outside") {
      return updateState("outside");
    }
    /* conditions for when mouse state is hovered */
    if (mouseIsOver && !mouseIsPressed && state === "outside") {
      return updateState("hover");
    }
    /* conditions for when mouse state is pressed */
    if (mouseIsOver && mouseIsPressed && state === "hover") {
      return updateState("pressed");
    }
    /* conditions for when mouse state is released */
    if (mouseIsOver && !mouseIsPressed && state === "pressed") {
      executeClick();
      updateState("released");
    }
  });

  const cursorIsPointer = clickables.some(({ state }) => {
    return ["hover", "pressed"].includes(state);
  });

  p5.prototype.__clickable__.activeCursor = cursorIsPointer
    ? "pointer"
    : "default";

  if (previousCursor !== p5.prototype.__clickable__.activeCursor) {
    /* only update cursor CSS when needed */
    window.document.body.style.cursor = p5.prototype.__clickable__.activeCursor;
  }
};

/**
 *  cl_post
 *
 *  runs after each draw loop
 */
export const cl_post = function () {
  const { __clickable__: cl } = this;
  const { clickables } = cl;

  clickables.forEach((e) => {
    e.stateChanged = false;
  });
};
