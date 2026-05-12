import React from 'react';
import { View, Text } from 'react-native';
import TabHeader from './TabHeader';
import { styles } from '../../styles/styles';

export default function CreditsTab() {
  return (
    <View>
      <TabHeader title="Credits & Attributions" />
      <Text style={styles.infoSubtitle}>Built with Expo and React Native.</Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>expo-screen-orientation — </Text>
        Used to lock the application display to landscape orientation.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>react-native-safe-area-context — </Text>
        Provides safe area insets to prevent content from being hidden behind device notches or the Dynamic Island.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>expo-status-bar — </Text>
        Used to control the appearance of the device status bar.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>expo-media-library — </Text>
        Used to request photo library permissions and save the badge image to the device.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>react-native-view-shot — </Text>
        Used to capture the badge view as a PNG image for saving.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>react-native-qrcode-svg — </Text>
        Used to generate and display QR codes on the badge.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>expo-haptics — </Text>
        Used to provide tactile feedback when selecting badge colours and fonts.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>expo-font & @expo-google-fonts — </Text>
        Used to load and apply custom Google Fonts to the badge name.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>React Native Animated API — </Text>
        Used to implement the slide-in drawer animation.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>React Native Core Components — </Text>
        Includes View, Text, TextInput, Pressable, and TouchableOpacity, which form the structure of the application.
      </Text>
    </View>
  );
}