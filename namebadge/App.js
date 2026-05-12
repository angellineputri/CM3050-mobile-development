import { StatusBar } from 'expo-status-bar';
import { View, Animated, Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useRef } from 'react';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold_Italic } from '@expo-google-fonts/playfair-display';
import { Nunito_700Bold } from '@expo-google-fonts/nunito';
import { DancingScript_700Bold } from '@expo-google-fonts/dancing-script';

import Badge from './components/Badge';
import Drawer from './components/Drawer';

export default function App() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}

function Main() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold_Italic,
    Nunito_700Bold,
    DancingScript_700Bold,
  });

  const badgeRef = useRef(null);

  const [themeColour, setThemeColour]   = useState('#EDAEC0');
  const [name, setName]                 = useState('Angelline');
  const [pronouns, setPronouns]         = useState('she/her');
  const [funFact, setFunFact]           = useState('I like cats');
  const [selectedFont, setSelectedFont] = useState(null);
  const [qrValue, setQrValue]           = useState('');
  const [qrValue2, setQrValue2]         = useState('');
  const [qrLabel, setQrLabel]           = useState('');
  const [qrLabel2, setQrLabel2]         = useState('');
  const [qrModalOpen, setQrModalOpen]   = useState(false);
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [activeTab, setActiveTab]       = useState('Info');
  const [previewMode, setPreviewMode]   = useState(false);
  const [previewToast, setPreviewToast] = useState(false);
  const [saveToast, setSaveToast]       = useState({ visible: false, message: '', success: true });

  const drawerAnim = useRef(new Animated.Value(0)).current;
  const holdTimer  = useRef(null);

  const { width } = Dimensions.get('window');
  const drawerWidth = width * 0.75;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.spring(drawerAnim, {
      toValue: 1, useNativeDriver: true, tension: 65, friction: 11,
    }).start();
  };

  const closeDrawer = () => {
    Animated.spring(drawerAnim, {
      toValue: 0, useNativeDriver: true, tension: 65, friction: 11,
    }).start(() => setDrawerOpen(false));
  };

  const enterPreview = () => {
    closeDrawer();
    setTimeout(() => {
      setPreviewMode(true);
      setPreviewToast(true);
      setTimeout(() => setPreviewToast(false), 2800);
    }, 450);
  };

  const handleHoldStart = () => {
    holdTimer.current = setTimeout(() => setPreviewMode(false), 3000);
  };

  const handleHoldEnd = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
  };

  const showSaveToast = (message, success = true) => {
    setSaveToast({ visible: true, message, success });
    setTimeout(() => setSaveToast({ visible: false, message: '', success: true }), 3000);
  };

  const saveAsImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        showSaveToast('Permission denied — please allow photo access in settings.', false);
        return;
      }
      closeDrawer();
      setTimeout(async () => {
        try {
          const uri = await captureRef(badgeRef, { format: 'png', quality: 1 });
          await MediaLibrary.saveToLibraryAsync(uri);
          showSaveToast('Badge saved to your library!');
        } catch {
          showSaveToast('Something went wrong. Please try again.', false);
        }
      }, 600);
    } catch {
      showSaveToast('Something went wrong. Please try again.', false);
    }
  };

  const hasQR = qrValue && qrValue.length > 8 && qrValue !== 'https://';
  const hasQR2 = qrValue2 && qrValue2.length > 8 && qrValue2 !== 'https://';

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <Badge
        badgeRef={badgeRef}
        themeColour={themeColour}
        name={name}
        pronouns={pronouns}
        funFact={funFact}
        selectedFont={selectedFont}
        hasQR={hasQR}
        hasQR2={hasQR2}
        qrValue={qrValue}
        qrValue2={qrValue2}
        qrLabel={qrLabel}
        qrLabel2={qrLabel2}
        qrModalOpen={qrModalOpen}
        setQrModalOpen={setQrModalOpen}
        previewMode={previewMode}
        previewToast={previewToast}
        saveToast={saveToast}
        onEditPress={openDrawer}
        onHoldStart={handleHoldStart}
        onHoldEnd={handleHoldEnd}
      />

      {drawerOpen && (
        <Drawer
          drawerAnim={drawerAnim}
          drawerWidth={drawerWidth}
          themeColour={themeColour}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          name={name}               setName={setName}
          pronouns={pronouns}       setPronouns={setPronouns}
          funFact={funFact}         setFunFact={setFunFact}
          setThemeColour={setThemeColour}
          selectedFont={selectedFont} setSelectedFont={setSelectedFont}
          qrValue={qrValue}         setQrValue={setQrValue}
          qrValue2={qrValue2}       setQrValue2={setQrValue2}
          qrLabel={qrLabel}         setQrLabel={setQrLabel}
          qrLabel2={qrLabel2}       setQrLabel2={setQrLabel2}
          onSave={saveAsImage}
          onPreview={enterPreview}
          onClose={closeDrawer}
        />
      )}

      <StatusBar style="light" />
    </View>
  );
}