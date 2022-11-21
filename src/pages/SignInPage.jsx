import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Field from '~/components/field';
import Label from '~/components/label';
import { Input, InputTogglePassword } from '~/components/input';
import Button from '~/components/button';
import { auth } from '~/firebase/firebase-config';
import { useAuth } from '~/contexts/authContext';

const StyledSignInPage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.white};
  height: 100vh;
  width: 100vw;

  .sup-dogtor-logo {
    display: block;
    width: 10%;
    min-width: 150px;
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
`;

const schema = yup.object({
  password: yup.string().required('Required'),
  email: yup.string().required('required'),
});

const SignInPage = () => {
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
      await signInWithEmailAndPassword(auth, data.email, data.password);
      reset({
        password: '',
        email: '',
      });
      // Navigate to home
      navigateTo('/');
      toast.success('Sign Up success !', {
        autoClose: 300,
        delay: 100,
        hideProgressBar: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <StyledSignInPage>
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
            <Label id="email">Email Address</Label>
            <Input control={control} name="email"></Input>
          </Field>
          <Field>
            <Label id="password">Password</Label>
            <InputTogglePassword control={control} name="password" />
          </Field>
          <Button
            width="350px"
            style={{ marginTop: '20px', padding: '12px 16px' }}
            type="submit"
            isSubmitting={isSubmitting}
          >
            Sign In
          </Button>
        </form>
      </div>
    </StyledSignInPage>
  );
};

export default SignInPage;
