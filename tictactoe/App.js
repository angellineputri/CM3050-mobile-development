import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>

        <Text style={styles.round}>ROUND 3</Text>
        <Text style={styles.title}>TIC TAC TOE</Text>

        <Text style={styles.winner}>O WINS!</Text>

        <View style={styles.grid}>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.oText}>O</Text></View>
            <View style={styles.cell}><Text style={styles.oText}>O</Text></View>
            <View style={[styles.cell, styles.cellNoRight]}><Text style={styles.xText}>X</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.xText}>X</Text></View>
            <View style={styles.cell}><Text style={styles.oText}>O</Text></View>
            <View style={[styles.cell, styles.cellNoRight]}><Text style={styles.oText}>O</Text></View>
          </View>
          <View style={styles.row}>
            <View style={[styles.cell, styles.cellNoBottom]}><Text style={styles.xText}>X</Text></View>
            <View style={[styles.cell, styles.cellNoBottom]}><Text style={styles.xText}>X</Text></View>
            <View style={[styles.cell, styles.cellNoRight, styles.cellNoBottom]}><Text style={styles.oText}>O</Text></View>
          </View>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreX}>X: 2</Text>
          <Text style={styles.scoreDivider}>|</Text>
          <Text style={styles.scoreO}>O: 1</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Text style={styles.resetText}>RESET</Text>
          </TouchableOpacity>
          <View style={styles.buttonDivider}/>
          <TouchableOpacity>
            <Text style={styles.newGameText}>NEW GAME</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.roundSelector}>
          <TouchableOpacity>
            <Text style={styles.arrowText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.roundSelectorLabel}>3 ROUNDS</Text>
          <TouchableOpacity>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262745',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  round: {
    fontSize: width * 0.035,
    fontWeight: '600',
    color: '#a78bfa',
    letterSpacing: width * 0.008,
    marginBottom: height * 0.01,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: width * 0.015,
    marginBottom: height * 0.03,
  },
  grid: {
    width: '70%',
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderRightWidth: width * 0.005,
    borderBottomWidth: width * 0.005,
    borderColor: '#646699',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellNoRight: {
    borderRightWidth: 0,
  },
  cellNoBottom: {
    borderBottomWidth: 0,
  },
  xText: {
    fontSize: width * 0.09,
    fontWeight: '800',
    color: '#ffffff',
    textShadowColor: '#38bdf8',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  oText: {
    fontSize: width * 0.09,
    fontWeight: '800',
    color: '#ffffff',
    textShadowColor: '#f472b6',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  winner: {
    marginBottom: height * 0.03,
    fontSize: width * 0.06,
    fontWeight: '900',
    color: '#f472b6',
    letterSpacing: width * 0.01,
  },
  scoreContainer: {
    flexDirection: 'row',
    marginTop: height * 0.02,
    alignItems: 'center',
    gap: width * 0.06,
  },
  scoreX: {
    fontSize: width * 0.05,
    fontWeight: '800',
    color: '#38bdf8',
  },
  scoreDivider: {
    fontSize: width * 0.05,
    color: '#646699',
    fontWeight: '200',
  },
  scoreO: {
    fontSize: width * 0.05,
    fontWeight: '800',
    color: '#f472b6',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: height * 0.04,
    alignItems: 'center',
    gap: width * 0.06,
  },
  buttonDivider: {
    width: width * 0.003,
    height: height * 0.025,
    backgroundColor: '#3b3a6e',
  },
  resetText: {
    fontSize: width * 0.035,
    fontWeight: '400',
    color: '#646699',
    letterSpacing: width * 0.008,
    borderBottomWidth: width * 0.003,
    borderBottomColor: '#646699',
    paddingBottom: height * 0.003,
  },
  newGameText: {
    fontSize: width * 0.035,
    fontWeight: '600',
    color: '#a78bfa',
    letterSpacing: width * 0.008,
    borderBottomWidth: width * 0.003,
    borderBottomColor: '#a78bfa',
    paddingBottom: height * 0.003,
  },
  roundSelector: {
    flexDirection: 'row',
    marginTop: height * 0.03,
    alignItems: 'center',
    gap: width * 0.05,
  },
  roundSelectorLabel: {
    fontSize: width * 0.03,
    fontWeight: '600',
    color: '#646699',
    letterSpacing: width * 0.006,
  },
  arrowText: {
    fontSize: width * 0.05,
    color: '#646699',
    fontWeight: '300',
  },
});