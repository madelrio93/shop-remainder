import LottieView from "lottie-react-native";
import { useRef } from "react";
import { SafeAreaView } from "react-native";

interface SplashScreenProps {
  onFinish: (isCancelled: boolean) => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const animation = useRef<LottieView>(null);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <LottieView
        autoPlay
        speed={0.8}
        loop={false}
        ref={animation}
        resizeMode="cover"
        style={{
          flex: 1,
          minWidth: "100%",
        }}
        onAnimationFinish={onFinish}
        source={require("@/assets/lotties/splash.json")}
      />
    </SafeAreaView>
  );
};
