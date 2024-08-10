import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Hero = ({ textContent, imageUrl }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {textContent}
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#60A5FA',
    padding: 16,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  textContainer: {
    width: '60%',
  },
  imageContainer: {
    height: '40vh',
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Hero;
