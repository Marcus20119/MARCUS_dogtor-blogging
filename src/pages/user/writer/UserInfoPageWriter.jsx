import { yupResolver } from '@hookform/resolvers/yup';
import { doc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

import Button from '~/components/button';
import Field from '~/components/form/field';
import { Input, InputAvatar } from '~/components/form/input';
import Label from '~/components/form/label';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { useAuth } from '~/contexts/authContext';
import { useFirebase } from '~/contexts/firebaseContext';
import { db } from '~/firebase/firebase-config';

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
  const { userInfo } = useAuth();
  const { userDocument, imgURLs } = useFirebase();
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

  const handleDeleteOldImage = async () => {
    if (
      userDocument?.avatarURL &&
      userDocument.avatarURL !== imgURLs.userAvatar
    ) {
      const imageName = /%2F(\S+)\?/gm.exec(userDocument.avatarURL)[1];
      console.log('imageName', imageName);
      const storage = getStorage();
      const imageRef = ref(storage, 'images/' + imageName);
      console.log('imageRef', imageRef);
      await deleteObject(imageRef);
    }
  };

  const onSubmitHandler = async data => {
    // Custom value
    try {
      console.log('lalaland');
      console.log(data);
      if (!data.image) {
        const { image, ...newData } = data;
        await updateDoc(doc(db, 'users', userDocument.id), newData);
      } else {
        handleDeleteOldImage();
        const { image, ...newData } = data;
        newData.avatarURL = await handleUploadImage();
        await updateDoc(doc(db, 'users', userDocument.id), newData);
        console.log(newData);
      }
    } catch (err) {
      console.log(err);
    }
    reset(userDocument);
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
        >
          Add Post
        </Button>
      </form>
    </UserInfoPageWriterStyled>
  );
};

export default UserInfoPageWriter;
