import React, {useRef, useState, useEffect } from 'react';
import { Animated ,StyleSheet,TouchableWithoutFeedback} from 'react-native';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;


export const AnimationScaleText = ({text,size,durationSeg,color}) => {

  const [animacion] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(
      animacion,
      {
        toValue: 1,
        duration:durationSeg,
        useNativeDriver: true
      }
    ).start();
  }, [animacion]);

  const estiloAnimacion = {
    transform: [
      { scale: animacion }
    ]
  }

  return (
      <Animated.Text style={[{fontSize:size,color:color}, estiloAnimacion]}>
        {text}
      </Animated.Text>

  );
};

export const RotateAndScaleAnimationImg = ({img}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
  
    const startAnimation = () =>{
      Animated.parallel([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        animatedValue.setValue(0);
      });
    };
  
    const rotateInterpolate = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  
    const scaleInterpolate = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1],
    });
    useEffect(()=>{
      startAnimation()
    },[])
  
    return (
  
          <Animated.Image
            source={img}
            style={[
              styles.image,
              {/*
                transform: [{ rotate: rotateInterpolate }, { scale: scaleInterpolate }],*/
              },
            ]}
          />
  
    );
  };

  export const TouchScaleAnimationImg = ({img}) => {
    const scale = useRef(new Animated.Value(0)).current;

  
  
    const scaleInterpolation=scale.interpolate({
      inputRange:[0,1],
      outputRange:[1,1.5]
    })

  
  
    const startanimation=()=>{
      Animated.spring(scale, {
        toValue: 2,
        useNativeDriver: true,
      }).start();
    }
    const stopanimation=()=>{
      Animated.spring(scale, {
        toValue: 0,
        useNativeDriver: true,
      }).start(); 
      
    }

  return (

    <TouchableWithoutFeedback onPressIn={startanimation} onPressOut={stopanimation}>
    <Animated.Image source={img} style={{ width: 120, height: 120,transform:[{scale:scaleInterpolation }] }}  resizeMode='contain'/>
  </TouchableWithoutFeedback>

  );
};
  
const styles = StyleSheet.create({
  
      image: {
        width: screenWidth,
        height: 200,
      },
});
    