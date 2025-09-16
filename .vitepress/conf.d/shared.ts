import timeline from "vitepress-markdown-timeline"
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import {
    PageProperties,
    PagePropertiesMarkdownSection,
} from '@nolebase/vitepress-plugin-page-properties/vite'
import {
    GitChangelog,
    GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import { InlineLinkPreviewElementTransform } from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'
import taskLists from 'markdown-it-task-checkbox'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export const shared = defineConfig({
    title: "ENElite",
    description: "A VitePress Site",
    head: [
        ['script', { src: '/live2d.js' }],
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "/logo.gif",
        socialLinks: [
            { icon: 'github', link: '/' }
        ],
        search: { provider: 'local' },
        externalLinkIcon: true,
        outline: [2, 3],
    },
    markdown: {
        lineNumbers: true,
        config: (md) => {
            md.use(timeline);
            md.use(groupIconMdPlugin);
            md.use(InlineLinkPreviewElementTransform);
            md.use(taskLists)
        },
        image: {
            lazyLoading: true
        },
    },
    vite: {
        plugins: [
            groupIconVitePlugin({
                customIcon: {
                    python: 'logos:python'
                }
            }) as any,
            PageProperties(),
            PagePropertiesMarkdownSection({
                excludes: [], // 不过滤所有文件
            }),
            GitChangelog({
                maxGitLogCount: 2000, // git log 读取数量
            }),
            GitChangelogMarkdownSection({
                excludes: [], // 不过滤所有文件
                sections: {
                    disableChangelog: false, // 禁用页面历史
                    disableContributors: true, // 禁用贡献者
                },
            }),
        ],
        css: {
            preprocessorOptions: {
                scss: { api: 'modern', }
            }
        },
        optimizeDeps: {
            exclude: [
                '@nolebase/vitepress-plugin-enhanced-readabilities/client',
                '@nolebase/vitepress-plugin-git-changelog/client',
                '@nolebase/vitepress-plugin-highlight-targeted-heading/client',
                '@nolebase/vitepress-plugin-inline-link-preview/client',
                '@nolebase/vitepress-plugin-page-properties/client',
                'vitepress',
                '@nolebase/ui',
            ]
        },
        ssr: {
            noExternal: [
                '@nolebase/vitepress-plugin-enhanced-readabilities',
                '@nolebase/vitepress-plugin-git-changelog',
                '@nolebase/vitepress-plugin-highlight-targeted-heading',
                '@nolebase/vitepress-plugin-inline-link-preview',
                '@nolebase/vitepress-plugin-page-properties',
                '@nolebase/ui',
                'vitepress-theme-website'
            ]
        }
    }
})