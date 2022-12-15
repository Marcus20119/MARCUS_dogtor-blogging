import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '~/components/button';
import Field from '~/components/form/field';
import { Input, InputAvatar } from '~/components/form/input';
import Label from '~/components/form/label';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { useAuth } from '~/contexts/authContext';
import { useFirebase } from '~/contexts/firebaseContext';

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

const UserInfoPageWriter = () => {
  const { userInfo } = useAuth();
  const { userDocument } = useFirebase();
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting },
    reset,
  } = useForm({
    // resolver: yupResolver(schema),
    mode: 'all',
  });
  const [file, setFile] = useState({});

  const onSubmitHandler = async data => {
    // Custom value
    try {
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
            secondary
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
