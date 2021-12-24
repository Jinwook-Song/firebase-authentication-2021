import { useForm } from 'react-hook-form';
import { EMAIL_VALIDATION_CHECK } from '../types.d';
import { authService } from '../fbase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

type AuthInputs = {
  email: string;
  password: string;
};

function Auth() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthInputs>({
    mode: 'onChange',
  });

  const onSubmit = () => {
    const { email, password } = getValues();
    createUserWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log('create user', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`error code:${errorCode}`);
        console.log(`error message:${errorMessage}`);
        // ..
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required.',
          pattern: {
            value: EMAIL_VALIDATION_CHECK,
            message: 'Please enter a valid email.',
          },
        })}
        type='email'
        placeholder='Email'
        className='input'
      />
      {errors.email?.message && <div>{errors.email.message}</div>}
      <input
        {...register('password', {
          required: 'Password is required.',
          minLength: {
            value: 4,
            message: 'Password should contain more than 4 chars.',
          },
        })}
        type='password'
        placeholder='Password'
        className='input'
      />
      {errors.password?.message && <div>{errors.password.message}</div>}
      <button disabled={isValid ? false : true}>Log In</button>
    </form>
  );
}

export default Auth;
