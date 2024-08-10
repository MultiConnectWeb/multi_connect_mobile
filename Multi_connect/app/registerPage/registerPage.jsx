import { StyleSheet, Text, View, Image, Pressable , TouchableOpacity } from 'react-native';
import React from 'react';
import image from '../../assets/images/Frame 10590.png';
import image1 from '../../assets/images/Frame 10606.png';
import { useRouter } from "expo-router";
const  route = useRouter()
const Register = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>
          Sign up to get premium service from Kwafters at a low rate and enjoy exclusive offers as a Kwafters
        </Text>
        <View style={styles.optionsContainer}>
          <View style={styles.option}>
            <Image source={image} style={styles.image} />
            <Text style={styles.optionText}>Sign Up As a Client</Text>
          </View>
          <View style={styles.option}>
            <Image source={image1} style={styles.image} />
            <Text style={styles.optionText}>Sign Up As a Service Provider</Text>
          </View>
        </View>
        <View style={styles.orContainer}>
          <View style={styles.orLine}></View>
          <Text style={styles.orText}>Or</Text>
          <View style={styles.orLine}></View>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>route.push("login/loginPage")}>
          <Text style={styles.buttonText}>  Login </Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mainContent: {
    alignItems: 'center',
    width: '90%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 50,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  option: {
    alignItems: 'center',
    width: '45%',
    backgroundColor: 'rgb(231,251,200)',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 35,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
  },
  orText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  button: {
    width: "95%",
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
     // Set desired width
    height: 50, // Set desired height
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

});

