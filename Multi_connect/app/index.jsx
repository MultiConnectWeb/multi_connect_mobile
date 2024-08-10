import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import LandingPage from './landingPage/landingPage';

export default function App() {
  return (
    <View style={styles.container}>
      <LandingPage />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  }
});
