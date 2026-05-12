import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import TabHeader from './TabHeader';
import { styles } from '../../styles/styles';
import { COLORS } from '../../constants/theme';

const FONTS = [
  { key: null,                             label: 'Default'  },
  { key: 'PlayfairDisplay_700Bold_Italic', label: 'Playfair' },
  { key: 'Nunito_700Bold',                 label: 'Nunito'   },
  { key: 'DancingScript_700Bold',          label: 'Dancing'  },
];

export default function CustomiseTab({
  name, setName, pronouns, setPronouns,
  funFact, setFunFact, themeColour, setThemeColour,
  selectedFont, setSelectedFont,
}) {
  const pickColour = (hex) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setThemeColour(hex);
  };

  const pickFont = (key) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedFont(key);
  };

  return (
    <View>
      <TabHeader title="Customise your badge" />
      <Text style={[styles.fieldLabel, { marginTop: 2 }]}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your name"
        placeholderTextColor="#ccc"
      />
      <Text style={styles.fieldLabel}>Pronouns</Text>
      <TextInput
        style={styles.input}
        value={pronouns}
        onChangeText={setPronouns}
        placeholder="e.g. she/her"
        placeholderTextColor="#ccc"
      />
      <Text style={styles.fieldLabel}>Fun Fact</Text>
      <TextInput
        style={styles.input}
        value={funFact}
        onChangeText={setFunFact}
        placeholder="Something fun about you"
        placeholderTextColor="#ccc"
      />

      <Text style={styles.fieldLabel}>Badge Colour</Text>
      <View style={styles.colorRow}>
        {COLORS.map(c => (
          <TouchableOpacity
            key={c.hex}
            style={[
              styles.colorSwatch,
              { backgroundColor: c.hex },
              themeColour === c.hex && styles.colorSwatchSelected,
            ]}
            onPress={() => pickColour(c.hex)}
          >
            {themeColour === c.hex && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.colorName}>
        {COLORS.find(c => c.hex === themeColour)?.name}
      </Text>

      <Text style={styles.fieldLabel}>Name Font</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
        {FONTS.map(f => (
          <TouchableOpacity
            key={f.key}
            style={[
              styles.footerBtn,
              selectedFont === f.key && { backgroundColor: themeColour },
            ]}
            onPress={() => pickFont(f.key)}
          >
            <Text style={[
                { fontSize: 13, color: '#555' },
                f.key && { fontFamily: f.key },
                selectedFont === f.key && { color: 'white' },
                ]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}