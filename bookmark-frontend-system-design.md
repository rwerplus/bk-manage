# 书签管理前端页面系统设计 (React + shadcn/ui + lucide-react)

## 1. 目标与边界
- **目标**：实现一个前端书签管理工作台页面，布局三栏，上方有搜索与添加，左侧为文件夹/标签导航，中间为书签列表，右侧为最近与详情。
- **非目标**：不包含后端逻辑与数据存储，仅实现前端 UI 层。

## 2. 页面与路由
- `/`：首页（展示书签列表）
- `/b/:id`：高亮某书签并在右栏显示详情
- 查询参数：
  - `q`: 搜索关键词与语法（如 `tag:ai folder:tools`）
  - `folder`: 文件夹 id
  - `tags`: 标签 id 列表
  - `sort`: `lastVisited|createdAt|title|visits`
  - `view`: `list|card`

## 3. 布局与区域
- **最大宽度**：1280px，居中
- **Topbar**：Logo、全局搜索、添加书签按钮、个人菜单
- **LeftNav**：文件夹树、标签、智能分组
- **CenterList**：书签主列表（带排序/筛选/多选）
- **RightPanel**：最近打开、选中书签详情、相似项提示
- **响应式**：≤1024 隐藏右栏抽屉；≤768 左栏抽屉

## 4. 组件体系
- **布局层**：`AppShell`, `Topbar`, `LeftNav`, `CenterList`, `RightPanel`
- **业务组件**：
  - `FolderTree`, `TagChips`, `BookmarkItem`, `BookmarkCard`, `BookmarkDetail`
  - `AddBookmarkDialog`, `EditBookmarkDialog`, `MoveDialog`
  - `ImportDialog`, `ExportDialog`, `DeduplicateDialog`
- **通用组件**：`ConfirmDialog`, `EmptyState`, `HotkeysHint`

## 5. 状态管理
- 使用 React Router query 作为筛选/排序真相
- `selectedId`: 当前选中书签
- `selectedIds`: 批量模式选择集合
- `rightOpen`: 右栏 Drawer 开关
- 各对话框 `open` 状态

## 6. 交互细节
- **Topbar**：快速添加（Dialog 表单）、搜索（支持语法）、个人菜单（主题/导入导出）
- **LeftNav**：点击筛选、右键菜单（新建/重命名/删除）
- **CenterList**：列表 hover 出星标与更多；多选进入批量模式；支持排序切换
- **RightPanel**：展示详情、最近访问、相似书签；提供编辑、复制、删除、移动等操作

## 7. 视觉与主题
- 使用 shadcn/ui 设计令牌：`bg-background`, `text-foreground`, `primary`, `muted`
- **配色**：主色 `#4C8BF5`，浅背景 `#F8FAFC`，深背景 `#0F172A`
- **风格**：圆角 12–16px，轻投影，1px 分隔线
- **动效**：100–160ms 微动画

## 8. 响应式与可访问性
- ≤1024：右栏 Drawer；≤768：左栏 Drawer
- Focus 样式清晰，aria-label 完整，颜色对比符合 WCAG

## 9. 文件结构
```
src/
  components/
    layout/ (AppShell, Topbar, LeftNav, RightPanel)
    bookmark/ (BookmarkItem, BookmarkDetail)
    dialogs/ (AddBookmarkDialog, ImportDialog...)
    common/ (EmptyState, ConfirmDialog)
  pages/
    Home.tsx
    BookmarkPage.tsx
  hooks/
    useQueryState.ts
    useHotkeys.ts
  router/
    index.tsx
```

## 10. 开发里程碑
1. **M1**：搭建布局骨架 (Topbar + 三栏 + Drawer)
2. **M2**：实现列表与详情 UI
3. **M3**：左栏导航与标签
4. **M4**：搜索、排序、筛选
5. **M5**：各类对话框（添加/编辑/导入导出/去重）
6. **M6**：快捷键、骨架态、主题美化
