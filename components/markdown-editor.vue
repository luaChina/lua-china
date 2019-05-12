<template>
<div class="markdown-editor">
    <textarea name="content" id="markdownSection" cols="30" rows="10"></textarea>
</div>
</template>

<script>
import SimpleMDE from 'simplemde'
import 'font-awesome/css/font-awesome.min.css'
import 'simplemde/dist/simplemde.min.css'
require('codemirror/theme/monokai.css'); // codemirror

export default {
    props: ['edit'],
    data() {
        return {
            simplemde: Object
        }
    },
    mounted() {
        this.initMarkdownEditor()
    },
    methods: {
        initMarkdownEditor() {
            // 编辑时关闭 autosave 功能
            let autoSave = {
                enabled: true,
                delay: 2000,
                unique_id: 'article'
            }
            if (this.edit) {
                autoSave = {
                    enabled: false,
                }
            }
            this.simplemde = new SimpleMDE({
                element: document.getElementById('markdownSection'),
                autoDownloadFontAwesome: false,
                spellChecker: false,
                autosave: autoSave,
                renderingConfig: {
                    codeSyntaxHighlighting: true,
                },
            })
            this.simplemde.codemirror.setOption('theme', 'monokai')
            this.simplemde.codemirror.setOption('lineNumbers', true)
        },
        getContent() {
            return this.simplemde.value()
        },
        setContent(content) {
            this.simplemde.value(content)
        }
    },
    beforeDestroy() {
        console.log('will destroy')
        clearTimeout(this.simplemde.autosaveTimeoutId);
    }
}
</script>