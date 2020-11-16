import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  Image,
  TouchableOpacity,
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

  _onFocus = () => {
    console.log('Runnung Animation')
    //Update state
    this.setState({
      isFocused : true
    })
    // Config Animation
    // 1. Input Box Moving X Direction
    const translateInputBoxConfigX = {
      duration : 200,
      toValue : 0,
      easing : Easing.inOut(Easing.ease)
    }
    // 2. Show back Button Opacity
    const backButtonOpacityConfig = {
      duration : 200,
      toValue : 1,
      easing : Easing.inOut(Easing.ease)
    }
    // 3. Content show from Y Direction
    const translateContentConfigY = {
      duration : 1,
      toValue : 0,
      easing : Easing.inOut(Easing.ease)
    }
    // 4. Content Opacity Config
    const contentOpacityConfig = {
      duration : 200,
      toValue : 1,
      easing : Easing.inOut(Easing.ease)
    }

    //Run The Animations!!!
    timing(this.inputBoxTranslateX, translateInputBoxConfigX).start()
    timing(this.backButtonOpacity, backButtonOpacityConfig).start()
    timing(this.contentTranslateY,translateContentConfigY).start()
    timing(this.contentOpacity, contentOpacityConfig).start()

    this.refs.input.focus()

  };
  _onBlur = () =>{
    console.log('BLURRR')
    this.setState({
      isFocused : true
    })
    // Config Animation
    // 1. Input Box Moving X Direction
    const translateInputBoxConfigX = {
      duration : 200,
      toValue : width,
      easing : Easing.inOut(Easing.ease)
    }
    // 2. Show back Button Opacity
    const backButtonOpacityConfig = {
      duration : 200,
      toValue : 1,
      easing : Easing.inOut(Easing.ease)
    }
    // 3. Content show from Y Direction
    const translateContentConfigY = {
      duration : 1,
      toValue : height,
      easing : Easing.inOut(Easing.ease)
    }
    // 4. Content Opacity Config
    const contentOpacityConfig = {
      duration : 200,
      toValue : 0,
      easing : Easing.inOut(Easing.ease)
    }

    //Run The Animations!!!
    timing(this.inputBoxTranslateX, translateInputBoxConfigX).start()
    timing(this.backButtonOpacity, backButtonOpacityConfig).start()
    timing(this.contentTranslateY,translateContentConfigY).start()
    timing(this.contentOpacity, contentOpacityConfig).start()

    this.refs.input.blur()
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
              <TouchableOpacity
                activeOpacity={1}
                onPress={this._onFocus}
                underlayColor={'#ccd0d5'}
                style={styles.searchIconBox}>
                <Icon name="search" size={22} color="#000" />
              </TouchableOpacity>
              <Animated.View style={[styles.inputBox, {transform : [{translateX : this.inputBoxTranslateX}]}]}>
                <Animated.View style={{opacity : this.backButtonOpacity, }}>
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor={'#ccd0d5'}
                  onPress={this._onBlur}
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
            <View  style={styles.seperator}/>
            {this.state.searchKeyword === '' ?(
              <View style={styles.imagePlaceHolderContainer}>
                <Image style={styles.imagePlaceHolder} source={require('../../assets/images/Search.png')}/>
                <Text style={styles.imagePlaceHolderText}>Type a keyword to search</Text>
              </View>
            ) : (
              <ScrollView>
                <View style={styles.searchItem}>
                  <Icon name='search' size={16} color='#ccc'/>
                  <Text>Search Result 1</Text>
                </View>
              </ScrollView>
            )}
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
  },
  HeaderContainer: {
    height: 50,
    backgroundColor : 'white',
    paddingHorizontal: 18,
    marginBottom : -14,
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
    width: 70,
    height: 70,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4e6eb',
  },
  inputBox : {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top:0,
    left:0,
    backgroundColor: 'white',
    width: width - 32 
  },
  backIconBox : {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  input : {
    width : width - 70,
    flexDirection : 'row',
    height :40,
    backgroundColor : '#e4e6eb',
    borderRadius : 6,
    padding : 10,
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
  },
  seperator : {
    height : 1,
    marginTop: 5
  },
  imagePlaceHolderContainer : {
    flexDirection : 'column',
    justifyContent : 'center',
  },
  imagePlaceHolder : {
    width : 300,
    height : 300,
    alignSelf : 'center',
  },
  imagePlaceHolderText : {
    textAlign : 'center',
    color : 'grey',
    fontSize : 16
  },
  searchItem : {
    flexDirection : 'row',
    height : 40,
    alignItems : 'center'
  },
  itemIcon : {

  }
});
