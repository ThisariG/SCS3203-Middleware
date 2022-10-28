import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
// form
import { useForm ,useFormContext, Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// api
import { signUpUser } from '../../../api/queries';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { data: token, mutate: userSignUpMutation, isSuccess: userSignSuccess } = useMutation(signUpUser);

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('User name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role : Yup.string().required('Role is required'),
  });

  const defaultValues = {
    username: '',
    email: '',
    password: '',
    role:''
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
    // userSignUpMutation(data);
      navigate('/dashboard/index', { replace: true });

  };

  // useEffect(() => {
  //   if (userSignSuccess) {
  //     localStorage.setItem('ma_token', token);
  //     navigate('/dashboard/index', { replace: true });
  //   }
  // }, [userSignSuccess]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="username" label="User name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFSelect name="role" label="Role" options={['buyer','seller']} />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />


        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
