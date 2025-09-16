import { defineConfig, type DefaultTheme } from 'vitepress'

const nav: DefaultTheme.NavItem[] = [
    { text: "主页", link: "/" },
];

const sidebar: DefaultTheme.Sidebar = {
}

export const zh = defineConfig({
    lang: 'zh-CN',
    themeConfig: {
        nav: nav,
        sidebar: sidebar,
        returnToTopLabel: "回到顶部",
        skipToContentLabel: "跳过",
        lastUpdated: {
            text: "最后更新于",
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium',
                hourCycle: "h24"
            }
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        darkModeSwitchLabel: "主题",
        lightModeSwitchTitle: "切换到浅色模式",
        darkModeSwitchTitle: "切换到深色模式",
        outline: { label: "页面导航" },
        langMenuLabel: "多语言",
        sidebarMenuLabel: "菜单",
    },
})

