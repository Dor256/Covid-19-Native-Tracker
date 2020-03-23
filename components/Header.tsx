import React from 'react';
import { View, StyleSheet, Image } from 'react-native';


export const Header = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.image} source={require('../images/covid.jpg')} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 260
  },
  image: {
    width: 450,
    height: 260,
  }
});