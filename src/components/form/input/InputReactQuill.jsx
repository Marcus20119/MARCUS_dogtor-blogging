import ReactQuill, { Quill } from 'react-quill';
import ImageUploader from 'quill-image-uploader';

import 'react-quill/dist/quill.snow.css';
import './InputReactQuill.scss';
import axios from 'axios';

Quill.register('modules/imageUploader', ImageUploader);

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote'],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['link', 'image'],
  ],
  imageUploader: {
    upload: async file => {
      const bodyFormData = new FormData();
      bodyFormData.append('image', file);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.data.url;
    },
  },
};
const InputReactQuill = ({ value, setValue }) => {
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
