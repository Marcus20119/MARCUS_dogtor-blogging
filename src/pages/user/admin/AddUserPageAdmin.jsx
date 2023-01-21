import { yupResolver } from '@hookform/resolvers/yup';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { useNavigate, useOutletContext } from 'react-router-dom';

import Button from '~/components/button';
import Field from '~/components/form/field';
import { Input, InputAvatar } from '~/components/form/input';
import Label from '~/components/form/label';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { auth, db } from '~/firebase/firebase-config';
import { uploadImage } from '~/firebase/funcs';
import { useScrollOnTop } from '~/hooks';
import { Radio } from '~/components/form/radio';
import { userRoles } from '~/utils/constants';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { mobile } from '~/styles/responsive';

const AddUserPageAdminStyled = styled.div`
  width: 100%;

  .addUserPage-form {
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
  fullName: yup.string().required(),
  email: yup.string().email().required('required'),
  password: yup
    .string()
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be a valid phone number')
    .min(10, 'Must be a valid phone number')
    .max(10, 'Must be a valid phone number'),
  userName: yup
    .string()
    .required('Required')
    .max(10, 'Must be less than 10 characters'),
  role: yup
    .string()
    .oneOf(
      ['admin', 'writer', 'reader'],
      'Must be one of: Admin, Writer or Reader'
    )
    .required('Required'),
});

const AddUserPageAdmin = () => {
  useScrollOnTop();
  const navigateTo = useNavigate();
  const { imgURLs, userDocument } = useOutletContext();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const [file, setFile] = useState({});
  const onSubmitHandler = async data => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Please check all information before doing this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8d351a',
      cancelButtonColor: '#8d351a50',
      confirmButtonText: 'Create User',
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
          const adminEmail = userDocument.email;
          const adminPassword = userDocument.password;
          // SignOut tài khoản admin hiện tại
          signOut(auth);
          // Tạo tài khoản mới
          const cred = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
          );
          await updateProfile(auth.currentUser, {
            displayName: data.userName,
          });
          // SignOut tài khoản mới
          signOut(auth);
          // Đăng nhập tài khoản admin cũ
          await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
          let img;
          if (data.image) {
            img = await uploadImage(file);
          }
          // Add new user
          await setDoc(doc(db, 'users', cred.user.uid), {
            email: data.email,
            password: data.password,
            id: cred.user.uid,
            userName: data.userName,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            postsLiked: [],
            createdAt: serverTimestamp(),
            avatar: img || {
              URL: imgURLs.userAvatar,
              name: 'default-user.png',
            },
            role: 'reader',
          });
          navigateTo('/user/admin/all-users?category=All%20roles');
        } catch (err) {
          console.log(err);
        }
        Swal.fire({
          title: 'Created!',
          text: 'New User has been created.',
          icon: 'success',
          scrollbarPadding: false,
          confirmButtonColor: '#8d351a',
        });
      }
    });
  };

  return (
    <AddUserPageAdminStyled>
      <UserSectionTitle>Add New User</UserSectionTitle>
      <form
        className="addUserPage-form"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="addUserPage-form__main-wrap">
          <InputAvatar
            control={control}
            type="file"
            name="image"
            file={file}
            setFile={setFile}
          />

          <div className="addUserPage-form__filed-wrap">
            <Field>
              <Label id="fullName">Full Name</Label>
              <Input
                control={control}
                name="fullName"
                placeholder="Enter your full name ..."
                secondary
              ></Input>
            </Field>

            <Field>
              <Label id="userName">User Name</Label>
              <Input
                control={control}
                name="userName"
                placeholder="Enter your user name ..."
                secondary
              ></Input>
            </Field>
            <Field>
              <Label id="email">Email</Label>
              <Input control={control} name="email" secondary></Input>
            </Field>
            <Field>
              <Label id="password">Password</Label>
              <Input control={control} name="password" secondary></Input>
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
        >
          Create User
        </Button>
      </form>
    </AddUserPageAdminStyled>
  );
};

export default AddUserPageAdmin;
