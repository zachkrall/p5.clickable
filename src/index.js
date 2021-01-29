// rollup will remove p5 from bundle
import p5 from "p5";
import { createClickable, cl_post, cl_pre } from "./Clickable.js";

/* attach createClickable to p5 */
p5.prototype.__clickable__ = {
  state: "default",
  clickables: [],
};
p5.prototype.createClickable = createClickable;
p5.prototype.registerMethod("pre", cl_pre);
p5.prototype.registerMethod("post", cl_post);

export {};
