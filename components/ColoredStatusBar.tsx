import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

export type StatusBarProps = {
  backgroundColor: string
}

export const ColoredStatusBar = (props: StatusBarProps) => {
  const { backgroundColor } = props;
  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent barStyle="light-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: 44
  },
  image: {
    width: 500,
    height: 200
  }
});