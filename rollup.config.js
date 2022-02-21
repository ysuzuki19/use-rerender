import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const entry = './index.ts';

const es_config = {
  input: entry,
  output: {
    file: 'dist/index.es.js',
    format: 'es',
  },
  external: ['react'],
  plugins: [
    typescript(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts'],
    }),
  ],
};

const dts_config = {
  input: entry,
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [dts()],
};

const umd_config = {
  input: entry,
  output: {
    file: 'dist/index.umd.min.js',
    format: 'umd',
    name: 'useReRender',
    exports: 'named',
    indent: false,
    globals: { react: 'react' },
  },
  external: ['react'],
  plugins: [
    typescript(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts'],
      exclude: 'node_modules/**',
    }),
    terser(),
  ],
};

export default [es_config, dts_config, umd_config];
