import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import {uglify} from 'rollup-plugin-uglify'
import typescript from 'rollup-plugin-typescript2'
const {version} = require('./package.json')

export default {
    input: 'src/main.ts',
    output: {
        file: `dist/session.v${version}.min.js`,
        format: 'umd',
        name: 'session'
    },
    plugins: [
        typescript(),
        buble(),
        resolve(),
        commonjs(),
        uglify()
    ]
}