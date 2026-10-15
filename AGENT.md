# Console Frontend AI 工作说明

本文供在本仓库工作的 AI 使用。修改前先阅读本文、`README.md` 和相关实现。
若说明与代码不一致，以当前代码为准，并同步修正文档。

## 1. 项目定位

本项目是平台控制台前端，基于 React 19、TypeScript、Vite 8、Ant Design 6、
ahooks 和 React Router 7。

当前版本是控制台信息架构和视觉原型，已经有响应式外壳、平台导航、菜单和多个
占位页面，但没有连接后端。页面中的服务、用户、部署、资源、可用率、告警以及
“生产环境”等内容全是静态演示数据，不代表真实服务器状态。

当前尚未实现：

- SSO 登录、会话恢复、刷新和登出。
- Gateway 或 Deployment API 客户端。
- 后端数据模型、加载/错误/权限状态。
- 真实通知、创建应用或刷新逻辑。
- 自动化测试、环境变量、Dockerfile、CI 和生产发布配置。

不要把演示数据继续扩散成伪业务逻辑，也不要在文档或界面中声称这些数据来自
生产。

## 2. 路由与结构

当前路由：

- `/overview`
- `/applications/list`
- `/applications/deployments`
- `/resources/compute`
- `/resources/storage`
- `/settings/users`
- `/settings/permissions`
- 其他路径：404

关键文件：

- `src/app/router.tsx`：路由和页面懒加载。
- `src/app/navigation.tsx`：平台与菜单的唯一导航配置。
- `src/layouts/ConsoleLayout/`：顶部导航、桌面侧栏和移动 Drawer。
- `src/components/WorkspacePage/`：多个占位列表页共用的展示组件。
- `src/modules/overview/`：总览页面。
- `src/modules/*/pages/`：应用、资源和设置页面。
- `src/index.css`：全局基础样式。

新增平台或菜单时同时修改导航和路由，确保路径、选中状态、默认跳转和移动端菜单
一致。领域代码应留在对应 `src/modules/<domain>` 中；跨模块通用 UI 放
`src/components`，全局路由和导航放 `src/app`。

## 3. 本地工作

```bash
pnpm install
pnpm dev
```

常用验证：

```bash
pnpm build
pnpm exec oxlint <本次修改的文件...>
pnpm preview
```

只对本次修改或新增的代码文件执行 Oxlint，不运行全项目 lint 或 format。不要删除
现有 `console.log`。纯 Markdown 变更无需代码 lint。

当前没有测试脚本。涉及路由、交互或响应式布局时必须手工验证：

- 直接访问和刷新每个路由。
- 桌面顶部导航、侧栏与移动 Drawer。
- 窄屏文本、表格横向滚动、按钮和标题不重叠。
- 加载、空数据、错误、无权限和超长文本状态。
- 键盘操作、焦点、按钮名称和基础可访问性。

## 4. 前端约定

- 沿用 Ant Design 组件和 `@ant-design/icons`，不要再引入一套 UI 或图标库。
- 异步请求沿用 ahooks `useRequest`，但把请求函数和类型集中到独立 API 层。
- 导航配置是页面入口的单一来源，避免在 Layout 内硬编码第二份菜单。
- 复用组件只承载真实共性，不要让 `WorkspacePage` 演变成接收所有页面差异的巨型
  配置组件。
- 保持当前工作型控制台风格：信息密度适中、结构稳定、移动端可操作。
- 图标按钮要有 Tooltip 和 `aria-label`；表格、表单和危险操作要有明确状态。
- 不通过隐藏菜单或按钮实现权限控制，后端必须独立授权。

接入真实数据时，先删除对应静态数据和模拟延时，再实现类型明确的 API 请求。
不要让演示数据在请求失败时伪装成真实回退数据。

## 5. 计划中的认证和 API 边界

跨仓库架构约束：

- `../sso` 签发 access、ID 和 refresh token。
- `../sso-fe` 已实现首方 `web` 客户端的登录参考流程，但本控制台目前尚未接入。
- `../gateway` 验证 access token、执行最低角色检查并代理业务请求。
- `../deployment` 未来提供部署平台 API，目前仍是工程骨架。

未来控制台调用 Deployment 时，应使用：

```text
/api/gateway/deployment/**
```

并携带 `Authorization: Bearer <access token>`。不要从浏览器直连
`deployment:4100`、宿主机 4100 或独立数据库，也不要自行发送 `X-User-*`
身份头。Gateway 的计划策略要求 Deployment 管理 API 至少为 `super`，但最终
页面权限仍需根据真实后端契约设计。

认证接入前必须先决定控制台与 `sso-fe` 是共享同一前端 origin/client，还是注册
独立 OIDC client。不要直接复制 localStorage key、redirect URI 或 client ID 后
就假定跨域会话可用。相关决定需要同步修改 SSO 客户端白名单和部署配置。

## 6. 环境与安全

当前项目没有运行时环境配置。新增 Vite 变量时：

- 统一使用 `VITE_*`，在一个配置模块中读取和校验。
- 记录本地、测试和生产的含义。
- 明确 Vite 变量会进入浏览器产物，绝不能保存 client secret、数据库凭据、
  Cookie key、私钥、Registry/SSH 凭据或 Webhook secret。

令牌不得出现在日志、URL、页面 DOM、错误上报或截图中。渲染用户输入、部署日志
和 Markdown/HTML 时必须先设计转义或净化策略。

## 7. 生产现状与目标链路

截至 2026-10-15，已核验的服务器只部署了 `sso-fe` 静态站点、SSO 和 Gateway。
本 `console-fe` 没有部署目录、域名、Nginx 站点或自动发布流程，不能假设
`sso.xpeach.top` 已承载控制台。

相关现有链路：

```text
前端服务器 101.200.164.181
  -> Nginx
  -> /api/** 原样代理到 https://api.xpeach.top

后端服务器 82.157.201.240
  -> /api/sso/** 到 SSO
  -> /api/gateway/** 到 Gateway
```

控制台上线前需要明确：

- 独立域名或路径、静态目录和 SPA fallback。
- OIDC issuer、client、redirect URI、CORS 和登出回跳。
- `/api/` 是否沿用现有前端到后端代理。
- 构建时环境、缓存策略、发布原子性和回滚方式。
- 安全响应头、TLS、访问日志和监控。

服务器和跨项目检查基线见 `../生产部署前检查清单.md`。

## 8. 修改规则

1. 开始前运行 `git status --short`，保留所有非本任务改动。
2. 先确认需求属于原型完善、真实 API 接入还是认证接入，不混在一次隐式改动中。
3. 新接口先定义请求/响应类型、错误映射和权限，再接页面。
4. 不硬编码生产 IP、token、账号或秘密；API 使用同源路径或受控配置。
5. 不删除真实异常以展示假成功，不用静态数据掩盖接口故障。
6. 不擅自修改其他仓库、服务器 Nginx 或生产配置。
7. 不运行破坏性 Git 命令，不覆盖用户未提交的修改。

## 9. 完成标准

- 修改过的代码文件逐一通过 Oxlint。
- `pnpm build` 通过。
- 路由、导航、桌面和移动布局手工验证通过。
- API 页面覆盖加载、成功、空数据、错误、超时和无权限状态。
- 认证/权限变更与 SSO、Gateway 契约一致，后端仍有独立权限校验。
- 不再展示会被误认为真实状态的静态业务数据。
- 生产配置和构建产物不包含秘密。
