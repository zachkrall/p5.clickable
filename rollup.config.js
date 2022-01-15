import pkg from './package.json'
import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default [
    {
        input: './lib/index.js',
        plugins: [
            commonjs(),
            nodeResolve(),
            babel({ babelHelpers: 'bundled' }),
            terser(),
        ],
        external: ['p5'],
        output: [
            {
                file: `dist/${pkg.name}.js`,
                format: 'umd',
                globals: {
                    p5: 'p5',
                },
                name: 'Clickable',
            },
            {
                file: `dist/${pkg.name}.esm.js`,
                format: 'esm',
                globals: {
                    p5: 'p5',
                },
                name: 'Clickable',
            },
        ],
    },
]
