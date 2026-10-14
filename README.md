# console-fe

基于 React 19、TypeScript、Vite、Ant Design 6 和 ahooks 的控制台前端项目。

## 环境要求

- Node.js >= 20.19
- pnpm >= 10

## 本地开发

```bash
pnpm install
pnpm dev
```

## 可用命令

```bash
pnpm dev       # 启动开发服务器
pnpm build     # 类型检查并构建生产产物
pnpm lint      # 检查代码
pnpm preview   # 预览生产构建
```

## 技术栈

- React 19
- TypeScript
- Vite
- Ant Design 6
- ahooks
- React Router 7
- Oxlint

## 目录结构

```text
src/
├── app/                         # 导航配置与路由
├── components/WorkspacePage/    # 平台通用内容页
├── layouts/ConsoleLayout/       # 顶部平台与条件侧栏布局
├── modules/
│   ├── applications/pages/      # 应用平台
│   ├── overview/pages/          # 总览平台
│   ├── resources/pages/         # 资源平台
│   └── settings/pages/          # 系统设置
├── pages/                       # 全局页面
├── App.tsx
└── main.tsx
```

平台和菜单统一配置在 `src/app/navigation.tsx`。路由定义位于
`src/app/router.tsx`，平台没有配置菜单时不会渲染左侧栏。
