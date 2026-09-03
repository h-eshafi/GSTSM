'use client';
import { Editor } from '@tinymce/tinymce-react';

export default function WysiwygEditor({ value, onChange, id }: { value: string, onChange: (val: string) => void, id: string }) {
  return (
    <Editor
      id={id}
      apiKey="4qv18891sfw90yuvulh2hk3dltsdjub7ccl1su102l7nkkqg"
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 520,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | image media table | help',
        content_css: '/src/index.css',
        content_style: 'body { font-family: Inter, Helvetica, Arial, sans-serif; font-size: 16px; padding: 20px; background-color: #ffffff; }',
      }}
    />
  );
}
