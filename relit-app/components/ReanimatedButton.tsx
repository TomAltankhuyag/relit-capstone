import React from "react";
import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle, TextStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface Props {
  onPress: () => void;
  label: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function ReanimatedButton({ onPress, label, style, textStyle }: Props) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const triggerRipple = () => {
    scale.value = 0;
    opacity.value = 0.5;

    scale.value = withTiming(3.5, { duration: 600, easing: Easing.out(Easing.quad) });
    opacity.value = withTiming(0, { duration: 600 });
  };

  return (
    <Pressable
      onPressIn={triggerRipple}
      onPress={onPress}
      style={[styles.button, style]}
    >
      <View style={styles.innerWrapper}>
        <Animated.View style={[styles.ripple, animatedStyle]} />
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    width: 300,
    marginBottom: 15,
    overflow: "hidden",
    
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  innerWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  ripple: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    zIndex: 1,
  },
});
