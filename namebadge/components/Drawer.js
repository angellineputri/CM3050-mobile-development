import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { TABS } from '../constants/theme';
import InfoTab from './tabs/InfoTab';
import CustomiseTab from './tabs/CustomiseTab';
import QRTab from './tabs/QRTab';
import TandCTab from './tabs/TandCTab';
import CreditsTab from './tabs/CreditsTab';

export default function Drawer({
  drawerAnim, drawerWidth, themeColour,
  activeTab, setActiveTab,
  name, setName, pronouns, setPronouns,
  funFact, setFunFact, setThemeColour,
  selectedFont, setSelectedFont,
  qrValue, setQrValue, qrLabel, setQrLabel,
  qrValue2, setQrValue2, qrLabel2, setQrLabel2,
  onSave, onPreview, onClose,
}) {
  const insets = useSafeAreaInsets();

  const drawerTranslateX = drawerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [drawerWidth, 0],
  });

  return (
    <>
      <TouchableOpacity
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        activeOpacity={1}
        onPress={onClose}
      />
      <Animated.View
        style={[
          styles.drawer,
          {
            width: drawerWidth,
            transform: [{ translateX: drawerTranslateX }],
            paddingRight: insets.right,
          },
        ]}
      >
        <View style={styles.tabSidebar}>
          {TABS.map(tab => {
            const active = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tabItem,
                  active && {
                    backgroundColor: 'white',
                    borderLeftWidth: 3,
                    borderLeftColor: themeColour,
                  },
                ]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[styles.tabIcon, active && { color: themeColour }]}>
                  {tab.icon}
                </Text>
                <Text style={[styles.tabLabel, active && { color: themeColour }]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.tabContent}>
          <ScrollView
            style={styles.tabInner}
            contentContainerStyle={{ paddingBottom: 8 }}
            showsVerticalScrollIndicator={false}
          >
            {activeTab === 'Info'      && <InfoTab />}
            {activeTab === 'Customise' && (
              <CustomiseTab
                name={name}               setName={setName}
                pronouns={pronouns}       setPronouns={setPronouns}
                funFact={funFact}         setFunFact={setFunFact}
                themeColour={themeColour} setThemeColour={setThemeColour}
                selectedFont={selectedFont} setSelectedFont={setSelectedFont}
              />
            )}
            {activeTab === 'QR' && (
              <QRTab
                themeColour={themeColour}
                qrValue={qrValue}   setQrValue={setQrValue}
                qrLabel={qrLabel}   setQrLabel={setQrLabel}
                qrValue2={qrValue2} setQrValue2={setQrValue2}
                qrLabel2={qrLabel2} setQrLabel2={setQrLabel2}
              />
            )}
            {activeTab === 'TandC'   && <TandCTab />}
            {activeTab === 'Credits' && <CreditsTab />}
          </ScrollView>

          <View style={styles.drawerFooter}>
            <Text style={styles.footerText}>© Angelline Putri · May 2025</Text>
            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.footerBtn} onPress={onSave}>
                <Text style={styles.footerBtnText}>Save as Image</Text>
                <Text style={styles.footerBtnSub}>saves to photos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.footerBtn, { backgroundColor: themeColour }]}
                onPress={onPreview}
              >
                <Text style={[styles.footerBtnText, { color: 'white' }]}>Preview</Text>
                <Text style={[styles.footerBtnSub, { color: 'rgba(255,255,255,0.7)' }]}>
                  hide UI
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </>
  );
}