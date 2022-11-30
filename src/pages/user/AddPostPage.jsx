import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Field from '~/components/form/field';
import { Input } from '~/components/form/input';
import Label from '~/components/form/label';
import Radio from '~/components/form/radio/Radio';
import { Select } from '~/components/form/select';

const AddPostPageStyled = styled.div`
  width: 100%;

  .addPostPage-header {
    display: block;
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 20px;
    font-family: ${props => props.theme.font.tertiary};
    color: ${props => props.theme.color.brown};
    text-shadow: 0 0 5px ${props => props.theme.color.skin};
  }
  .addPostPage-form {
    width: 100%;
    &__filed-wrap {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-rows: repeat(3, minmax(0, 1fr));
      gap: 36px;
    }
  }
`;

const AddPostPage = () => {
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
  return (
    <AddPostPageStyled>
      <span className="addPostPage-header">Add New Post</span>
      <form className="addPostPage-form">
        <div className="addPostPage-form__filed-wrap">
          <Field>
            <Label id="title">Title</Label>
            <Input control={control} name="title" type="secondary"></Input>
          </Field>
          <Field>
            <Label id="slug">Slug</Label>
            <Input control={control} name="slug" type="secondary"></Input>
          </Field>
          <Field>
            <Label id="status">Status</Label>
            <Radio
              name="gender"
              control={control}
              label="Gender"
              radios={['Male', 'Female', 'Other']}
            />
          </Field>
          <Field>
            <Label id="author">Author</Label>
            <Input control={control} name="author" type="secondary"></Input>
          </Field>
          <Field>
            <Label id="category">Category</Label>
            <Select
              name="category"
              control={control}
              setValue={setValue}
              setError={setError}
              defaultOption="Select one job"
              options={[
                'Front-end developer',
                'Back-end developer',
                'UI, UX designer',
              ]}
              type="secondary"
            ></Select>
          </Field>
        </div>
      </form>
    </AddPostPageStyled>
  );
};

export default AddPostPage;
