import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
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
    color: theme.colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100')
    .required('Rating is required'),
  text: yup.string(),
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

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const review = await createReview(values);
    navigate(`/repositories/${review.repositoryId}`);
  };
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <View>
          <FormikTextInput
            name="ownerName"
            formik={formik}
            placeholder="Repository owner username"
          />
          <FormikTextInput
            name="repositoryName"
            formik={formik}
            placeholder="Repository name"
          />
          <FormikTextInput
            name="rating"
            formik={formik}
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
          />
          <FormikTextInput
            name="text"
            formik={formik}
            placeholder="Review"
            multiline
          />
          <Pressable style={styles.button} onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;