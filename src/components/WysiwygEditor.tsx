'use client';
import { Editor } from '@tinymce/tinymce-react';

export default function WysiwygEditor({ value, onChange, id }: { value: string, onChange: (val: string) => void, id: string }) {
  return (
    <Editor
      id={id}
      tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.3.0/tinymce.min.js"
      value={value}
      disabled={false}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 550,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
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
