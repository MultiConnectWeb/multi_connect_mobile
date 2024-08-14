import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
 import {  signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';

import { useRouter } from 'expo-router';
import {auth} from "../lib/firebase";
import axios from "axios";
import UseUserStore from "../lib/userStore";

const Login = () => {
  const {fetchUserInfo} = UseUserStore()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const route = useRouter();
  let response = null;

  useEffect(() => {
     const unSub = onAuthStateChanged(auth, (user) => {
       fetchUserInfo(user?.uid);
    });

     return () => {
       unSub();
     };
   }, [fetchUserInfo]);

  const handleChatLogin = async () => {
        // setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err);
            Alert.alert('Error', err.message);
        } finally {
            // setLoading(false);
        }
    };
  const authenticate = async ()=>{
    try {
      response = await axios.post(' https://multi-connect-latest-ei6f.onrender.com/api/V1/auth', {
        email: email.trim(),
        password: password,
      });
      if(!response.status){
        Alert.alert('Error', response.data.error);
        return;
      }

      console.log('Registration response:', response.data);
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data : err.message);
    } finally {

    }
  }

  const handleLogin = () => {
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {

      Alert.alert('Success', 'Logged In Successfully');
      handleChatLogin().then()
      authenticate().then()
      route.push('user.dashboard');
    }
  };

  const handleForgotPassword = () => {
    route.push('forgetPassword/ForgetPassword');
  };

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
        <Text style={styles.subHeader}>
          Welcome back, login to continue enjoying
          professional services at a lower cost.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
              placeholder='Enter email'
              placeholderTextColor="black"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              onBlur={() => !email && emailError}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          <TextInput
              placeholder='Enter password'
              placeholderTextColor="black"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              onBlur={() => !password && passwordError}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>
        <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgotten Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.separator} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.separator} />
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={()=> route.push('registerPage/registerPage')}>
          <Text style={styles.signUpButtonText}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
  header: {
  fontSize: 30,
  fontWeight: 'bold',
  marginBottom: 10,
},
  subHeader: {
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 20,
},
  inputContainer: {
  width: '100%',
  marginBottom: 20,
  gap: 6,
},
  input: {
  height: 50,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
  marginBottom: 5,
},
  errorText: {
  color: 'red',
  fontSize: 12,
  marginBottom: 10,
},
  forgotPassword: {
  marginBottom: 20,
},
  forgotPasswordText: {
  color: 'blue',
},
  loginButton: {
  width: "95%",
  backgroundColor: 'green',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  marginBottom: 20,
},
  loginButtonText: {
  alignSelf: "center",
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
  orContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
},
  separator: {
  flex: 1,
  height: 1,
  backgroundColor: '#ccc',
},
  orText: {
  marginHorizontal: 10,
  fontSize: 16,
},
  signUpButton: {
  backgroundColor: 'rgb(229,255,270)',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  width: "95%",
},
  signUpButtonText: {
  color: 'black',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 6,
  alignSelf: "center",
},
});

export default Login;
