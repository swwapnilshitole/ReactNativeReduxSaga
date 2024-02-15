import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {API_URL} from '../../utils/api';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailErr, setIsEmailErr] = useState(false);
  const [isPasswordErr, setIsPasswordErr] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loginErr, setLoginErr] = useState(false);
  const navigation = useNavigation();

  const api = axios.create({
    baseURL: API_URL,
  });

  useEffect(() => {
    updateButtonState(email, password);
  }, []);

  initialState = {
    isSignIn: false,
  };

  const onChangeUsername = value => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);
    setIsEmailErr(!isValidEmail);
    setEmail(value);
    updateButtonState(value, password);
  };

  const onChangePassword = value => {
    const isValidPassword = value.length >= 8;
    setIsPasswordErr(!isValidPassword);
    setPassword(value);
    updateButtonState(email, value);
  };

  const updateButtonState = (emailValue, passwordValue) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    const isValidPassword = passwordValue.length >= 8;

    setIsDisabled(
      !(isValidEmail && isValidPassword) ||
        emailValue === '' ||
        passwordValue === '',
    );
  };
  const handleLogin = async () => {
    if (!isDisabled) {
      setIsPasswordErr(false);
      initialState['isSignIn'] = true;

      try {
        let data = {
          email: email,
          password: 'cityslicka',
        };
        const response = await api.post('login', data);
        navigation.navigate('Homescreen');
        return response.data;
      } catch (error) {
        setLoginErr(true);
        throw error;
      }
    }
  };
  return (
    <View style={[styles.container]}>
      <View style={styles.signInContainer}>
        <Text style={styles.signInTitle}>Login</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <Text style={styles.textUsername}>Username</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={value => onChangeUsername(value)}
              autoCapitalize="none"
              value={email}
            />
            {isEmailErr && (
              <View style={{alignItems: 'flex-start', top: 10}}>
                <Text style={{color: 'red'}}>
                  * Please enter valid username
                </Text>
              </View>
            )}
            <Text style={styles.textPassword}>Password</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={value => onChangePassword(value)}
              autoCapitalize="none"
              value={password}
              maxLength={10}
            />
            {isPasswordErr && (
              <View style={{alignItems: 'flex-start', top: 10}}>
                <Text style={{color: 'red'}}>
                  * Please enter valid password (min length 8)
                </Text>
              </View>
            )}
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={
                isDisabled ? styles.disableSignInButton : styles.signInButton
              }
              onPress={handleLogin}
              disabled={isDisabled}>
              <Text style={styles.textSignin}>Login</Text>
            </TouchableOpacity>
            {loginErr && (
              <View style={{alignItems: 'flex-start', top: 10}}>
                <Text style={{color: 'red'}}>
                  * Please enter valid username or password.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'gray',
    borderColor: '#fff',
  },
  textInput: {
    width: '100%',
    backgroundColor: 'gray',
    height: '25%',
    borderRadius: 10,
    top: 5,
    padding: 10,
    paddingTop: 10,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInTitle: {
    fontSize: 27,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: '#085B70',
    justifyContent: 'center',
    width: '95%',
    height: '40%',
    borderRadius: 10,
    alignItems: 'center',
  },
  disableSignInButton: {
    backgroundColor: '#5B8088',
    justifyContent: 'center',
    width: '95%',
    height: '40%',
    borderRadius: 10,
    alignItems: 'center',
  },
  iconStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  inputContainer: {
    backgroundColor: '#fff',
    height: '65%',
    width: '90%',
    borderRadius: 10,
  },
  inputSubContainer: {
    padding: 10,
  },
  textUsername: {
    fontWeight: '600',
    color: '#000',
  },
  textPassword: {
    marginTop: 20,
    fontWeight: '600',
    color: '#000',
  },
  textSignin: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
});
export default Login;
