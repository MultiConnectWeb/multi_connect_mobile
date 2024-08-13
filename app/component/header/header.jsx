import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = ({ image, name }) => {
  return (
    <View style={styles.header}>
      <View style={styles.container}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {

    marginBottom: 16,
    width: '90%',
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'green'

  },
  image: {
    width: '20%',
    height: '20%',
    borderRadius: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
});

export default Header;
