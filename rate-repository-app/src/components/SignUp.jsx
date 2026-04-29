import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import theme from '../theme';
import useCreateUser from '../hooks/useCreateUser';
import {useSignIn} from '../hooks/useSignIn';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    padding: 14,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
  errorText: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
});

const FormikTextInput = ({ name, formik, ...props }) => {
  const error = formik.touched[name] && formik.errors[name];
  return (
    <>
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        value={formik.values[name]}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        {...props}
      />

      {error && (
        <Text color="error" style={styles.errorText}>
          {formik.errors[name]}
        </Text>
      )}
    </>
  );
};

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;
    await createUser({ username, password });
    await signIn({ username, password });
    navigate('/');
  };
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <View>
          <FormikTextInput
            name="username"
            formik={formik}
            placeholder="Username"
          />
          <FormikTextInput
            name="password"
            formik={formik}
            placeholder="Password"
            secureTextEntry
          />
          <FormikTextInput
            name="passwordConfirmation"
            formik={formik}
            placeholder="Password confirmation"
            secureTextEntry
          />
          <Pressable style={styles.button} onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;