import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FindReceiver from "./src/components/page/Find Receiver";
import Home from "./src/components/page/Home";
import Profile from "./src/components/page/Profile";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Find-receiver" component={FindReceiver} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MyTabs;
