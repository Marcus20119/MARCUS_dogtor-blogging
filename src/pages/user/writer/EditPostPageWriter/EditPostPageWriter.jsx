import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

import Button from '~/components/button';
import Field from '~/components/form/field';
import { Input, InputFile, InputReactQuill } from '~/components/form/input';
import Label from '~/components/form/label';
import { Select } from '~/components/form/select';
import { useFirebase } from '~/contexts/firebaseContext';
import { db } from '~/firebase/firebase-config';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { deleteOldImage, uploadImage, useSingleDoc } from '~/firebase/funcs';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import slugify from 'slugify';

const EditPostPageWriterStyled = styled.div`
  width: 100%;

  .editPostPageWriter-form {
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

const EditPostPageWriter = () => {
  const { categoriesName } = useFirebase();
  const navigateTo = useNavigate();
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
      }).then(async result => {
        if (result.isConfirmed) {
          const { image, ...cloneData } = data;
          // Nếu thay đổi ảnh nền thì xóa ảnh cũ và up ảnh mới
          if (image) {
            await deleteOldImage({ imgName: postData.img.name });
            cloneData.img = await uploadImage(file);
            cloneData.slug =
              slugify(data.slug || data.title, {
                remove: /[*+~.()'"!:@?]/g,
                lower: true,
              }) +
              '-' +
              Date.now();
            await updateDoc(doc(db, 'posts', slug.id), {
              ...cloneData,
              content: content || 'This post has no content yet!',
            });
          } else {
            await updateDoc(doc(db, 'posts', slug.id), {
              ...cloneData,
              content: content || 'This post has no content yet!',
            });
          }
          Swal.fire('Updated!', 'Your post has been updated.', 'success');
          navigateTo('/user/writer/all-posts');
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
  return (
    <EditPostPageWriterStyled>
      <UserSectionTitle>Add New Post</UserSectionTitle>
      {postData?.id && (
        <form
          className="editPostPageWriter-form"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="editPostPageWriter-form__filed-wrap">
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
    </EditPostPageWriterStyled>
  );
};

export default EditPostPageWriter;
