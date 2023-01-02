import { yupResolver } from '@hookform/resolvers/yup';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { isEqual } from 'lodash';

import Button from '~/components/button';
import Field from '~/components/form/field';
import { Input, InputAvatar } from '~/components/form/input';
import Label from '~/components/form/label';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { useFirebase } from '~/contexts/firebaseContext';
import { db } from '~/firebase/firebase-config';
import { deleteOldImage, uploadImage } from '~/firebase/funcs';
import { useOutletContext } from 'react-router-dom';
import { useScrollOnTop } from '~/hooks';

const UserInfoPageWriterStyled = styled.div`
  width: 100%;

  .userInfoPageWriter-form {
    width: 100%;

    &__main-wrap {
      width: 100%;
      display: flex;
      gap: 40px;
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

const UserInfoPageWriter = () => {
  useScrollOnTop();
  const { imgURLs } = useFirebase();
  const userDocument = useOutletContext();
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
    }).then(async result => {
      if (result.isConfirmed) {
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
        reset(userDocument);
        Swal.fire('Update!', 'Your information has been updated.', 'success');
      }
    });
  };
  useEffect(() => {
    reset(userDocument);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDocument]);

  return (
    <UserInfoPageWriterStyled>
      <UserSectionTitle>User Info</UserSectionTitle>
      <form
        className="userInfoPageWriter-form"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="userInfoPageWriter-form__main-wrap">
          <InputAvatar
            control={control}
            type="file"
            name="image"
            file={file}
            setFile={setFile}
          />
          <div className="userInfoPageWriter-form__filed-wrap">
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
    </UserInfoPageWriterStyled>
  );
};

export default UserInfoPageWriter;
