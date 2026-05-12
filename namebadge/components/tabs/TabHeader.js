import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles/styles';

export default function TabHeader({ title }) {
  return (
    <View style={styles.tabHeader}>
      <Text style={styles.tabTitle}>{title}</Text>
      <View style={styles.tabDivider} />
    </View>
  );
}