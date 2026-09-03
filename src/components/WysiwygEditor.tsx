'use client';
import { Editor } from '@tinymce/tinymce-react';

export default function WysiwygEditor({ value, onChange, id }: { value: string, onChange: (val: string) => void, id: string }) {
  return (
    <Editor
      id={id}
      apiKey="no-api-key"
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 500,
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
        content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px }',
      }}
    />
  );
}
