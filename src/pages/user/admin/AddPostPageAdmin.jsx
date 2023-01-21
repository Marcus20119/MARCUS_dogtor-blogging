import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import slugify from 'slugify';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate, useOutletContext } from 'react-router-dom';

import Button from '~/components/button';
import Field from '~/components/form/field';
import { Input, InputFile, InputReactQuill } from '~/components/form/input';
import Label from '~/components/form/label';
import { Select } from '~/components/form/select';
import { db } from '~/firebase/firebase-config';
import { useAuth } from '~/contexts/authContext';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { uploadImage } from '~/firebase/funcs';
import { useScrollOnTop } from '~/hooks';
import NotFoundPage from '~/pages/NotFoundPage';
import { Radio } from '~/components/form/radio';
import { postStatus } from '~/utils/constants';
import { mobile } from '~/styles/responsive';

const AddPostPageAdminStyled = styled.div`
  width: 100%;
  margin-bottom: 24px;

  .addPostPageAdmin-form {
    width: 100%;
    &__filed-wrap {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-rows: repeat(3, minmax(0, 1fr));
      gap: 36px;
      margin-bottom: 36px;

      ${mobile(css`
        grid-template-columns: repeat(1, minmax(0, 1fr));
        grid-template-rows: unset;
      `)}
    }
  }
`;
const schema = yup.object({
  title: yup.string().required('Required').min(35, 'Too short'),
  author: yup.string().required('required'),
  slug: yup.string(),
  category: yup.string().required('required'),
  overview: yup.string().required('required').min(70, 'Too short'),
  image: yup.string().required('required'),
  status: yup
    .number()
    .oneOf([1, 2, 3], 'Must be one of the following number: 1, 2 or 3')
    .required('Required'),
});

const AddPostPageAdmin = () => {
  useScrollOnTop();
  const navigateTo = useNavigate();
  const { categoriesName, userDocument, imgURLs } = useOutletContext();
  const { userInfo } = useAuth();
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const [file, setFile] = useState({});
  const [content, setContent] = useState('');

  const onSubmitHandler = async data => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Your post will be hidden before the admin approve it!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#8d351a',
        cancelButtonColor: '#8d351a50',
        confirmButtonText: 'Yes, post it!',
        scrollbarPadding: false,
      }).then(async result => {
        if (result.isConfirmed) {
          // Loading pop-up
          Swal.fire({
            title: 'Loading...',
            text: 'Please wait',
            imageUrl: imgURLs.loading,
            imageHeight: '60px',
            showConfirmButton: false,
            allowOutsideClick: false,
            scrollbarPadding: false,
          });
          const { image, ...cloneData } = data;
          // Custom value
          cloneData.slug =
            slugify(data.slug || data.title, {
              remove: /[*+~.()'"!:@?]/g,
              lower: true,
            }) +
            '-' +
            Date.now();
          cloneData.img = await uploadImage(file);
          await addDoc(collection(db, 'posts'), {
            ...cloneData,
            userId: userInfo.uid,
            quantityView: 0,
            usersLiked: [],
            content: content || 'This post has no content yet!',
            createdAt: serverTimestamp(),
          });
          navigateTo('/user/admin/all-posts?category=All%20categories&search=');
          Swal.fire({
            title: 'Added successfully!',
            text: `You can check your post's status in "All posts" section.`,
            icon: 'success',
            scrollbarPadding: false,
            confirmButtonColor: '#8d351a',
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const onErrorsHandler = async errors => {
    try {
      if (errors[Object.keys(errors)[0]]?.ref?.select) {
        errors[Object.keys(errors)[0]].ref.select();
      }
      document.documentElement.scrollTop = 86;
    } catch (err) {
      console.log(err);
    }
  };

  // Nếu không phải là Admin thì trả ra trang NotFound
  if (userDocument.role !== 'admin') {
    return <NotFoundPage />;
  }

  return (
    <AddPostPageAdminStyled>
      <UserSectionTitle>Add New Post</UserSectionTitle>
      <form
        className="addPostPageAdmin-form"
        onSubmit={handleSubmit(onSubmitHandler, () => onErrorsHandler(errors))}
      >
        <div className="addPostPageAdmin-form__filed-wrap">
          <Field>
            <Label id="title">Title</Label>
            <Input control={control} name="title" secondary></Input>
          </Field>

          <Field>
            <Label id="author">Author</Label>
            <Input control={control} name="author" secondary></Input>
          </Field>

          <Field>
            <Label id="image">Main Image</Label>
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
          <Field>
            <Label id="status">Status</Label>
            <Radio
              control={control}
              name="status"
              radios={postStatus}
              colors={['#65a30d', '#eab308', '#ef4444']}
            />
          </Field>
        </div>
        <Field>
          <Label id="content">Content</Label>
          <InputReactQuill value={content} setValue={setContent} />
        </Field>
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
    </AddPostPageAdminStyled>
  );
};

export default AddPostPageAdmin;
