'use client';
import { Editor } from '@tinymce/tinymce-react';

export default function WysiwygEditor({ value, onChange, id }: { value: string, onChange: (val: string) => void, id: string }) {
  return (
    <Editor
      id={id}
      apiKey="4qv18891sfw90yuvulh2hk3dltsdjub7ccl1su102l7nkkqg"
      tinymceScriptSrc="https://cdn.tiny.cloud/1/4qv18891sfw90yuvulh2hk3dltsdjub7ccl1su102l7nkkqg/tinymce/8/tinymce.min.js"
      value={value}
      disabled={false}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 550,
        menubar: true,
        plugins: [
          'accordion', 'advlist', 'anchor', 'autolink', 'autoresize', 'autosave',
          'charmap', 'code', 'codesample', 'directionality', 'emoticons', 'fullscreen',
          'help', 'image', 'importcss', 'insertdatetime', 'link', 'lists', 'media',
          'nonbreaking', 'pagebreak', 'preview', 'quickbars', 'save', 'searchreplace',
          'table', 'visualblocks', 'visualchars', 'wordcount'
        ],
        toolbar: 'undo redo | blocks fontfamily fontsize | ' +
          'bold italic underline strikethrough forecolor backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'link image media table | code fullscreen preview | help',
        content_css: '/src/index.css',
        content_style: 'body { font-family: Inter, Helvetica, Arial, sans-serif; font-size: 16px; padding: 20px; background-color: #ffffff; color: #0f172a; }',
        branding: false,
        promotion: false,
        resize: true,
      }}
    />
  );
}
