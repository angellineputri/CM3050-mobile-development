import React from 'react';
import { View, Text } from 'react-native';
import TabHeader from './TabHeader';
import { styles } from '../../styles/styles';

export default function InfoTab() {
  return (
    <View>
      <TabHeader title="How to use this app" />
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>Edit button</Text>
        {' '}— tap the Edit button (top right) to open this menu.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>Customise</Text>
        {' '}— change your name, pronouns, fun fact, badge colour, and name font.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>QR Codes</Text>
        {' '}— add up to 2 QR codes linking to any URL. Tap the QR button on the badge to display them.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>Preview</Text>
        {' '}— hides the UI so the badge is fully visible.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>Exit preview</Text>
        {' '}— hold anywhere on screen for 3 seconds.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>Save as Image</Text>
        {' '}— closes this menu and saves the badge as a photo to your device.
      </Text>
    </View>
  );
}