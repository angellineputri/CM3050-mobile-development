import React from 'react';
import { View, Text } from 'react-native';
import TabHeader from './TabHeader';
import { styles } from '../../styles/styles';

export default function TandCTab() {
  return (
    <View>
      <TabHeader title="Terms & Conditions" />
      <Text style={styles.infoSubtitle}>Last updated: May 2025 · CM3050 Mobile Development</Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>1. Acceptance. </Text>
        By accessing or using this application, the user agrees to the terms stated on this page.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>2. Purpose. </Text>
        This application was created as part of an academic assignment. It is intended for educational and demonstration purposes only.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>3. Content. </Text>
        The developer reserves the right to update or change any content displayed in this application at any time without prior notice.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>4. Intellectual Property. </Text>
        All design, content, and code in this application are the original work of the developer unless otherwise stated in the Credits section.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>5. Limitation of Liability. </Text>
        The developer is not responsible for any issues that arise from the use of this application outside its intended academic context.
      </Text>
      <Text style={styles.infoItem}>
        <Text style={styles.bold}>6. Changes to Terms. </Text>
        These terms may be updated at any time. Continued use of the application means the user accepts any changes made.
      </Text>
    </View>
  );
}