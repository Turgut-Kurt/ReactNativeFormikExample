import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
const App = () => {
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Lütfen geçerli e-mail girin.')
      .required('E-mail adresi gerekli.'),
    password: yup
      .string()
      .min(8, ({min}) => `Şifre ${min} karakterden az olamaz.`)
      .required('Şifre gerekli.'),
  });
  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{email: '', password: ''}}
      onSubmit={values => console.log(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors, isValid}) => (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TextInput
            name="email"
            placeholder="E-mail"
            style={[
              styles.textInput,
              values.email === ''
                ? styles.textInput
                : errors.email
                ? styles.textInputExStyle1
                : styles.textInputExStyle2,
            ]}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
          />
          {errors.email && (
            <Text style={styles.ErrorTextStyle}>{errors.email}</Text>
          )}
          <TextInput
            name="password"
            placeholder="Şifre"
            style={[
              styles.textInput,
              values.password === ''
                ? styles.textInput
                : errors.password
                ? styles.textInputExStyle1
                : styles.textInputExStyle2,
            ]}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
          />
          {errors.password && (
            <Text style={styles.ErrorTextStyle}>{errors.password}</Text>
          )}
          <TouchableOpacity
            style={[
              styles.ButtonStyle,
              isValid ? {backgroundColor: 'green'} : {backgroundColor: 'gray'},
            ]}
            onPress={handleSubmit}
            disabled={!isValid}>
            <Text style={styles.ButtonTextStyle}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  loginContainer: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
  },
  textInput: {
    height: 40,
    marginVertical: 15,
    paddingLeft: 15,
    alignSelf: 'center',
    width: '88%',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
  },
  textInputExStyle1: {borderColor: 'red'},
  textInputExStyle2: {borderColor: 'green'},
  ErrorTextStyle: {
    width: '82%',
    alignSelf: 'center',
    fontSize: 10,
    color: 'red',
  },
  ButtonStyle: {
    height: 40,
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'gray',
    borderRadius: 10,
    marginVertical: 15,
  },
  ButtonExStyle: {
    height: 40,
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'blue',
    borderRadius: 10,
    marginVertical: 10,
  },
  ButtonTextStyle: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});
export default App;
