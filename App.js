import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, { Easing } from 'react-native-reanimated';
import SearchBar from './src/shared/components/SearchBar';
const { Value, timing } = Animated


const placeHolder = Array.from({ length: 19 }, (v, k) => k)

const scrollY = new Value(0)
const diffClampY = Animated.diffClamp(scrollY, 0, 154)
const headerHeight = Animated.interpolate(diffClampY, {
  inputRange: [0, 50],
  outputRange: [50, 0],
  extrapolate: 'clamp'
})
const headerTranslateY = Animated.interpolate(diffClampY, {
  inputRange: [0, 50],
  outputRange: [0, -50],
  extrapolate: 'clamp'
})
const headerOpacity = Animated.interpolate(diffClampY, {
  inputRange: [0, 50],
  outputRange: [1, 0],
  extrapolate: 'clamp'
})
const App = () => {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SearchBar diffClampY={diffClampY} headerTranslateY={headerTranslateY} headerOpacity={headerOpacity} headerHeight={headerHeight} scrollY={scrollY} />
        <Animated.ScrollView
          style={{ flex: 1 }}
          bounces={false} scrollEventThrottle={5} onScroll={Animated.event([{
            nativeEvent: {
              contentOffset: {
                y: scrollY
              }
            }
          }])} showsVerticalScrollIndicator={false}>
          {placeHolder && placeHolder.length && placeHolder.map((data, index) => <View key={`meong-${data}-${index}`} style={styles.fake_post}></View>)}
        </Animated.ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  fake_post: {
    height: 200,
    margin: 16,
    borderRadius: 16,
    backgroundColor: '#e4e6eb',
  },
});

export default App;
