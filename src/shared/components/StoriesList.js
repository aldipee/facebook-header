import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Animated, { Easing } from 'react-native-reanimated'
const { Value, timing } = Animated




class StoriesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollX: new Value(0)
        }
    }

    _onScroll = (e) => {
        const newXScrollValue = e.nativeEvent.contentOffset.x
        console.log(newXScrollValue, 'newXScrollValue')
        console.log(new Value(newXScrollValue))
        this.setState({
            scrollX: new Value(newXScrollValue)
        })
    }

    render() {
        const animatedWidthCard = this.state.scrollX.interpolate({
            inputRange: [20, 60],
            outputRange: [100, 50],
            extrapolate: 'clamp'
        })
        const animatedHeightCard = this.state.scrollX.interpolate({
            inputRange: [20, 60],
            outputRange: [170, 50],
            extrapolate: 'clamp'
        })
        const cardPositionTop = this.state.scrollX.interpolate({
            inputRange: [20, 60],
            outputRange: [0, 60],
            extrapolate: 'clamp'
        })
        const cardPositionLeft = this.state.scrollX.interpolate({
            inputRange: [20, 60],
            outputRange: [10, 0],
            extrapolate: 'clamp'
        })
        const cardBorderLeftRadius = this.state.scrollX.interpolate({
            inputRange: [20, 60],
            outputRange: [16, 0],
            extrapolate: 'clamp'
        })

        // Image

        const imageContainerHeight = this.state.scrollX.interpolate({
            inputRange: [20, 60],
            outputRange: [100, 40],
            extrapolate: 'clamp'
        })
        const imageContainerMargin = this.state.scrollX.interpolate({
            inputRange: [20, 60],
            outputRange: [0, 4],
            extrapolate: 'clamp'
        })
        const imageContainerBorderRadius = this.state.scrollX.interpolate({
            inputRange: [20, 60],
            outputRange: [0, 40],
            extrapolate: 'clamp'
        })


        // Button
        const buttonContainerPaddingTop = this.state.scrollX.interpolate({
            inputRange: [20, 60],
            outputRange: [20, -20],
            extrapolate: 'clamp'
        })
        const buttonContainerOpacity = this.state.scrollX.interpolate({
            inputRange: [20, 60],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })

        // Icon
        const animatedIconSize = this.state.scrollX.interpolate({
            inputRange: [0, 60],
            outputRange: [1, 0.6],
            extrapolate: 'clamp'
        })
        const animatedIconPT = this.state.scrollX.interpolate({
            inputRange: [0, 60],
            outputRange: [-15, -28],
            extrapolate: 'clamp'
        })
        const animatedIconPR = this.state.scrollX.interpolate({
            inputRange: [0, 60],
            outputRange: [33, -3],
            extrapolate: 'clamp'
        })



        return (
            <>
                <View style={styles.container}>
                    <Animated.View style={[styles.personalCardContianer, {
                        width: animatedWidthCard,
                        height: animatedHeightCard,
                        top: cardPositionTop,
                        left: cardPositionLeft,
                        borderTopLeftRadius: cardBorderLeftRadius,
                        borderBottomLeftRadius: cardBorderLeftRadius
                    }]}>

                        {/* Image Container */}
                        <Animated.View style={[styles.imageContainer, {
                            height: imageContainerHeight,
                            margin: imageContainerMargin,
                            borderRadius: imageContainerBorderRadius
                        }]}>
                            <Image source={require('../../assets/images/profilepic.jpg')} style={styles.image} />
                        </Animated.View>
                        {/* End of Image Container */}
                        {/* Button Add Storiy */}
                        <Animated.View style={[styles.containerButton]}>
                            <Animated.Text style={[styles.text, {
                                paddingTop: buttonContainerPaddingTop,
                                opacity: buttonContainerOpacity
                            }]}>
                                Creat a {"\n"} story
                            </Animated.Text>
                            <Animated.View style={[styles.iconContainer, {
                                transform: [{ scale: animatedIconSize }],
                                top: animatedIconPT,
                                right: animatedIconPR
                            }]}>
                                <Icon size={18} name={'plus'} color='#fff' />
                            </Animated.View>
                        </Animated.View>
                    </Animated.View>
                    <ScrollView style={[styles.scrollView]} scrollEventThrottle={7} horizontal={true} showsHorizontalScrollIndicator={false} onScroll={this._onScroll}>
                        <View style={styles.fakeCardGhost} />
                        <View style={styles.fakeCard}>
                            <Image source={require('../../assets/images/profilepic.jpg')} style={styles.imageStory} />
                        </View>
                        <View style={styles.fakeCard} />
                        <View style={styles.fakeCard} />
                        <View style={styles.fakeCard} />

                        <View style={styles.fakeCard} />
                        <View style={styles.fakeCard} />
                        <View style={styles.fakeCard} />

                        <View style={styles.fakeCard} />
                        <View style={styles.fakeCard} />
                        <View style={styles.fakeCard} />
                        <View style={styles.colSpacer} />
                    </ScrollView>
                </View>
            </>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginTop: 20,
    },
    personalCardContianer: {
        position: 'absolute',
        zIndex: 10,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        elevation: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white'
    },
    imageContainer: {
        position: 'relative',
        overflow: 'hidden'

    },
    imageStory: {
        width: null,
        height: null,
        flex: 1,
        borderRadius: 16
    },
    image: {
        width: null,
        height: null,
        flex: 1
    },
    containerButton: {
        position: 'relative'
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 32,
        backgroundColor: '#3578e5',
        borderWidth: 3,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute'
    },
    fakeCard: {
        height: 170,
        width: 100,
        backgroundColor: '#e4e6eb',
        marginLeft: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16
    },
    fakeCardGhost: {
        height: 170,
        width: 100,
        backgroundColor: '#fff',
        marginLeft: 10,
        borderWidth: 0,
        borderRadius: 16
    },
    colSpacer: {
        height: 170,
        width: 10,
    }

})

export default StoriesList;
