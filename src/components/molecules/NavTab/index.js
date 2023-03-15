import { Entypo } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import globalCss from "../../../assets/styles/globalCss";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NavTab = ({ home, transfer, profile, id, balance }) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={[{ position: "absolute", bottom: 0, width: "100%" }]}>
        <View
          style={[
            {
              backgroundColor: "#fff",
              flexDirection: "row",
            },
          ]}
        >
          <Pressable
            onPress={() => navigation.navigate("home", { id })}
            android_ripple={{
              color: "#d3def9",
              radius: 20,
              borderless: true,
              foreground: true,
            }}
            style={[
              globalCss.centerItem,
              {
                flex: 1,
                paddingVertical: 10,
              },
              home && { borderTopWidth: 2, borderColor: "#537FE7" },
            ]}
          >
            <Entypo name="home" size={30} color={home ? "#537FE7" : "gray"} />
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("find-receiver", { id, balance })
            }
            android_ripple={{
              color: "#d3def9",
              radius: 20,
              borderless: true,
              foreground: true,
            }}
            style={[
              globalCss.centerItem,
              {
                flex: 1,
                paddingVertical: 10,
              },
              transfer && { borderTopWidth: 2, borderColor: "#537FE7" },
            ]}
          >
            <FontAwesome5
              name="exchange-alt"
              size={30}
              color={transfer ? "#537FE7" : "gray"}
            />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("profile", { id })}
            android_ripple={{
              color: "#d3def9",
              radius: 20,
              borderless: true,
              foreground: true,
            }}
            style={[
              globalCss.centerItem,
              {
                flex: 1,
                paddingVertical: 10,
              },
              profile && { borderTopWidth: 2, borderColor: "#537FE7" },
            ]}
          >
            <FontAwesome5
              name="user-alt"
              size={30}
              color={profile ? "#537FE7" : "gray"}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default NavTab;
