import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { styles } from '../styles/styles';

export default function Badge({
  badgeRef, themeColour, name, pronouns, funFact,
  selectedFont,
  hasQR, hasQR2, qrValue, qrValue2, qrLabel, qrLabel2,
  qrModalOpen, setQrModalOpen,
  previewMode, previewToast, saveToast,
  onEditPress, onHoldStart, onHoldEnd,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        ref={badgeRef}
        style={[styles.container, { backgroundColor: themeColour }]}
        onPressIn={previewMode ? onHoldStart : undefined}
        onPressOut={previewMode ? onHoldEnd : undefined}
      >
        <SafeAreaView style={styles.safeInner}>
          <Text style={styles.welcomeText}>Hello!</Text>
          <Text style={styles.subtitleText}>My name is</Text>
          <View style={styles.innerContainer}>
            <Text style={[styles.nameText, { color: themeColour, fontFamily: selectedFont }]}>{name}</Text>
            <Text style={styles.pronounText}>{pronouns}</Text>
            {funFact ? <Text style={styles.funFactText}>{funFact}</Text> : null}
          </View>

          {!previewMode && (
            <View style={{
              position: 'absolute',
              top: insets.top + 20,
              right: insets.right + 20,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
              {hasQR && (
                <TouchableOpacity
                  style={[styles.editButton, { position: 'relative' }]}
                  onPress={() => setQrModalOpen(true)}
                >
                  <Text style={styles.editButtonText}>▣ QR</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.editButton, { position: 'relative' }]}
                onPress={onEditPress}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          {previewToast && (
            <View style={styles.toast}>
              <Text style={styles.toastText}>
                Preview mode — hold 3 seconds anywhere to exit
              </Text>
            </View>
          )}

          {saveToast.visible && (
            <View style={[styles.toast, !saveToast.success && styles.toastError]}>
              <Text style={styles.toastText}>{saveToast.message}</Text>
            </View>
          )}
        </SafeAreaView>
      </Pressable>

      {qrModalOpen && (
        <>
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
            activeOpacity={1}
            onPress={() => setQrModalOpen(false)}
          />
          <View style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '10%',
            backgroundColor: 'white',
            borderRadius: 20,
            flexDirection: 'row',
            gap: 60,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 20,
          }}>
            {hasQR && (
              <View style={{ alignItems: 'center' }}>
                <QRCode value={String(qrValue)} size={144} color={themeColour} backgroundColor="white" />
                <Text style={{ marginTop: 8, fontSize: 13, color: '#555', fontWeight: '600' }}>
                  {qrLabel || 'QR Code'}
                </Text>
              </View>
            )}
            {hasQR2 && (
              <View style={{ alignItems: 'center' }}>
                <QRCode value={String(qrValue2)} size={144} color={themeColour} backgroundColor="white" />
                <Text style={{ marginTop: 8, fontSize: 13, color: '#555', fontWeight: '600' }}>
                  {qrLabel2 || 'QR Code 2'}
                </Text>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
}