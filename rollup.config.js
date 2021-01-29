import fs from "fs";
import path from "path";
import pkg from "./package.json";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const legacy_path = path.resolve(__dirname, "src", "Clickable.legacy.js");
const legacy_pkg = fs.readFileSync(legacy_path);

export default [
  {
    external: ["p5"],
    input: "src/index.js",
    output: {
      file: `dist/${pkg.name}.js`,
      format: "umd",
      globals: {
        p5: "p5",
      },
      name: "Clickable",
      footer: String(legacy_pkg),
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      babel({ babelHelpers: "bundled" }),
      terser(),
    ],
  },
  {
    external: ["p5"],
    input: "src/index.js",
    output: {
      file: `dist/${pkg.name}.esm.js`,
      format: "esm",
      globals: {
        p5: "p5",
      },
      name: "Clickable",
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      babel({ babelHelpers: "bundled" }),
      terser(),
    ],
  },
];
