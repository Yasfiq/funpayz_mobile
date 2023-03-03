import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";

export default ContactList = () => {
  const navigation = useNavigation();
  const data = [{ name: "Yasfiq" }, { name: "Muksin" }];

  return (
    <View style={[{ marginTop: 10 }]}>
      {data.map((item) => {
        return (
          <Pressable
            onPress={() =>
              navigation.navigate("input-amount", { name: item.name })
            }
            key={item.name}
            style={[
              {
                marginBottom: 10,
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 8,
                elevation: 2,
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
              },
            ]}
          >
            <View
              style={{
                // elevation: 8,
                width: 60,
                height: 60,
                borderRadius: 15,
                overflow: "hidden",
              }}
            >
              <Image
                source={require("../../../assets/images/contoh.jpeg")}
                style={[
                  {
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                  },
                ]}
              />
            </View>
            <View>
              <Text style={[{ fontSize: 18, fontWeight: "bold" }]}>
                {item.name}
              </Text>
              <Text>+62 858 9118 5933</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};
