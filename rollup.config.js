import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/lib/index.js',
    output: {
      file: 'dist/index.js',
      format: 'esm',
    },
    plugins: [terser()],
  },
];
