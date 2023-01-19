import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import slugify from 'slugify';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate, useOutletContext } from 'react-router-dom';

import Button from '~/components/button';
import Field from '~/components/form/field';
import { Input } from '~/components/form/input';
import Label from '~/components/form/label';
import { db } from '~/firebase/firebase-config';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { useScrollOnTop } from '~/hooks';
import NotFoundPage from '~/pages/NotFoundPage';

const AddCategoryPageAdminStyled = styled.div`
  width: 100%;
  margin-bottom: 24px;

  .addCategoryPageAdmin-form {
    width: 100%;
    &__filed-wrap {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      grid-template-rows: repeat(2, minmax(0, 1fr));
      gap: 36px;
      margin-bottom: 36px;
    }
  }
`;
const schema = yup.object({
  name: yup.string().required('Required'),
  group: yup
    .string()
    .required('Required')
    .matches(/^\d+$/, 'The field should have digits only'),
  slug: yup.string(),
});

const AddCategoryPageAdmin = () => {
  useScrollOnTop();
  const navigateTo = useNavigate();
  const { userDocument, imgURLs } = useOutletContext();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmitHandler = async data => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Check your category information before doing this action!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#8d351a',
        cancelButtonColor: '#8d351a50',
        confirmButtonText: 'Yes, create it!',
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
          // Custom value
          data.slug =
            slugify(data.slug || data.name, {
              remove: /[*+~.()'"!:@?]/g,
              lower: true,
            }) +
            '-' +
            Date.now();
          await addDoc(collection(db, 'categories'), {
            ...data,
            group: Number(data.group),
            createdAt: serverTimestamp(),
          });
          navigateTo('/user/admin/all-categories');
          Swal.fire({
            title: 'Created successfully!',
            text: 'New Category has been created.',
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

  // Khi xảy ra lỗi validate thì focus vào input chứa lỗi và scroll lên vị trí 86
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
    <AddCategoryPageAdminStyled>
      <UserSectionTitle>Add New Category</UserSectionTitle>
      <form
        className="addCategoryPageAdmin-form"
        onSubmit={handleSubmit(onSubmitHandler, () => onErrorsHandler(errors))}
      >
        <div className="addCategoryPageAdmin-form__filed-wrap">
          <Field>
            <Label id="name">Name</Label>
            <Input control={control} name="name" secondary></Input>
          </Field>

          <Field>
            <Label id="group">Group</Label>
            <Input control={control} name="group" secondary></Input>
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
          Add Category
        </Button>
      </form>
    </AddCategoryPageAdminStyled>
  );
};

export default AddCategoryPageAdmin;
