import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import SearchBar from './src/shared/components/SearchBar';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SearchBar />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.fake_post}></View>
          <View style={styles.fake_post}></View>
          <View style={styles.fake_post}></View>
          <View style={styles.fake_post}></View>
        </ScrollView>
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
