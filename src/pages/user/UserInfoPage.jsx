import { yupResolver } from '@hookform/resolvers/yup';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { isEqual } from 'lodash';
import { useOutletContext } from 'react-router-dom';

import Button from '~/components/button';
import Field from '~/components/form/field';
import { Input, InputAvatar } from '~/components/form/input';
import Label from '~/components/form/label';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { db } from '~/firebase/firebase-config';
import { deleteOldImage, uploadImage } from '~/firebase/funcs';
import { useScrollOnTop } from '~/hooks';
import { mobile } from '~/styles/responsive';

const UserInfoPageStyled = styled.div`
  width: 100%;

  .userInfoPage-form {
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

const UserInfoPage = () => {
  useScrollOnTop();
  const { userDocument, imgURLs } = useOutletContext();
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
          const { image, ...newData } = data;
          if (data.image) {
            handleDeleteOldImage();
            newData.avatar = await uploadImage(file);
          }
          await updateDoc(doc(db, 'users', userDocument.id), newData);
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
    <UserInfoPageStyled>
      <UserSectionTitle>User Info</UserSectionTitle>
      <form
        className="userInfoPage-form"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="userInfoPage-form__main-wrap">
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
          <div className="userInfoPage-form__filed-wrap">
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
    </UserInfoPageStyled>
  );
};

export default UserInfoPage;
