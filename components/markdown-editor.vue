<template>
    <div class="markdown-editor">
        <div class="alert alert-info" role="alert">
            温馨提示：拖拽图片至编辑器中可直接上传图片，并渲染为markdown格式
        </div>
        <textarea name="content" id="markdownSection" cols="30" rows="10"></textarea>
    </div>
</template>

<script>
import EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css'
require('codemirror/theme/monokai.css'); // codemirror
require('inline-attachment/src/inline-attachment');
require('inline-attachment/src/codemirror-4.inline-attachment');

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
            let autoSave = {
                delay: 2000,
                unique_id: 'article'
            };
            this.simplemde = new EasyMDE({
                element: document.getElementById('markdownSection'),
                autoDownloadFontAwesome: false, // 阻止加载旧版本
                spellChecker: false,
                autosave: autoSave,
                renderingConfig: {
                    codeSyntaxHighlighting: true,
                },
            });
            this.simplemde.codemirror.setOption('theme', 'monokai');
            this.simplemde.codemirror.setOption('lineNumbers', true);

            let inlineAttachmentConfig = {
                uploadUrl: 'https://lua-china.com/file/v1/cos/upload/cdn',
                progressText: '![图片上传中...]()',
                errorText: '图片上传失败',
                urlText: '![图片]({filename})',

                onFileUploadResponse: function (xhr) {
                    let result = JSON.parse(xhr.responseText);
                    let filename = result.data.cdn_url;
                    if (result && filename) {
                        let newValue;
                        if (typeof this.settings.urlText === 'function') {
                            newValue = this.settings.urlText.call(this, filename, result);
                        } else {
                            newValue = this.settings.urlText.replace(this.filenameTag, filename);
                        }
                        let text = this.editor.getValue().replace(this.lastValue, newValue);
                        this.editor.setValue(text);
                        this.settings.onFileUploaded.call(this, filename);
                    }
                    return false;
                }
            };

            //这里是 inlineAttachment 的调用配置
            inlineAttachment.editors.codemirror4.attach(this.simplemde.codemirror, inlineAttachmentConfig);
        },
        getContent() {
            return this.simplemde.value()
        },
        setContent(content) {
            this.simplemde.value(content)
        }
    },
    beforeDestroy() {
        clearTimeout(this.simplemde.autosaveTimeoutId);
    }
}
</script>
