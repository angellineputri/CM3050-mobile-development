import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  safeInner: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  welcomeText: {
    fontSize: 72, textTransform: 'uppercase', fontWeight: 'bold',
    color: 'white', letterSpacing: 4,
  },
  subtitleText: {
    fontSize: 26, textTransform: 'uppercase', fontWeight: 'bold',
    color: 'white', marginBottom: 14, letterSpacing: 2,
  },
  innerContainer: {
    width: '78%', height: '48%', backgroundColor: 'white', borderRadius: 15,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 8,
  },
  nameText:    { fontSize: 52, fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center' },
  pronounText: { fontSize: 15, color: '#999', fontStyle: 'italic', marginTop: 4 },
  funFactText: { fontSize: 13, color: '#aaa', marginTop: 6, textAlign: 'center' },

  editButton: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
  },
  editButtonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },

  toast: {
    position: 'absolute', bottom: 24, alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20,
  },
  toastError: { backgroundColor: 'rgba(180,50,50,0.85)' },
  toastText:  { color: 'white', fontSize: 13 },

  drawer: {
    position: 'absolute', top: 0, right: 0, bottom: 0,
    backgroundColor: 'white', flexDirection: 'row',
    shadowColor: '#000', shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.12, shadowRadius: 12, elevation: 20,
  },

  tabSidebar: {
    width: 68, backgroundColor: '#f9f9f9', paddingTop: 24,
    alignItems: 'center', borderRightWidth: 1, borderRightColor: '#f0f0f0',
  },
  tabItem:  { width: '100%', paddingVertical: 14, alignItems: 'center', marginBottom: 2 },
  tabIcon:  { fontSize: 18, color: '#ccc' },
  tabLabel: { fontSize: 9, color: '#bbb', marginTop: 4, letterSpacing: 0.5 },

  tabContent: {
    flex: 1, paddingHorizontal: 18, paddingTop: 18, justifyContent: 'space-between',
  },
  tabInner:   { flex: 1 },
  tabHeader:  { marginBottom: 14 },
  tabTitle:   { fontSize: 20, fontWeight: 'bold', color: '#222' },
  tabDivider: { marginTop: 8, height: 1.5, backgroundColor: '#f0f0f0', borderRadius: 1 },

  infoItem:     { fontSize: 12, color: '#555', marginBottom: 9, lineHeight: 18 },
  infoSubtitle: { fontSize: 10, color: '#bbb', marginBottom: 12, fontStyle: 'italic', letterSpacing: 0.3 },
  bold:         { fontWeight: 'bold', color: '#333' },

  fieldLabel: {
    fontSize: 10, color: '#aaa', textTransform: 'uppercase',
    letterSpacing: 1, marginBottom: 4, marginTop: 10,
  },
  input: {
    borderWidth: 1, borderColor: '#ececec', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6,
    fontSize: 14, color: '#333', backgroundColor: '#fafafa',
  },
  colorRow:            { flexDirection: 'row', marginTop: 10, gap: 10 },
  colorSwatch:         { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  colorSwatchSelected: { borderWidth: 3, borderColor: '#333' },
  checkmark:           { color: 'white', fontWeight: 'bold', fontSize: 13 },
  colorName:           { fontSize: 11, color: '#bbb', marginTop: 6, fontStyle: 'italic' },

  drawerFooter: {
    borderTopWidth: 1, borderTopColor: '#f0f0f0',
    paddingVertical: 10, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center',
  },
  footerText:    { fontSize: 10, color: '#ccc' },
  footerButtons: { flexDirection: 'row', gap: 8 },
  footerBtn: {
    backgroundColor: '#f4f4f4', paddingHorizontal: 14,
    paddingVertical: 6, borderRadius: 12, alignItems: 'center',
  },
  footerBtnText: { fontSize: 12, color: '#555', fontWeight: '600' },
  footerBtnSub:  { fontSize: 9, color: '#bbb', marginTop: 1 },
});