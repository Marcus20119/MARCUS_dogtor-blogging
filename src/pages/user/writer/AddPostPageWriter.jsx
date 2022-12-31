import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import slugify from 'slugify';
import * as yup from 'yup';

import Button from '~/components/button';
import Field from '~/components/form/field';
import { Input, InputFile } from '~/components/form/input';
import Label from '~/components/form/label';
import { Select } from '~/components/form/select';
import { useFirebase } from '~/contexts/firebaseContext';
import { db } from '~/firebase/firebase-config';
import { useAuth } from '~/contexts/authContext';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { uploadImage } from '~/firebase/funcs';

const AddPostPageWriterStyled = styled.div`
  width: 100%;

  .addPostPageWriter-form {
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
  overview: yup.string().required('required'),
  image: yup.string().required('required'),
});

const AddPostPageWriter = () => {
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

  const onSubmitHandler = async data => {
    try {
      const { image, ...cloneData } = data;
      // Custom value
      cloneData.slug = slugify(data.slug || data.title, {
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      });
      cloneData.img = await uploadImage(file);
      await addDoc(collection(db, 'posts'), {
        ...cloneData,
        userId: userInfo.uid,
        status: 2,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
    reset({
      title: '',
      image: '',
      category: '',
      author: '',
      slug: '',
      overview: '',
    });
  };
  return (
    <AddPostPageWriterStyled>
      <UserSectionTitle>Add New Post</UserSectionTitle>
      <form
        className="addPostPageWriter-form"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="addPostPageWriter-form__filed-wrap">
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
              accept=".png,.jpg,.jpeg"
            ></InputFile>
          </Field>

          <Field>
            <Label id="overview">Overview</Label>
            <Input control={control} name="overview" secondary></Input>
          </Field>

          <Field>
            <Label id="category">Category</Label>
            <Select
              name="category"
              control={control}
              setValue={setValue}
              setError={setError}
              defaultoption="Select a category"
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
    </AddPostPageWriterStyled>
  );
};

export default AddPostPageWriter;
