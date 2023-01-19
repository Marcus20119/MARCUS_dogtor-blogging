import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import Field from '~/components/form/field';
import Label from '~/components/form/label';
import { Input, InputTogglePassword } from '~/components/form/input';
import Button from '~/components/button';
import { auth, db } from '~/firebase/firebase-config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '~/contexts/firebaseContext';

const StyledSignUpPage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.white};
  min-height: 100vh;
  width: calc(100vw - 12px);

  .sup-dogtor-logo {
    display: block;
    width: 10%;
    min-width: 150px;
    margin-top: 20px;
  }
  .sup-title {
    font-size: 32px;
    font-family: ${props => props.theme.font.secondary};
    letter-spacing: 0.7px;
    color: ${props => props.theme.color.brown};
    margin-bottom: 28px;
  }
  .sup-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
    width: 70%;
    min-width: 350px;
    margin-bottom: 28px;
  }
  .sup-question {
    font-weight: 500;
    font-size: 15px;
    &-color {
      color: #f46e45;
    }
    &-color:hover {
      opacity: 0.8;
    }
  }
`;

const schema = yup.object({
  userName: yup
    .string()
    .required('Required')
    .max(10, 'Must be less than 10 characters'),
  email: yup.string().email().required('required'),
  password: yup
    .string()
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  confirmPassword: yup
    .string()
    .required('Required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

const SignUpPage = () => {
  const { imgURLs } = useFirebase();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const navigateTo = useNavigate();
  // Handle submit
  const onSubmitHandler = async data => {
    try {
      // credentials
      const cred = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // Update user profile
      await updateProfile(auth.currentUser, {
        displayName: data.userName,
      });
      // Add user to collection
      await setDoc(doc(db, 'users', cred.user.uid), {
        email: data.email,
        password: data.password,
        id: cred.user.uid,
        userName: data.userName,
        postsLiked: [],
        createdAt: serverTimestamp(),
        avatar: { URL: imgURLs.userAvatar, name: 'default-user.png' },
        role: 'reader',
      });

      // Reset form
      reset({
        userName: '',
        password: '',
        email: '',
      });
      // Navigate to latest page
      navigateTo('/latest');
      // Notify by showing a toast
      toast.success('Sign Up success !', {
        autoClose: 300,
        delay: 100,
        hideProgressBar: true,
      });
    } catch (err) {
      console.log(err);
      toast.error(`Error: ${err.code.split('/')[1]}`, {
        autoClose: 2000,
        delay: 300,
      });
    }
  };

  return (
    <StyledSignUpPage>
      <div className="small-container">
        <img
          className="sup-dogtor-logo"
          src="/imgs/dogtor-logo.png"
          alt="dogtor-logo"
        />
        <span className="sup-title">Dogtor blogging</span>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="sup-form"
          autoComplete="off"
        >
          <Field>
            <Label id="userName">User Name</Label>
            <Input control={control} name="userName"></Input>
          </Field>
          <Field>
            <Label id="email">Email Address</Label>
            <Input control={control} name="email"></Input>
          </Field>
          <Field>
            <Label id="password">Password</Label>
            <InputTogglePassword control={control} name="password" />
          </Field>
          <Field>
            <Label id="confirmPassword">Confirm Password</Label>
            <InputTogglePassword control={control} name="confirmPassword" />
          </Field>
          <div className="sup-question">
            <span className="sup-question-black">
              You already have an account?
            </span>
            <Link to="/sign-in" className="sup-question-color">
              {' '}
              Sign In
            </Link>
          </div>
          <Button
            width="350px"
            style={{ marginTop: '12px', padding: '12px 16px' }}
            type="submit"
            isSubmitting={isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </StyledSignUpPage>
  );
};

export default SignUpPage;
