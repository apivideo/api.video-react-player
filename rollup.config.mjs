import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import packageJson from "./package.json" assert { type: "json" };

export default {
  input: "src/index.tsx",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [typescript(), commonjs(), nodeResolve()],
  external: ["react", "@api.video/player-sdk"],
};
