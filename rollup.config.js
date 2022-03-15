import typescript from 'rollup-plugin-typescript2'

export default {
    input: 'src/index.tsx',
    output: [{
        file: 'dist/index.js',
        format: 'cjs', // compile to a CommonJS module ('cjs')
        exports: 'named',
        sourcemap: true,
        strict: false
    }],
    plugins: [typescript()],
    external: ['react']
}