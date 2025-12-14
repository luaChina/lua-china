<template>
    <div class="max-w-screen-xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">发文指南</h1>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 prose prose-lg max-w-none text-gray-700">
            <h2 class="text-2xl font-bold mb-4">关于文章编写</h2>
            <p>为了保证文章的可读性和排版美观，我们强烈推荐使用 <strong>Markdown</strong> 语法进行文章的编写。</p>
            
            <h3 class="text-xl font-bold mt-6 mb-3">排版建议</h3>
            <ul class="list-disc pl-6 space-y-2 mb-6">
                <li>请合理使用各级标题（H1, H2, H3 等）来构建清晰的文章结构。</li>
                <li>代码块请使用 Markdown 的代码块语法，并注明语言类型（如 ```lua），以便进行代码高亮。</li>
                <li>适当使用列表、引用和加粗来强调重点内容。</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-3">Markdown 学习资源</h3>
            <p>如果您还不熟悉 Markdown 语法，可以访问以下链接进行学习：</p>
            <p>
                <a href="https://markdown.cn/docs/intro" target="_blank" class="text-blue-600 hover:underline flex items-center">
                    <i class="bi bi-link-45deg mr-1"></i>
                    Markdown 官方教程 (markdown.cn)
                </a>
            </p>

            <div class="mt-8 pt-6 border-t border-gray-100">
                <router-link to="/" class="inline-flex items-center text-gray-500 hover:text-red-600 transition no-underline">
                    <i class="bi bi-arrow-left mr-1"></i>
                    返回首页
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: '发文指南 - Lua 中国',
            meta: [
                { hid: 'description', name: 'description', content: 'Lua 中国社区发文指南。' }
            ]
        }
    }
}
</script>
