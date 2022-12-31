import ReactQuill, { Quill } from 'react-quill';
import ImageUploader from 'quill-image-uploader/src/quill.imageUploader.js';

import 'react-quill/dist/quill.snow.css';
import './InputReactQuill.scss';

Quill.register('modules/imageUploader', ImageUploader);

const InputReactQuill = ({ value, setValue }) => {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image'],
    ],
    // imageUploader: {
    //   upload: file => {
    // return new Promise((resolve, reject) => {
    //   resolve('https://source.unsplash.com/FV3GConVSss/900x500');
    // });
    // },
    // },
  };
  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      value={value}
      onChange={setValue}
      className="entry-content"
    />
  );
};

export { InputReactQuill };
