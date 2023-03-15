import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import loading from "../../../assets/images/loading.gif";

export default ContactList = ({ search, id, balance }) => {
  const navigation = useNavigation();
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`https://funpayz.herokuapp.com/api/v1/user?search=${search}`)
      .then((res) => {
        setData(res.data.Data);
      })
      .catch((err) => console.log(err));
  }, [search]);

  if (!data) {
    return (
      <View
        style={[
          {
            width: "100%",
            // height: "10%",
            // justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            // backgroundColor: "green",
          },
        ]}
      >
        <Image source={loading} style={{ width: "15%", height: 60 }} />
      </View>
    );
  } else {
    return (
      <View style={[{ marginTop: 10 }]}>
        {data?.map((item) => {
          if (item.id != id) {
            return (
              <Pressable
                onPress={() =>
                  navigation.navigate("input-amount", {
                    name: item.username,
                    user_id: id,
                    dataUser: item,
                    balance: balance,
                  })
                }
                key={item.id}
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
                    source={{
                      uri: `https://res.cloudinary.com/dcf12mtca/image/upload/v1677939306/${item.image}.webp`,
                    }}
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
                    {item.username}
                  </Text>
                  <Text>{item.phone_number}</Text>
                </View>
              </Pressable>
            );
          }
        })}
      </View>
    );
  }
};
