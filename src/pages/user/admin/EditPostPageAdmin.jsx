import { doc, updateDoc } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import slugify from 'slugify';

import Button from '~/components/button';
import Field from '~/components/form/field';
import { Input, InputFile, InputReactQuill } from '~/components/form/input';
import Label from '~/components/form/label';
import { Select } from '~/components/form/select';
import { db } from '~/firebase/firebase-config';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { deleteOldImage, uploadImage, useSingleDoc } from '~/firebase/funcs';
import { Radio } from '~/components/form/radio';
import { postStatus } from '~/utils/constants';
import NotFoundPage from '~/pages/NotFoundPage';

const EditPostPageAdminStyled = styled.div`
  width: 100%;

  .editPostPageAdmin-form {
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
});

const EditPostPageAdmin = () => {
  const navigateTo = useNavigate();
  const { categoriesName, imgURLs, userDocument } = useOutletContext();
  const slug = useParams();
  const { document: postData } = useSingleDoc({
    col: 'posts',
    id: slug.id,
  });

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
  const [content, setContent] = useState('');

  useEffect(() => {
    if (postData.id) {
      reset({ ...postData, image: '' });
      setContent(postData.content);
    }
  }, [reset, postData]);

  const onSubmitHandler = async data => {
    try {
      Swal.fire({
        title: 'Update this post?',
        text: `This action will change your post's status to "Pending"!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#8d351a',
        cancelButtonColor: '#8d351a50',
        confirmButtonText: 'Yes, update it!',
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
          // Nếu thay đổi ảnh nền thì xóa ảnh cũ và up ảnh mới
          if (image) {
            await deleteOldImage({ imgName: postData.img.name });
            cloneData.img = await uploadImage(file);
          }
          cloneData.slug =
            slugify(data.slug || data.title, {
              remove: /[*+~.()'"!:@?]/g,
              lower: true,
            }) +
            '-' +
            Date.now();
          cloneData.status = Number(cloneData.status);
          await updateDoc(doc(db, 'posts', slug.id), {
            ...cloneData,
            content: content || 'This post has no content yet!',
          });

          Swal.fire({
            title: 'Updated!',
            text: 'Your post has been updated.',
            icon: 'success',
            scrollbarPadding: false,
          });
          navigateTo('/user/admin/all-posts');
        }
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
  // Nếu không phải là writer thì trả ra trang NotFound
  if (userDocument.role !== 'admin') {
    return <NotFoundPage />;
  }
  return (
    <EditPostPageAdminStyled>
      <UserSectionTitle>Add New Post</UserSectionTitle>
      {postData?.id && (
        <form
          className="editPostPageAdmin-form"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="editPostPageAdmin-form__filed-wrap">
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
                defaultValue={postData.img.name}
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
                defaultoption={postData.category}
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
            Update Post
          </Button>
        </form>
      )}
    </EditPostPageAdminStyled>
  );
};

export default EditPostPageAdmin;
