import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, {Easing} from 'react-native-reanimated';
const {Value, timing} = Animated;

// Calculate window size
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      searchKeyword: '',
    };

    // Animation value
    this.inputBoxTranslateX = new Value(width);
    this.backButtonOpacity = new Value(0);
    this.contentTranslateY = new Value(0);
    this.contentOpacity = new Value(0);
  }

  _onFocus = () => {};
  _onBlur = () =>{

  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.ContainerSafeArea}>
          <View style={styles.HeaderContainer}>
            <View style={styles.Header}>
              <Image
                source={require('../../assets/images/FacebookLogo.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <TouchableHighlight
                activeOpacity={1}
                onPress={this._onFocus}
                underlayColor={'#ccd0d5'}
                style={styles.searchIconBox}>
                <Icon name="search" size={22} color="#000" />
              </TouchableHighlight>
              <Animated.View style={[styles.inputBox, {transform : [{translateX : this.inputBoxTranslateX}]}]}>
                <Animated.View style={{opacity : this.contentOpacity}}>
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor={'#ccd0d5'}
                  onPress={this._onBlur()}
                  style={styles.backIconBox}
                >
                    <Icon name='chevron-left' size={22} color={'#000'} />
                </TouchableHighlight>
                </Animated.View>
                <TextInput ref={'input'} placeholder='Search' clearButtonMode='always' value={this.state.searchKeyword} style={styles.input} onChange={(value) =>{
                  this.setState({searchKeyword : value})
                }}/>
              </Animated.View>
            </View>
          </View>
        </SafeAreaView>
        <Animated.View style={[styles.content, {
          opacity : this.contentOpacity,
          transform : [{translateY : this.contentTranslateY}]
        }]} >
          <SafeAreaView style={styles.contentSafeArea}>
          <View style={styles.contentInner}>

          </View>
          </SafeAreaView>

        </Animated.View>
      </>
    );
  }
}

export default SearchBar;

const styles = StyleSheet.create({
  ContainerSafeArea: {
    zIndex: 100,
  },
  HeaderContainer: {
    height: 50,
    paddingHorizontal: 18,
  },
  Header: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  searchIconBox: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4e6eb',
  },
  inputBox : {
    backgroundColor : 'white',
    height : 50,
    flexDirection : 'row',
    alignItems : 'center',
    position : 'absolute',
    top : 0,
    left : 0,
    width : width -32
  },
  backIconBox : {
    width : 40,
    height : 40,
    borderRadius :40,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center'
  },
  input : {
    flex : 1,
    height :40,
    backgroundColor : '#e4e6eb'
  },
  content : {
    width : width,
    height : height,
    position : 'absolute',
    left : 0,
    bottom : 0,
    zIndex : 999
  },
  contentSafeArea : {
    flex : 1,
    backgroundColor : 'white'
  },
  contentInner : {
    flex : 1,
    paddingTop : 50
  }
});
