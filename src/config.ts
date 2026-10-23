// 先改这里，就能把网站变成自己的。所有姓名与介绍目前都是占位内容。
export const siteConfig = {
  title: '未命名手记',
  name: '某某',
  role: '后端开发者',
  description: '记录技术，也记录生活。一个后端开发者的个人手记。',
  intro: '写一点代码，记一点心得。在这里，整理技术实践，也收藏日常里的细小发现。',
  motto: '保持好奇，慢慢生长。',
  github: '', // 例如 https://github.com/你的用户名；留空则不显示。
  email: '', // 留空则不显示。
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
