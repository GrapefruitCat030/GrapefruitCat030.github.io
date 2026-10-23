#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const usage = '用法：node scripts/new-post.mjs my-slug "文章标题"';

try {
  const [slug, providedTitle, ...extraArguments] = process.argv.slice(2);

  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`slug 只能包含小写英文字母、数字和用于连接单词的单个连字符。\n${usage}`);
  }

  if (extraArguments.length > 0) {
    throw new Error(`参数过多，请用引号包住标题。\n${usage}`);
  }

  const title = providedTitle ?? slug;
  if (!title.trim()) {
    throw new Error('文章标题不能为空。');
  }

  const dateParts = new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const datePart = (type) => dateParts.find((part) => part.type === type).value;
  const date = `${datePart('year')}-${datePart('month')}-${datePart('day')}`;
  const directory = path.join(process.cwd(), 'src', 'content', 'blog');
  const filePath = path.join(directory, `${slug}.md`);
  const content = `---
title: ${JSON.stringify(title)}
description: "在这里写下一句文章摘要。"
date: ${JSON.stringify(date)}
tags: ["随笔"]
draft: true
---

## 从这里开始

写下你想分享的内容。
`;

  await mkdir(directory, { recursive: true });
  await writeFile(filePath, content, { flag: 'wx' });
  process.stdout.write(`已创建：${filePath}\n将 frontmatter 中的 draft 改为 false，文章才会显示在网站上。\n`);
} catch (error) {
  const message = error.code === 'EEXIST'
    ? '同名文章已经存在，未覆盖原文件。请换一个 slug。'
    : error.message;
  process.stderr.write(`创建失败：${message}\n`);
  process.exitCode = 1;
}
