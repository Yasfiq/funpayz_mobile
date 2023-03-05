import { Image, Pressable, ScrollView, Text, View } from "react-native";
import globalCss from "../../../assets/styles/globalCss";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Balance from "../../molecules/Balance";
import TransactionHistory from "../../molecules/Transaction History";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const route = useRoute();
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@login");
      setData(JSON.parse(jsonValue));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [route]);

  useEffect(() => {
    if (!data) {
      navigation.navigate("login");
    }
  }, [data]);

  return (
    <ScrollView style={[globalCss.container, { paddingTop: 30 }]}>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        <View
          style={[
            { flexDirection: "row", columnGap: 15, alignItems: "center" },
          ]}
        >
          <View
            style={{
              // elevation: 8,
              width: 70,
              height: 70,
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
            <Text style={[{ fontSize: 18 }]}>Hello,</Text>
            <Text style={[{ fontSize: 24, fontWeight: "bold" }]}>
              {data.username ? data.username : ""}
            </Text>
          </View>
        </View>
        <Ionicons name="notifications-outline" size={30} color="black" />
      </View>
      <Balance />
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}
      >
        <Pressable
          style={[{ width: "45%" }]}
          onPress={() => navigation.navigate("find-receiver")}
        >
          <Text style={[globalCss.btnSecondary, { fontSize: 18 }]}>
            <AntDesign name="arrowup" size={20} color="#537FE7" /> Transfer
          </Text>
        </Pressable>
        <Pressable style={[{ width: "45%" }]}>
          <Text style={[globalCss.btnSecondary, { fontSize: 18 }]}>
            <AntDesign name="plus" size={20} color="#537FE7" /> Top Up
          </Text>
        </Pressable>
      </View>
      <View
        style={[
          {
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}
      >
        <Text style={[{ fontSize: 18 }]}>Transaction </Text>
        <Text style={[{ color: "#537FE7", fontSize: 18 }]}>See details</Text>
      </View>
      <TransactionHistory />
    </ScrollView>
  );
};

export default Home;
