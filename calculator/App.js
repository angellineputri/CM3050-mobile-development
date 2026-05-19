import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StatusBar, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function App() {
  const [tokens, setTokens] = useState([]);
  const [current, setCurrent] = useState('0');
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [lastOperator, setLastOperator] = useState(null);
  const [history, setHistory] = useState('');
  const [justEvaled, setJustEvaled] = useState(false);
  const [hasInput, setHasInput] = useState(false);
  const [lockedFontSize, setLockedFontSize] = useState(null);
  const [isScientific, setIsScientific] = useState(false);
  const [angleMode, setAngleMode] = useState('deg');
  const [memory, setMemory] = useState(0);
  const [is2nd, setIs2nd] = useState(false);
  const [parenDepth, setParenDepth] = useState(0);
  const [justClosedParen, setJustClosedParen] = useState(false);
  const historyScrollRef = useRef(null);
  const liveScrollRef = useRef(null);

  const margin = screenWidth * 0.012;
  const basicBtnWidth = (screenWidth - margin * 2 * 4 - margin * 2) / 4;
  const sciBtnWidth = (screenWidth - margin * 2 * 6 - margin * 2) / 6;
  const availableHeight = screenHeight * 0.6;
  const basicBtnHeight = isScientific
    ? Math.min(basicBtnWidth, (availableHeight / 10) - margin * 2)
    : basicBtnWidth;
  const sciBtnHeight = basicBtnHeight;
  const sciBtnW = sciBtnWidth;
  const resultFontSize = screenWidth * 0.15;

  function toRad(x) {
    return angleMode === 'deg' ? (x * Math.PI) / 180 : x;
  }

  function evaluate(toks) {
    const arr = [];
    for (const t of toks) {
      if (t === '(' || t === ')' || ['+', '-', '×', '÷', '^'].includes(t)) arr.push(t);
      else arr.push(parseFloat(t));
    }
    let i = 0;

    function parseExpr() {
      let left = parseTerm();
      while (i < arr.length && (arr[i] === '+' || arr[i] === '-')) {
        const op = arr[i++];
        const right = parseTerm();
        if (typeof left === 'string' || typeof right === 'string') return left;
        left = op === '+' ? left + right : left - right;
      }
      return left;
    }

    function parseTerm() {
      let left = parsePower();
      while (i < arr.length && (arr[i] === '×' || arr[i] === '÷')) {
        const op = arr[i++];
        const right = parsePower();
        if (typeof left === 'string' || typeof right === 'string') return left;
        if (op === '÷') {
          if (right === 0 && left === 0) return 'Indeterminate';
          if (right === 0) return 'Undefined';
          left = left / right;
        } else {
          left = left * right;
        }
      }
      return left;
    }

    function parsePower() {
      let base = parseFactor();
      if (i < arr.length && arr[i] === '^') {
        i++;
        const exp = parsePower();
        if (typeof base === 'string' || typeof exp === 'string') return base;
        return Math.pow(base, exp);
      }
      return base;
    }

    function parseFactor() {
      if (arr[i] === '(') {
        i++;
        const val = parseExpr();
        if (arr[i] === ')') i++;
        return val;
      }
      if (arr[i] === '-') {
        i++;
        const val = parseFactor();
        if (typeof val === 'string') return val;
        return -val;
      }
      return arr[i++];
    }

    return parseExpr();
  }

  function formatResult(val) {
    if (val === 'Indeterminate' || val === 'Undefined' || val === 'Error') return val;
    const num = parseFloat(val);
    if (isNaN(num)) return 'Error';
    if (!isFinite(num)) return 'Undefined';
    const abs = Math.abs(num);
    if ((abs !== 0 && abs < 0.000001) || abs >= 1e15) {
      return num.toExponential(8)
        .replace('e+', 'e')
        .replace(/e(-?)0*(\d+)/, 'e$1$2')
        .replace(/\.?0+(e)/, '$1');
    }
    return parseFloat(num.toPrecision(10)).toString();
  }

  function getDisplayed() {
    if (justEvaled || tokens.length === 0) return formatResult(current);
    return [...tokens, readyToReplace ? '' : current].filter(Boolean).join(' ');
  }

  function calcFontSize(text) {
    const len = String(text).length;
    if (len > 14) return resultFontSize * 0.45;
    if (len > 11) return resultFontSize * 0.55;
    if (len > 9)  return resultFontSize * 0.65;
    if (len > 7)  return resultFontSize * 0.8;
    return resultFontSize;
  }

  function getResultFontSize() {
    if (!justEvaled && tokens.length > 0) return lockedFontSize ?? resultFontSize;
    const fs = calcFontSize(getDisplayed());
    if (lockedFontSize !== null && fs > lockedFontSize) return lockedFontSize;
    return fs;
  }

  function applyScientificFn(fn, val) {
    const num = parseFloat(val);
    switch (fn) {
      case 'sin':   return Math.sin(toRad(num));
      case 'cos':   return Math.cos(toRad(num));
      case 'tan':   return Math.tan(toRad(num));
      case 'asin':  return angleMode === 'deg' ? Math.asin(num) * 180 / Math.PI : Math.asin(num);
      case 'acos':  return angleMode === 'deg' ? Math.acos(num) * 180 / Math.PI : Math.acos(num);
      case 'atan':  return angleMode === 'deg' ? Math.atan(num) * 180 / Math.PI : Math.atan(num);
      case 'sinh':  return Math.sinh(num);
      case 'cosh':  return Math.cosh(num);
      case 'tanh':  return Math.tanh(num);
      case 'asinh': return Math.asinh(num);
      case 'acosh': return Math.acosh(num);
      case 'atanh': return Math.atanh(num);
      case 'ln':    return num <= 0 ? 'Error' : Math.log(num);
      case 'log':   return num <= 0 ? 'Error' : Math.log10(num);
      case 'sqrt':  return num < 0 ? 'Error' : Math.sqrt(num);
      case 'cbrt':  return Math.cbrt(num);
      case '1/x':   return num === 0 ? 'Undefined' : 1 / num;
      case 'x²':    return num * num;
      case 'x³':    return num * num * num;
      case 'eˣ':    return Math.exp(num);
      case '10ˣ':   return Math.pow(10, num);
      case '2ˣ':    return Math.pow(2, num);
      case 'x!': {
        if (num < 0 || !Number.isInteger(num)) return 'Error';
        let f = 1;
        for (let k = 2; k <= num; k++) f *= k;
        return f;
      }
      default: return num;
    }
  }

  function fullReset() {
    setTokens([]); setHistory(''); setJustEvaled(false);
    setLastOperator(null); setLockedFontSize(null);
    setParenDepth(0); setJustClosedParen(false);
  }

  function buttonPressed(value) {
    if (!isNaN(value) || value === '.') {
      if (value === '.' && current.includes('.')) return;
      if (justEvaled) {
        fullReset();
        setCurrent(value === '.' ? '0.' : String(value));
        setReadyToReplace(false); setHasInput(true);
        return;
      }
      if (readyToReplace) {
        setReadyToReplace(false);
        setCurrent(value === '.' ? '0.' : String(value));
      } else {
        setCurrent(prev => prev === '0' && value !== '.' ? String(value) : prev + value);
      }
      setJustClosedParen(false);
      setHasInput(true);
      return;
    }

    if (value === 'C' || value === 'AC') {
      setCurrent('0'); setTokens([]); setLastOperator(null);
      setReadyToReplace(true); setHistory(''); setJustEvaled(false);
      setHasInput(false); setLockedFontSize(null);
      setParenDepth(0); setJustClosedParen(false);
      return;
    }

    if (value === '⌫') {
      if (justEvaled || readyToReplace) return;
      setCurrent(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
      return;
    }

    if (value === '(') {
      if (justEvaled) fullReset();
      if (!readyToReplace && !justClosedParen) {
        setTokens(prev => [...prev, current, '×', '(']);
      } else if (justClosedParen) {
        setTokens(prev => [...prev, '×', '(']);
      } else {
        setTokens(prev => [...prev, '(']);
      }
      setParenDepth(prev => prev + 1);
      setCurrent('0');
      setReadyToReplace(true);
      setJustClosedParen(false);
      setHasInput(false);
      return;
    }

    if (value === ')') {
      if (parenDepth === 0) return;
      const finalTokens = readyToReplace
        ? [...tokens, ')']
        : [...tokens, current, ')'];
      setTokens(finalTokens);
      setParenDepth(prev => prev - 1);
      setCurrent('0');
      setReadyToReplace(true);
      setJustClosedParen(true);
      setHasInput(true);
      return;
    }

    if (value === '+/-') { setCurrent(prev => String(parseFloat(prev) * -1)); return; }
    if (value === '%')   { setCurrent(prev => String(parseFloat(prev) * 0.01)); return; }

    if (value === 'π') { setCurrent(String(Math.PI)); setReadyToReplace(false); setHasInput(true); return; }
    if (value === 'e') { setCurrent(String(Math.E)); setReadyToReplace(false); setHasInput(true); return; }
    if (value === 'Rand') { setCurrent(String(Math.random())); setReadyToReplace(false); setHasInput(true); return; }
    if (value === 'EE') { setCurrent(prev => prev + 'e'); setReadyToReplace(false); return; }

    if (value === 'mc')  { setMemory(0); return; }
    if (value === 'm+')  { setMemory(prev => prev + parseFloat(current)); return; }
    if (value === 'm-')  { setMemory(prev => prev - parseFloat(current)); return; }
    if (value === 'mr')  { setCurrent(String(memory)); setReadyToReplace(true); return; }

    if (value === '2nd') { setIs2nd(prev => !prev); return; }
    if (value === 'Rad' || value === 'Deg') { setAngleMode(prev => prev === 'deg' ? 'rad' : 'deg'); return; }

    if (value === 'xʸ') {
      const newTokens = justClosedParen
        ? [...tokens, '^']
        : [...tokens, current, '^'];
      setTokens(newTokens);
      setLastOperator('^');
      setReadyToReplace(true);
      setJustEvaled(false);
      setJustClosedParen(false);
      setHasInput(false);
      return;
    }

    const scientificFns = [
      'sin','cos','tan','asin','acos','atan',
      'sinh','cosh','tanh','asinh','acosh','atanh',
      'ln','log','sqrt','cbrt','1/x','x²','x³','eˣ','10ˣ','2ˣ','x!'
    ];

    if (scientificFns.includes(value)) {
      const result = applyScientificFn(value, current);
      const resultStr = typeof result === 'string' ? result : String(result);
      const fs = calcFontSize(formatResult(resultStr));
      setLockedFontSize(fs < resultFontSize ? fs : null);
      setCurrent(resultStr);
      setReadyToReplace(true);
      setJustClosedParen(false);
      setHasInput(false);
      if (is2nd) setIs2nd(false);
      return;
    }

    if (['+', '-', '×', '÷'].includes(value)) {
      if (readyToReplace && !justClosedParen && tokens.length > 0) {
        setTokens(prev => { const u = [...prev]; u[u.length - 1] = value; return u; });
        setLastOperator(value);
        return;
      }
      let newTokens;
      if (justEvaled) {
        newTokens = [current, value];
        const fs = calcFontSize(formatResult(current));
        setLockedFontSize(fs < resultFontSize ? fs : null);
      } else if (justClosedParen) {
        newTokens = [...tokens, value];
      } else {
        newTokens = [...tokens, current, value];
      }
      setTokens(newTokens);
      setLastOperator(value);
      setReadyToReplace(true);
      setJustEvaled(false);
      setJustClosedParen(false);
      setHasInput(false);
      return;
    }

    if (value === '=') {
      if (tokens.length === 0) return;
      let fullTokens = justClosedParen
        ? [...tokens]
        : [...tokens, current];
      let depth = parenDepth;
      while (depth > 0) { fullTokens.push(')'); depth--; }
      const finalResult = evaluate(fullTokens);
      const resultStr = typeof finalResult === 'string' ? finalResult : String(finalResult);
      const formatted = formatResult(resultStr);
      const fs = calcFontSize(formatted);
      setLockedFontSize(fs < resultFontSize ? fs : null);
      setHistory(fullTokens.join(' ') + ' =');
      setCurrent(resultStr);
      setTokens([]);
      setLastOperator(null);
      setReadyToReplace(true);
      setJustEvaled(true);
      setJustClosedParen(false);
      setHasInput(false);
      setParenDepth(0);
      return;
    }
  }

  const clearLabel = hasInput ? 'C' : 'AC';
  const isLiveExpression = !justEvaled && tokens.length > 0;
  const angleBtnLabel = angleMode === 'deg' ? 'Rad' : 'Deg';

  const sciRow1 = ['(', ')', 'mc', 'm+', 'm-', 'mr'];
  const sciRow2 = is2nd
    ? ['2nd', 'x²', 'x³', 'xʸ', '2ˣ', 'eˣ']
    : ['2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ'];
  const sciRow3 = is2nd
    ? ['1/x', 'sqrt', 'cbrt', 'xʸ', 'ln', 'log']
    : ['1/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀'];
  const sciRow4 = is2nd
    ? ['x!', 'asin', 'acos', 'atan', 'e', 'EE']
    : ['x!', 'sin', 'cos', 'tan', 'e', 'EE'];
  const sciRow5 = is2nd
    ? ['Rand', 'asinh', 'acosh', 'atanh', 'π', angleBtnLabel]
    : ['Rand', 'sinh', 'cosh', 'tanh', 'π', angleBtnLabel];

  function handleSciBtn(btn) {
    if (btn === '²√x') buttonPressed('sqrt');
    else if (btn === '³√x') buttonPressed('cbrt');
    else if (btn === 'log₁₀') buttonPressed('log');
    else if (btn === 'ʸ√x') buttonPressed('xʸ');
    else buttonPressed(btn);
  }

  function renderSciBtn(label) {
    const active2nd = label === '2nd' && is2nd;
    const radius = sciBtnHeight / 2;
    return (
      <TouchableOpacity
        key={label}
        style={[
          styles.button,
          styles.buttonSci,
          { width: sciBtnW, height: sciBtnHeight, borderRadius: radius, margin },
          active2nd && styles.button2ndActive,
        ]}
        onPress={() => handleSciBtn(label)}
      >
        <Text style={[styles.buttonText, { fontSize: sciBtnHeight * 0.3 }, active2nd && { color: '#1c1c1e' }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderBtn(label, onPress, extraStyle = {}, textStyle = {}) {
    const radius = basicBtnHeight / 2;
    return (
      <TouchableOpacity
        key={label}
        style={[
          styles.button,
          { width: basicBtnWidth, height: basicBtnHeight, borderRadius: radius, margin },
          extraStyle,
        ]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, { fontSize: basicBtnHeight * 0.32 }, textStyle]}>{label}</Text>
      </TouchableOpacity>
    );
  }

  function renderAccent(label, op) {
    const active = lastOperator === op && readyToReplace;
    const radius = basicBtnHeight / 2;
    return (
      <TouchableOpacity
        key={label}
        style={[
          styles.button,
          styles.buttonAccent,
          { width: basicBtnWidth, height: basicBtnHeight, borderRadius: radius, margin },
          active && styles.buttonAccentActive,
        ]}
        onPress={() => buttonPressed(op)}
      >
        <Text style={[styles.buttonText, { fontSize: basicBtnHeight * 0.38 }, active && styles.buttonTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.resultContainer}>
        {history ? (
          <ScrollView
            ref={historyScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            onContentSizeChange={() => historyScrollRef.current?.scrollToEnd({ animated: false })}
          >
            <Text style={styles.equationText}>{history}</Text>
          </ScrollView>
        ) : null}

        {isLiveExpression ? (
          <ScrollView
            ref={liveScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            onContentSizeChange={() => liveScrollRef.current?.scrollToEnd({ animated: false })}
          >
            <Text style={[styles.resultText, { fontSize: getResultFontSize() }]}>{getDisplayed()}</Text>
          </ScrollView>
        ) : (
          <Text
            style={[styles.resultText, { fontSize: getResultFontSize() }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.3}
          >
            {getDisplayed()}
          </Text>
        )}
      </View>

      {isScientific && (
        <>
          <View style={[styles.row, { marginBottom: margin }]}>{sciRow1.map(renderSciBtn)}</View>
          <View style={[styles.row, { marginBottom: margin }]}>{sciRow2.map(renderSciBtn)}</View>
          <View style={[styles.row, { marginBottom: margin }]}>{sciRow3.map(renderSciBtn)}</View>
          <View style={[styles.row, { marginBottom: margin }]}>{sciRow4.map(renderSciBtn)}</View>
          <View style={[styles.row, { marginBottom: margin }]}>{sciRow5.map(renderSciBtn)}</View>
        </>
      )}

      <View style={[styles.row, { marginBottom: margin }]}>
        {renderBtn(clearLabel, () => buttonPressed(clearLabel), styles.buttonDark, styles.buttonTextDark)}
        {renderBtn('+/-', () => buttonPressed('+/-'), styles.buttonDark, styles.buttonTextDark)}
        {renderBtn('%', () => buttonPressed('%'), styles.buttonDark, styles.buttonTextDark)}
        {renderAccent('÷', '÷')}
      </View>

      <View style={[styles.row, { marginBottom: margin }]}>
        {['7', '8', '9'].map(n => renderBtn(n, () => buttonPressed(n)))}
        {renderAccent('×', '×')}
      </View>

      <View style={[styles.row, { marginBottom: margin }]}>
        {['4', '5', '6'].map(n => renderBtn(n, () => buttonPressed(n)))}
        {renderAccent('-', '-')}
      </View>

      <View style={[styles.row, { marginBottom: margin }]}>
        {['1', '2', '3'].map(n => renderBtn(n, () => buttonPressed(n)))}
        {renderAccent('+', '+')}
      </View>

      <View style={[styles.row, { marginBottom: margin }]}>
        {renderBtn('⊞', () => setIsScientific(prev => !prev), styles.buttonSci)}
        {renderBtn('0', () => buttonPressed('0'))}
        {renderBtn('.', () => buttonPressed('.'))}
        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonAccent,
            { width: basicBtnWidth, height: basicBtnHeight, borderRadius: basicBtnHeight / 2, margin },
          ]}
          onPress={() => buttonPressed('=')}
        >
          <Text style={[styles.buttonText, { fontSize: basicBtnHeight * 0.38 }]}>=</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
    paddingBottom: screenHeight * 0.02,
  },
  resultContainer: {
    paddingHorizontal: screenWidth * 0.05,
    marginBottom: screenHeight * 0.01,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  equationText: {
    color: '#888888',
    fontSize: screenWidth * 0.06,
    textAlign: 'right',
    marginBottom: 4,
  },
  resultText: {
    color: '#FFFFFF',
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDark:         { backgroundColor: '#A5A5A5' },
  buttonSci:          { backgroundColor: '#1c1c1e' },
  buttonAccent:       { backgroundColor: '#7D9BBA' },
  buttonAccentActive: { backgroundColor: '#FFFFFF' },
  button2ndActive:    { backgroundColor: '#7D9BBA' },
  buttonTextActive:   { color: '#7D9BBA' },
  buttonText:         { color: '#FFFFFF', fontWeight: '400' },
  buttonTextDark:     { color: '#000000' },
});