import esbuild from "rollup-plugin-esbuild";

/** @type {import('rollup').RollupOptions} */
export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
    sourcemap: true,
    banner: "#!/usr/bin/env node",
  },
  plugins: [
    esbuild({
      minify: true,
    }),
  ],
  external: [
    "dotenv/config",
    "express",
    "cors",
    "helmet",
    "winston",
    "winston-daily-rotate-file",
  ],
};
