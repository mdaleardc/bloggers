import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePostForm } from '../context/PostFormContext';

const Editor = dynamic(() => import('@tinymce/tinymce-react').then((mod) => mod.Editor), { ssr: false });
// tinyMCE Editor
export function RTEField() {
    const { data, handleData } = usePostForm();
    const handleChange = (newValue) => {
        handleData('content', newValue);
    };
    const tinyMCEApiKey = process.env.NEXT_PUBLIC_TINY_MCE_API_KEY;

    return (
        <div>
            <Editor
                apiKey={tinyMCEApiKey}
                value={data?.content || ''}
                onEditorChange={handleChange}
                init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'help', 'wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | h1 h2 h3 h4 | bold italic underline strikethrough | \
                        alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | \
                        link image media | forecolor backcolor | code help',
                    content_style: `
                        body { font-family: Arial, sans-serif; font-size: 14px; }
                        h1 { font-size: 28px; font-weight: bold; }
                        h2 { font-size: 24px; font-weight: bold; }
                        h3 { font-size: 20px; font-weight: bold; }
                        h4 { font-size: 18px; }
                    `,
                    placeholder: 'Enter your content here...',
                }}
            />
        </div>
    );
}