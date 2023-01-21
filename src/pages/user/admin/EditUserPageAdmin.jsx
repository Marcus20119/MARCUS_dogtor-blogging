import { yupResolver } from '@hookform/resolvers/yup';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { isEqual } from 'lodash';
import { useOutletContext, useParams } from 'react-router-dom';

import Button from '~/components/button';
import Field from '~/components/form/field';
import { Input, InputAvatar } from '~/components/form/input';
import Label from '~/components/form/label';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { db } from '~/firebase/firebase-config';
import { deleteOldImage, uploadImage, useSingleDoc } from '~/firebase/funcs';
import { useScrollOnTop } from '~/hooks';
import { Radio } from '~/components/form/radio';
import { userRoles } from '~/utils/constants';
import { mobile } from '~/styles/responsive';

const EditUserPageAdminStyled = styled.div`
  width: 100%;

  .editUserPage-form {
    width: 100%;

    &__main-wrap {
      width: 100%;
      display: flex;
      gap: 40px;

      ${mobile(css`
        flex-direction: column;

        div:first-child {
          margin: auto auto;
        }
      `)}
    }
    &__filed-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 36px;
      margin-bottom: 36px;
    }
  }
`;

const schema = yup.object({
  image: yup.string(),
  fullName: yup.string(),
  userName: yup.string().required('required'),
  email: yup.string().required('required'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be a valid phone number')
    .min(10, 'Must be a valid phone number')
    .max(10, 'Must be a valid phone number'),
});

const EditUserPageAdmin = () => {
  useScrollOnTop();
  const { id } = useParams();
  console.log('id', id);
  const { imgURLs } = useOutletContext();
  const { document: userDocument } = useSingleDoc({ col: 'users', id });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const [file, setFile] = useState({});

  const handleDeleteOldImage = async () => {
    if (
      userDocument?.avatar?.URL &&
      userDocument.avatar.URL !== imgURLs.userAvatar
    ) {
      await deleteOldImage({ imgName: userDocument.avatar.name });
    }
  };

  const onSubmitHandler = async data => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Please check all your information before doing this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8d351a',
      cancelButtonColor: '#8d351a50',
      confirmButtonText: 'Update info',
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
        // Handle submit form
        try {
          if (!data.image) {
            const { image, ...newData } = data;
            await updateDoc(doc(db, 'users', userDocument.id), newData);
          } else {
            handleDeleteOldImage();
            const { image, ...newData } = data;
            newData.avatar = await uploadImage(file);
            await updateDoc(doc(db, 'users', userDocument.id), newData);
          }
        } catch (err) {
          console.log(err);
        }
        Swal.fire({
          title: 'Update!',
          text: 'Your information has been updated.',
          icon: 'success',
          scrollbarPadding: false,
          confirmButtonColor: '#8d351a',
        });
      }
    });
  };
  useEffect(() => {
    reset(userDocument);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDocument]);

  return (
    <EditUserPageAdminStyled>
      <UserSectionTitle>User Info</UserSectionTitle>
      <form
        className="editUserPage-form"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="editUserPage-form__main-wrap">
          {userDocument && (
            <InputAvatar
              control={control}
              type="file"
              name="image"
              file={file}
              setFile={setFile}
              userDocument={userDocument}
            />
          )}
          <div className="editUserPage-form__filed-wrap">
            <Field>
              <Label id="fullName">Full Name</Label>
              <Input control={control} name="fullName" secondary></Input>
            </Field>

            <Field>
              <Label id="userName">User Name</Label>
              <Input control={control} name="userName" secondary></Input>
            </Field>
            <Field>
              <Label id="email">Email</Label>
              <Input control={control} name="email" secondary></Input>
            </Field>

            <Field>
              <Label id="phoneNumber">Phone Number</Label>
              <Input control={control} name="phoneNumber" secondary></Input>
            </Field>
            <Field>
              <Label id="role">Role</Label>
              <Radio
                control={control}
                name="role"
                radios={userRoles}
                colors={['#65a30d', '#65a30d', '#65a30d']}
              />
            </Field>
          </div>
        </div>
        <Button
          type="submit"
          width="151px"
          padding="10px 32px"
          btnStyle="medium"
          style={{ margin: '0 0 0 auto' }}
          isSubmitting={isSubmitting}
          disabled={isEqual(userDocument, watch())}
        >
          Update Info
        </Button>
      </form>
    </EditUserPageAdminStyled>
  );
};

export default EditUserPageAdmin;
