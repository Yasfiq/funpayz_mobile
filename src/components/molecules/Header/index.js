import { Text, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default ({ navigation, title, to, params }) => {
  return (
    <View
      style={[
        {
          width: "100%",
          backgroundColor: "#537FE7",
          padding: 20,
          paddingTop: 50,
        },
      ]}
    >
      <View
        style={[
          {
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
          },
        ]}
      >
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          style={[{ marginRight: 30 }]}
          onPress={() =>
            to ? navigation.navigate(to, params) : navigation.goBack()
          }
        />
        <Text style={[{ fontSize: 20, color: "#fff", fontWeight: 500 }]}>
          {title}
        </Text>
      </View>
    </View>
  );
};
