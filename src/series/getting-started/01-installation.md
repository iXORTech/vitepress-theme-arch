---
title: Installation
description: How to install and set up the VitePress Theme Arch
date: 2026-01-22
order: 1
localizedTitle:
  zh-CN: 安装
localizedDescription:
  zh-CN: 如何安装和设置 VitePress Theme Arch
---

<script setup>
import { watchEffect, ref } from 'vue'
import { useI18n } from '@/utils/i18n'

const { currentLang } = useI18n()
const showZh = ref(false)

watchEffect(() => {
  showZh.value = currentLang.value === 'zh-CN'
})
</script>

<div v-if="showZh">

# 安装

欢迎阅读入门指南专栏的第一篇文章！在本指南中，我们将带您完成安装过程。

## 前置条件

在开始之前，请确保您已安装以下软件：

- Node.js 25
- pnpm

## 快速开始

1. 克隆仓库：

```bash
git clone https://github.com/iXORTech/vitepress-theme-arch.git
cd vitepress-theme-arch
```

2. 安装依赖：

```bash
pnpm install
```

3. 启动开发服务器：

```bash
pnpm run dev
```

4. 打开浏览器访问 `http://localhost:5173`

## 下一步

现在您已经安装好了主题，请继续阅读下一篇文章以了解配置选项。

</div>

<div v-else>

# Installation

Welcome to the first post in the Getting Started series! In this guide, we'll walk you through the installation process.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js 25
- pnpm

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/iXORTech/vitepress-theme-arch.git
cd vitepress-theme-arch
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Next Steps

Now that you have the theme installed, continue to the next post to learn about configuration options.

</div>
