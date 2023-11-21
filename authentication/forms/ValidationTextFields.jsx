import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen';
import { COMMONTEXT } from '../../constants';

function ValidationTextFields(props) {
  const { label, errorText, value, style, onBlur, onFocus, ...restOfProps } = props;
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  let color = isFocused ? 'black' : 'gray';
  if (errorText) {
    color = '#B00020';
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: color,
          },
        ]}
        ref={inputRef}
        {...restOfProps}
        value={value}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur && onBlur(event);
        }}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus && onFocus(event);
        }}
      />
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, -12],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color: 'aliceblue',
              },
            ]}
          >
            {label}
            {errorText ? '*' : ''}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: vh(2),
  },
  input: {
    padding: 18,
    borderWidth: 1,
    borderRadius: 4,
    ...COMMONTEXT.tertiary
  },
  labelContainer: {
    position: 'absolute',
    paddingHorizontal: 8,
  },
  label: {
    ...COMMONTEXT.tertiary,
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
    ...COMMONTEXT.primary,
  },
});

export default ValidationTextFields;
