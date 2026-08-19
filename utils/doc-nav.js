// ============================================================================
// Shared sidebar navigation data for the design-system docs.
//
// Imported by pd-doc-shell (sidebar rendering) and any page that needs to
// resolve a path's parent section for breadcrumbs.
// ============================================================================

export const DOC_NAV = [
  {
    label: '入门',
    items: [
      { name: '欢迎', path: 'index' }
    ]
  },
  {
    label: '基础',
    items: [
      { name: '颜色', path: 'colors' },
      { name: '字体排印', path: 'typography' },
      { name: '间距', path: 'spacing' },
      { name: '层级阴影', path: 'elevation' },
      { name: '动效', path: 'motion' },
      { name: '图标', path: 'icons' }
    ]
  },
  {
    label: '组件',
    items: [
      { name: '按钮', path: 'button' },
      { name: '输入框', path: 'input' },
      { name: '卡片', path: 'card' },
      { name: '拼团卡片', path: 'group-card', flag: 'new' },
      { name: '列表项', path: 'list' },
      { name: '徽章', path: 'badge' },
      { name: '弹出层', path: 'popup' },
      { name: '反馈提示', path: 'feedback' },
      { name: '导航栏', path: 'navbar-page' },
      { name: '标签页', path: 'tabs' },
      { name: '骨架屏', path: 'skeleton' },
      { name: '步骤条', path: 'steps' },
      { name: '上传', path: 'upload' },
      { name: '档位滑块', path: 'dot-slider', flag: 'new' },
      { name: '进度条', path: 'progress', flag: 'new' },
      { name: '评分', path: 'rate', flag: 'new' },
      { name: '头像', path: 'avatar', flag: 'new' },
      { name: '评价卡', path: 'review-card', flag: 'new' }
    ]
  },
  {
    label: '模式',
    items: [
      { name: '页面布局', path: 'page-layout' },
      { name: '表单模式', path: 'forms' },
      { name: '交互状态', path: 'states' }
    ]
  }
]

// 根据路径 slug（如 "colors"）返回 { section, name } 用于面包屑导航。
// 找不到时回退到首页 { section: '入门', name: '欢迎' }。
export function resolveNav(path) {
  for (const section of DOC_NAV) {
    const hit = section.items.find((i) => i.path === path)
    if (hit) return { section: section.label, name: hit.name, flag: hit.flag || null }
  }
  return { section: '入门', name: '欢迎', flag: null }
}
