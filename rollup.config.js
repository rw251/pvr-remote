import copy from 'rollup-plugin-copy'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist' },
        { src: 'src/socket.io.js', dest: 'dist' },
      ]
    }),
  ],
};