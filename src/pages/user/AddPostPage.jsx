import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import slugify from 'slugify';
import * as yup from 'yup';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import Button from '~/components/button';
import Field from '~/components/form/field';
import { Input, InputFile } from '~/components/form/input';
import Label from '~/components/form/label';
import { Radio } from '~/components/form/radio';
import { Select } from '~/components/form/select';
import { postStatus } from '~/utils/constants';

const AddPostPageStyled = styled.div`
  width: 100%;

  .addPostPage-header {
    display: block;
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 20px;
    font-family: ${props => props.theme.font.tertiary};
    color: ${props => props.theme.color.brown};
    text-shadow: 0 0 5px ${props => props.theme.color.skin};
  }
  .addPostPage-form {
    width: 100%;
    &__filed-wrap {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-rows: repeat(3, minmax(0, 1fr));
      gap: 36px;
      margin-bottom: 36px;
    }
  }
`;
const schema = yup.object({
  title: yup.string().required('Required'),
  author: yup.string().required('required'),
  slug: yup.string(),
  category: yup.string().required('required'),
  status: yup.string().required('required'),
});

const AddPostPage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const [file, setFile] = useState({});

  // const onSubmitHandler = async data => {
  //   data.slug = slugify(data.slug || data.title);
  //   data.status = postStatus[data.status.toUpperCase()];
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve();
  //       console.log(data);
  //       // handleReset();
  //     }, 2000);
  //   });
  // };
  const onSubmitHandler = async data => {
    data.slug = slugify(data.slug || data.title);
    data.status = postStatus[data.status.toUpperCase()];
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console('default case');
        }
      },
      error => {
        console.log(error);
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //   console.log('File available at', downloadURL);
        // });
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at', downloadURL);
      }
    );
  };
  return (
    <AddPostPageStyled>
      <span className="addPostPage-header">Add New Post</span>
      <form
        className="addPostPage-form"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="addPostPage-form__filed-wrap">
          <Field>
            <Label id="title">Title</Label>
            <Input control={control} name="title" secondary></Input>
          </Field>

          <Field>
            <Label id="author">Author</Label>
            <Input control={control} name="author" secondary></Input>
          </Field>

          <Field>
            <Label id="image">Image</Label>
            <InputFile
              control={control}
              type="file"
              name="image"
              file={file}
              setFile={setFile}
              secondary
            ></InputFile>
          </Field>

          <Field>
            <Label id="status">Status</Label>
            <Radio
              name="status"
              control={control}
              radios={['Approved', 'Pending', 'Reject']}
              colors={['#a3e635', '#fde047', '#ef4444']}
            />
          </Field>

          <Field>
            <Label id="category">Category</Label>
            <Select
              name="category"
              control={control}
              setValue={setValue}
              setError={setError}
              defaultOption="Select one job"
              options={[
                'Front-end developer',
                'Back-end developer',
                'UI, UX designer',
              ]}
              secondary
            ></Select>
          </Field>

          <Field>
            <Label id="slug">Slug</Label>
            <Input control={control} name="slug" secondary></Input>
          </Field>
        </div>
        <Button
          type="submit"
          width="fit-content"
          padding="10px 32px"
          btnStyle="medium"
          style={{ margin: '0 0 0 auto' }}
        >
          Add Post
        </Button>
      </form>
    </AddPostPageStyled>
  );
};

export default AddPostPage;
