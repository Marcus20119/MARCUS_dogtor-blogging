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
import { useFirebase } from '~/contexts/firebaseContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '~/firebase/firebase-config';
import { useAuth } from '~/contexts/authContext';

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
  const { categoriesName } = useFirebase();
  const { userInfo } = useAuth();
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

  const handleUploadImage = async () => {
    return new Promise(function (resolve, reject) {
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      let downloadURL = '';
      // Upload image
      uploadTask.on(
        'state_changed',
        // Show progress
        snapshot => {},
        error => {
          console.log(error);
          reject();
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const onSubmitHandler = async data => {
    // Custom value
    try {
      const { image, ...cloneData } = data;
      cloneData.slug = slugify(data.slug || data.title, {
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      });
      cloneData.status = postStatus[data.status.toUpperCase()];
      cloneData.downloadURl = await handleUploadImage();
      await addDoc(collection(db, 'posts'), {
        ...cloneData,
        userId: userInfo.uid,
        createdAt: serverTimestamp(),
      });
      console.log('success');
    } catch (err) {
      console.log(err);
    }
    reset({
      title: '',
      image: '',
      category: '',
      author: '',
      slug: '',
      status: '',
    });
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
              defaultOption="Select a category"
              options={categoriesName}
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
          width="151px"
          padding="10px 32px"
          btnStyle="medium"
          style={{ margin: '0 0 0 auto' }}
          isSubmitting={isSubmitting}
        >
          Add Post
        </Button>
      </form>
    </AddPostPageStyled>
  );
};

export default AddPostPage;
