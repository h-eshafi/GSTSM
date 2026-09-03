'use client';
import { useEffect, useRef } from 'react';

export default function WysiwygEditor({ value, onChange, id }: { value: string, onChange: (val: string) => void, id: string }) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).tinymce) {
      (window as any).tinymce.init({
        selector: `#${id}`,
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
        setup: (editor: any) => {
          editorRef.current = editor;
          editor.on('change', () => {
            onChange(editor.getContent());
          });
        }
      });
    }

    return () => {
      if (editorRef.current) {
        (window as any).tinymce.remove(editorRef.current);
      }
    };
  }, [id]);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getContent()) {
      editorRef.current.setContent(value || '');
    }
  }, [value]);

  return (
    <textarea id={id} defaultValue={value} />
  );
}
