// 先改这里，就能把网站变成自己的。所有姓名与介绍目前都是占位内容。
export const siteConfig = {
  title: '未命名手记',
  name: '某某',
  role: '后端开发者',
  description: '记录技术，也记录生活。一个后端开发者的个人手记。',
  intro: '写一点代码，记一点心得。在这里，整理技术实践，也收藏日常里的细小发现。',
  motto: '🐋浪花打湿了小船，碎进我的眼。', // 横幅签名，填写纯文字；字号和位置在 global.css 的 .intro-signature 中调整。
  github: '', // 例如 https://github.com/你的用户名；留空则不显示。
  email: '', // 留空则不显示。
  appearance: {
    banner: {
      image: 'images/background.jpg', // 图片放在 public 中，这里填写相对于 public 的路径。
      position: '50% 25%', // 裁剪位置：横向、纵向；展示屋檐到人物腰部。
      mobilePosition: '62% center', // 手机屏幕单独调整裁剪位置，保留人物。
      height: 330, // 桌面横幅高度，单位为像素。
      mobileHeight: 300, // 手机横幅高度，单位为像素。
      overlayOpacity: 0.12, // 图片上方遮罩的不透明度，范围为 0～1，越大越暗。
    },
    background: {
      image: 'images/background.jpg',
      position: 'center center', // 页面底图的位置；使用 cover 时也控制裁剪位置。
      size: '100% 100%', // 与参考页一样铺满视口；改为 cover 可等比例裁剪。
      opacity: 0.10, // 浅色底图的不透明度：0 隐藏，1 完全显示。
      darkOpacity: 0.08, // 深色主题的底图不透明度。
    },
  },
  navigation: [
    { label: '文章', path: '', key: 'blog' },
    { label: '随记', path: 'notes/', key: 'notes' },
    { label: '归档', path: 'archives/', key: 'archives' },
    { label: '关于', path: 'about/', key: 'about' },
  ],
};

// 统一处理子路径，未来放到 username.github.io/repo/ 也能正常导航。
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
