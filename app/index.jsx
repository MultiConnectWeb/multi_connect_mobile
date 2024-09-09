import React, { useEffect, useState } from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LandingPage from './landingPage/landingPage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserHome from "./(tabTwo)/userHome";
import ServiceProviderHome from "./(tab)/serviceProviderHome";
import Kwaft from "./(tab)/kwaft";
import {Redirect} from "expo-router";
import AppScreen from "./appScreen";

export default function App() {
  const [token, setToken] = useState(null);
  const [authority, setAuthority] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenString= await AsyncStorage.getItem('token');
        setToken(tokenString)
        const storedAuthority = await AsyncStorage.getItem('authority');
        setAuthority(storedAuthority);
      } catch (error) {
        console.error('Failed to fetch data from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
        <View style={styles.container}>
          {isLoading &&
              <ActivityIndicator style={styles.loading} size="40px" color='green'/>
          }
        </View>
    );
  }
  if(token){
    if(authority === '[USER]') return <Redirect href={'/(tabTwo)/userHome'} />
    if(authority === '[SERVICE_PROVIDER]') return <Redirect href={'/(tab)/serviceProviderHome'} />
  }

  return (
      <View style={styles.container}>
        {token ? (
            authority === '[USER]' ? <UserHome /> : <ServiceProviderHome />
        ) : (
            <LandingPage />
        )}
        {/*<StatusBar style="auto" />*/}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
