import { defineConfig } from 'astro/config';

// 这是 username.github.io 个人主页，网站在域名根路径，无需仓库名前缀。
// site 用于 canonical / RSS 的正式地址；本地服务仍只监听本机。
export default defineConfig({
  site: process.env.PUBLIC_SITE || 'https://grapefruitcat030.github.io',
  base: process.env.PUBLIC_BASE || '/',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: { shikiConfig: { theme: 'github-light' } },
});
