import React from 'react';
import { View, Text, TextInput } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import TabHeader from './TabHeader';
import { styles } from '../../styles/styles';

export default function QRTab({
  themeColour,
  qrValue, setQrValue, qrLabel, setQrLabel,
  qrValue2, setQrValue2, qrLabel2, setQrLabel2,
}) {
  const hasQR1 = qrValue && qrValue.length > 8 && qrValue !== 'https://';
  const hasQR2 = qrValue2 && qrValue2.length > 8 && qrValue2 !== 'https://';

  return (
    <View>
      <TabHeader title="QR Codes" />
      <View style={{ flexDirection: 'row', gap: 12 }}>

        {/* Inputs */}
        <View style={{ flex: 1 }}>
          <Text style={[styles.fieldLabel, { marginTop: 2 }]}>QR 1 — Label</Text>
          <TextInput
            style={styles.input}
            value={qrLabel}
            onChangeText={setQrLabel}
            placeholder="e.g. LinkedIn"
            placeholderTextColor="#ccc"
          />
          <Text style={styles.fieldLabel}>QR 1 — URL</Text>
          <TextInput
            style={styles.input}
            value={qrValue}
            onChangeText={setQrValue}
            placeholder="https://yourlink.com"
            placeholderTextColor="#ccc"
            autoCapitalize="none"
            keyboardType="url"
          />
          <Text style={[styles.fieldLabel, { marginTop: 10 }]}>QR 2 — Label (optional)</Text>
          <TextInput
            style={styles.input}
            value={qrLabel2}
            onChangeText={setQrLabel2}
            placeholder="e.g. Instagram"
            placeholderTextColor="#ccc"
          />
          <Text style={styles.fieldLabel}>QR 2 — URL (optional)</Text>
          <TextInput
            style={styles.input}
            value={qrValue2}
            onChangeText={setQrValue2}
            placeholder="https://yourlink.com"
            placeholderTextColor="#ccc"
            autoCapitalize="none"
            keyboardType="url"
          />
        </View>

        {/* QR Previews */}
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 12 }}>
          {hasQR1 ? (
            <View style={{ alignItems: 'center' }}>
              <QRCode value={qrValue} size={70} color={themeColour} backgroundColor="white" />
              <Text style={[styles.infoSubtitle, { marginTop: 3 }]}>{qrLabel || 'QR 1'}</Text>
            </View>
          ) : (
            <View style={{
              width: 70, height: 70, borderRadius: 8,
              backgroundColor: '#f4f4f4', justifyContent: 'center', alignItems: 'center',
            }}>
              <Text style={{ fontSize: 20, color: '#ddd' }}>▣</Text>
            </View>
          )}
          {hasQR2 ? (
            <View style={{ alignItems: 'center' }}>
              <QRCode value={qrValue2} size={70} color={themeColour} backgroundColor="white" />
              <Text style={[styles.infoSubtitle, { marginTop: 3 }]}>{qrLabel2 || 'QR 2'}</Text>
            </View>
          ) : (
            <View style={{
              width: 70, height: 70, borderRadius: 8,
              backgroundColor: '#f4f4f4', justifyContent: 'center', alignItems: 'center',
            }}>
              <Text style={{ fontSize: 20, color: '#ddd' }}>▣</Text>
            </View>
          )}
        </View>

      </View>
    </View>
  );
}