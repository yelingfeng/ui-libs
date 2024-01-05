import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 设置neme属性
export default {
  plugins: [vueJsx(), vueSetupExtend()],
  server: {
    host: '0.0.0.0',
    port: 2222,
    open: true,
    https: false,
  },
  vite: {
    ssr: {
      noExternal: ['echarts', 'zrender', 'resize-detector'],
    },
  },
}
