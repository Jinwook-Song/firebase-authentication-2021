import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { EMAIL_VALIDATION_CHECK } from '../types.d';
import { authService } from '../fbase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

type AuthInputs = {
  email: string;
  password: string;
  emailOnly: string;
};

enum AuthErrorType {
  'USER_EXIST' = 'auth/email-already-in-use',
  'USER_NOT_FOUND' = 'auth/user-not-found',
  'WRONG_PASSWORD' = 'auth/wrong-password',
  'TOO_MANY_REQUESTS' = 'auth/too-many-requests',
  'EXIST_DIFFERENT_CREDENTIAL' = 'auth/account-exists-with-different-credential',
}

type AuthErrorCode = {
  code: string;
};

function Auth() {
  const [authError, setAuthError] = useState<string>();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthInputs>({
    mode: 'onChange',
  });

  const onEmailAndPasswordLogin = () => {
    const { email, password } = getValues();
    createUserWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        // Signed in
        setAuthError('');
      })
      .catch(async (error) => {
        switch ((error as AuthErrorCode).code) {
          // 이미 사용중인 이메일 : log in
          case AuthErrorType.USER_EXIST:
            setAuthError('Account already in use');
            signInWithEmailAndPassword(authService, email, password).then(
              (userCredential) => {
                // Logged in
                setAuthError('');
              }
            );
            break;
          default:
            setAuthError('Unexpected Error');
        }
      });
  };

  const onEmailLogin = () => {
    console.log('email login');
  };

  return (
    <>
      <div>
        <h3>Email, Password로 로그인하기</h3>
        <form onSubmit={handleSubmit(onEmailAndPasswordLogin)}>
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
          {authError && <span>{authError}</span>}
        </form>
      </div>
      <div>
        <h3>Email 로그인하기</h3>
        <form onSubmit={handleSubmit(onEmailLogin)}>
          <input
            {...register('emailOnly', {
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
          {errors.emailOnly?.message && <div>{errors.emailOnly.message}</div>}
          <button disabled={isValid ? false : true}>Log In</button>
          {authError && <span>{authError}</span>}
        </form>
      </div>
    </>
  );
}

export default Auth;
