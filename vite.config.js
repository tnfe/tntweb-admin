
/* eslint-disable */
import * as path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import legacyPlugin from '@vitejs/plugin-legacy';

// https://cn.vitejs.dev/config/
export default ({command, mode}) => {
  let rollupOptions = {};
  

  let optimizeDeps = {};
  

  let alias = {
'assets': path.resolve(__dirname, 'src/assets'),
'components': path.resolve(__dirname, 'src/components'),
'configs': path.resolve(__dirname, 'src/configs'),
'layout': path.resolve(__dirname, 'src/layout'),
'locales': path.resolve(__dirname, 'src/locales'),
'models': path.resolve(__dirname, 'src/models'),
'pages': path.resolve(__dirname, 'src/pages'),
'services': path.resolve(__dirname, 'src/services'),
'styles': path.resolve(__dirname, 'src/styles'),
'types': path.resolve(__dirname, 'src/types'),
'utils': path.resolve(__dirname, 'src/utils'),
'react-native': 'react-native-web',
}

  let proxy = {
'/api/product/*': {"target":"http://localhost:7777/","changeOrigin":true},
'/api/stock/*': {"target":"http://localhost:7777/","changeOrigin":true},
'/api/*': {"target":"http://localhost:3001/"},

}

  let esbuild = {

}

  return {
    base: './', // index.html文件所在位置
    root: './', // js导入的资源路径，src
    resolve: {
      alias,
    },
    define: {
      'process.env.APP_IS_LOCAL': '"true"',
    },
    server: {
      // 代理
      proxy,
    },
    build: {
      target: 'es2015',
      minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
      manifest: false, // 是否产出maifest.json
      sourcemap: false, // 是否产出soucemap.json
      outDir: 'build', // 产出目录
      rollupOptions,
    },
    esbuild,
    optimizeDeps,
    plugins: [
      reactRefresh(),
legacyPlugin({
    targets: ['Android > 39', 'Chrome >= 60', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54',  'Edge >= 15'],
  }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
        }
      }
    },
  }
}