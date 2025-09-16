import type { Theme } from 'vitepress'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Plugin } from 'vue'
import { useLive2d } from "vitepress-theme-website" // 看板娘
import codeblocksFold from 'vitepress-plugin-codeblocks-fold' // 代码块折叠
import { inBrowser } from 'vitepress'

import {
    NolebaseEnhancedReadabilitiesMenu,
    NolebaseEnhancedReadabilitiesPlugin,
    NolebaseEnhancedReadabilitiesScreenMenu
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import { NolebaseInlineLinkPreviewPlugin } from '@nolebase/vitepress-plugin-inline-link-preview/client'
import { NolebasePagePropertiesPlugin } from '@nolebase/vitepress-plugin-page-properties/client'

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'
import '@nolebase/vitepress-plugin-inline-link-preview/client/style.css'
import '@nolebase/vitepress-plugin-page-properties/client/style.css'
import "vitepress-markdown-timeline/dist/theme/index.css"
import 'vitepress-plugin-codeblocks-fold/style/index.css'
import 'virtual:group-icons.css'
import './style/index.css'

const modifyLive2d = (to: string) => {
    if (!inBrowser) return;
    const e = document.getElementById("live2d")
    if (!e) return;
    e.style.display = to == '/' ? 'none' : ''
}

export default {
    extends: DefaultTheme,
    Layout: () => h(DefaultTheme.Layout, null, {
        'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
        'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
        'layout-top': () => h(NolebaseHighlightTargetedHeading)
    }),
    setup: () => {
        const route = useRoute()
        const { frontmatter } = useData()
        codeblocksFold({ route, frontmatter }, true, 200)
        useLive2d({
            enable: true,
            mobile: { show: true },
            model: {
                // url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/potion-Maker-Pio/index.json'
                url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/girls-frontline/HK416-2/normal/model.json'
            }
        })
        modifyLive2d(route.path)
    },
    enhanceApp: ({ app, router }) => {
        router.onAfterPageLoad = modifyLive2d;
        app.use(NolebaseEnhancedReadabilitiesPlugin as Plugin, {
            spotlight: {
                disabled: false,
                disableHelp: true,
                defaultToggle: true
            }
        })
        app.use(NolebaseGitChangelogPlugin, {
            hideChangelogNoChangesText: true,
            commitsRelativeTime: true,
            displayAuthorsInsideCommitLine: true,
            hideContributorsHeader: true,
            hideChangelogHeader: true,
        })
        app.use(NolebaseInlineLinkPreviewPlugin)
        app.use(NolebasePagePropertiesPlugin<{ updatedAt: string }>(), {
            properties: {
                "zh-CN": [
                    {
                        type: "dynamic",
                        key: "wordCount",
                        title: "字数",
                        options: {
                            type: "wordsCount"
                        }
                    },
                    {
                        type: "dynamic",
                        key: "readTime",
                        title: "阅读时间",
                        options: {
                            type: "readingTime",
                            dateFnsLocaleName: "zhCN"
                        }
                    },
                    {
                        type: "datetime",
                        key: "updatedAt",
                        title: "更新时间",
                        formatAsFrom: true,
                        omitEmpty: true, // 空时隐藏
                        dateFnsLocaleName: "zhCN"
                    }
                ]
            }
        })
    },
} satisfies Theme;