import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

const CustomSplashScreen = () => {
  const lineAnimation = useSharedValue(0);

  useEffect(() => {
    lineAnimation.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.linear }), -1, true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: lineAnimation.value * 220 }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/fingerprint.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Animated.View
          style={[
            animatedStyle,
            styles.animatedLine,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    position: 'relative',
    width: 300,
    height: 230,
  },
  image: {
    width: 300,
    height: 230,
    opacity: 0.95,
  },
  animatedLine: {
    position: 'absolute',
    top: 0,
    left: 50,
    width: 200,
    height: 8,
    backgroundColor: '#4ade80',
    borderRadius: 8,
    boxShadow: '0px 0px 50px 20px rgba(74, 222, 128, 1)',
  },
});

export default CustomSplashScreen;