import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Field from '~/components/field';
import Label from '~/components/label';
import { Input, InputTogglePassword } from '~/components/input';
import Button from '~/components/button';

const StyledSignUpPage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.white};
  height: 100vh;
  width: 100vw;

  .sup-dogtor-logo {
    display: block;
    width: 15%;
    min-width: 150px;
  }
  .sup-title {
    font-size: 36px;
    font-family: ${props => props.theme.font.secondary};
    letter-spacing: 0.7px;
    color: ${props => props.theme.color.brown};
    margin-bottom: 36px;
  }
  .sup-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
    width: 55%;
    min-width: 350px;
  }
`;

const schema = yup.object({
  fullname: yup.string().required('Required'),
  password: yup
    .string()
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  email: yup.string().email().required('required'),
});

const SignUpPage = () => {
  const { control, handleSubmit, setValue, setError, formState, reset } =
    useForm({
      resolver: yupResolver(schema),
      mode: 'all',
    });
  const { isSubmitting } = formState;
  const onSubmitHandler = data => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
        console.log(data);
        handleReset();
      }, 2000);
    });
  };
  const handleReset = () => {
    reset({
      fullname: '',
      password: '',
      email: '',
    });
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
            <Label id="fullname">Fullname</Label>
            <Input control={control} name="fullname"></Input>
          </Field>
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
            style={{ marginTop: '20px' }}
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
