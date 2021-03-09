import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"

export default [
  {
    input: "src/js/index.js",
    output: {
      file: "site/_includes/index.js",
      format: "esm",
    },
    plugins: [
      resolve(),
      commonjs(),
      ...(process.env.NODE_ENV === "production" ? [terser()] : []),
    ],
  },
]
