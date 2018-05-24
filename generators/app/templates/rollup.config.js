const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript');
const uglify = require('rollup-plugin-uglify');

const GlobalName = 'GlobalName';
const bundleName = '<%= bundleName %>';

module.exports = {
  input: 'src/index.ts',
  output: {
    file: `dist/${bundleName}.js`,
    format: 'iife',
    name: 'GlobalName',
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    nodeResolve({
      // jsnext: true,
      // main: true,
    }),
    commonjs({
      // include: 'node_modules/**',
    }),
    uglify(),
  ],
};
