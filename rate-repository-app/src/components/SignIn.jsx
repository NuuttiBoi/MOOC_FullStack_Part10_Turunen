import { useFormik } from 'formik';
import * as yup from 'yup';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import {useSignIn} from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import {useState} from 'react';


const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Enter username'),
  password: yup.string().required('Enter password'),
});

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    padding: 17,
    marginBottom: 5,
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
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
  },
});

export const SignInContainer = ({ onSubmit, errorMessage }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          formik.touched.username && formik.errors.username && styles.errorInput,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text color="error" style={styles.errorText}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password && styles.errorInput,
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text color="error" style={styles.errorText}>
          {formik.errors.password}
        </Text>
      )}
      {errorMessage && (
        <Text color="error" style={styles.errorText}>
          {errorMessage}
        </Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="white" fontWeight="bold" style={styles.buttonText}>
                    Sign in
        </Text>
      </Pressable>
    </View>
  );
};
const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [errorMessage, setErrorMessage] = useState(null);
  const onSubmit = async (values) => {
    try {
      setErrorMessage(null);
      await signIn(values);
      navigate('/');
    } catch (e) {
      setErrorMessage('wrong username or password');
      console.log(e);
    }
  };
  return <SignInContainer onSubmit={onSubmit} errorMessage={errorMessage} />;
};

export default SignIn;