import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/components/page/Login";
import Signup from "./src/components/page/signup";
import FormPin from "./src/components/page/Create Pin";
import Home from "./src/components/page/Home";
import FindReceiver from "./src/components/page/Find Receiver";
import AmountInput from "./src/components/page/Amount Input";
import Confirmation from "./src/components/page/Confirmation";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfirmOTP from "./src/components/page/Confirm OTP";
import ConfirmPin from "./src/components/page/Confirm Pin";
import Topup from "./src/components/page/Topup";
import AmountTopup from "./src/components/page/Amount Topup";
import Profile from "./src/components/page/Profile";
import MyTabs from "./Tabs";
import { Loading } from "./src/components/atoms/Loading";
import PersonalInformation from "./src/components/page/Personal Information";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="personal-information"
            component={PersonalInformation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="topup"
            component={Topup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="amount-topup"
            component={AmountTopup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="find-receiver"
            component={FindReceiver}
            options={{
              headerShown: false,
              animation: "none",
            }}
          />
          <Stack.Screen
            name="input-amount"
            component={AmountInput}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="confirmation"
            component={Confirmation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="create-pin"
            component={FormPin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="confirm-pin"
            component={ConfirmPin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="confirm-otp"
            component={ConfirmOTP}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
