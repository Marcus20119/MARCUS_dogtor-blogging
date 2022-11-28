import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import Field from '~/components/field';
import Label from '~/components/label';
import { Input, InputTogglePassword } from '~/components/input';
import Button from '~/components/button';
import { auth } from '~/firebase/firebase-config';

const StyledSignInPage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.white};
  height: 100vh;
  width: 100vw;

  .sip-dogtor-logo {
    display: block;
    width: 10%;
    min-width: 150px;
  }
  .sip-title {
    font-size: 32px;
    font-family: ${props => props.theme.font.secondary};
    letter-spacing: 0.7px;
    color: ${props => props.theme.color.brown};
    margin-bottom: 28px;
  }
  .sip-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
    width: 70%;
    min-width: 350px;
    margin-bottom: 28px;
  }
  .sip-question {
    font-weight: 500;
    font-size: 15px;
    &-color {
      color: #f46e45;
    }
    &-color:hover {
      opacity: 0.8;
    }
  }
  .sip-error {
    font-size: 14px;
    color: red;
    font-weight: 500;
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
      const cred = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      reset({
        password: '',
        email: '',
      });
      // Navigate to home
      navigateTo('/home');
      toast.success(`Welcome back, ${cred.user.displayName.split(' ')[0]} !`, {
        autoClose: 1000,
        delay: 300,
        hideProgressBar: true,
      });
    } catch (err) {
      console.log(err);
      reset({
        password: '',
        email: '',
      });
      toast.error(
        `Can not sign in because of Error: ${err.code.split('/')[1]}`,
        {
          autoClose: 2000,
          delay: 300,
        }
      );
    }
  };
  return (
    <StyledSignInPage>
      <div className="small-container">
        <img
          className="sip-dogtor-logo"
          src="/imgs/dogtor-logo.png"
          alt="dogtor-logo"
        />
        <span className="sip-title">Dogtor blogging</span>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="sip-form"
          // autoComplete="off"
        >
          <Field>
            <Label id="email">Email Address</Label>
            <Input control={control} name="email"></Input>
          </Field>
          <Field>
            <Label id="password">Password</Label>
            <InputTogglePassword control={control} name="password" />
          </Field>
          <div className="sip-question">
            <span className="sip-question-black">
              You have not had an account?
            </span>
            <Link to="/sign-up" className="sip-question-color">
              {' '}
              Register an account
            </Link>
          </div>
          <Button
            width="350px"
            style={{ marginTop: '12px', padding: '12px 16px' }}
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
