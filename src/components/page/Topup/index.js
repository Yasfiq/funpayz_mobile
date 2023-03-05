import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import globalCss from "../../../assets/styles/globalCss";
import toCurrency from "../../../utils/Function/toCurrency";
import Header from "../../molecules/Header";

export default Topup = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [balance, setBalance] = useState(false);
  const [load, setLoad] = useState();
  const banks = [
    {
      bank: "bca",
      name: require(`../../../assets/images/bca.webp`),
      width: 100,
      height: 30,
    },
    {
      bank: "bri",
      name: require(`../../../assets/images/bri.webp`),
      width: 100,
      height: 20,
    },
    {
      bank: "bni",
      name: require(`../../../assets/images/bni.webp`),
      width: 70,
      height: 20,
    },
    {
      bank: "cimb",
      name: require(`../../../assets/images/cimb.webp`),
      width: 150,
      height: 20,
    },
  ];
  const agents = [
    {
      name: require(`../../../assets/images/alfamart.webp`),
      width: 100,
      height: 30,
    },
    {
      name: require(`../../../assets/images/alfamidi.webp`),
      width: 150,
      height: 30,
    },
    {
      name: require(`../../../assets/images/indomaret.webp`),
      width: 100,
      height: 30,
    },
  ];

  //   useEffect(() => {
  //     if (load) {
  //       setTimeout(() => {
  //         setLoad(false);
  //       }, 10000);
  //     }
  //   }, [load]);

  //   useEffect(() => {
  //     if (!load) {
  //       setTimeout(() => {
  //         setLoad(true);
  //         console.log("load");
  //       }, 10000);
  //     }
  //   }, [load]);

  useEffect(() => {
    axios
      .get(`https://funpayz.herokuapp.com/api/v1/user/${route.params.id}`)
      .then((res) => {
        setBalance(res.data.Data.balance);
      });
  }, [route, load]);

  return (
    <ScrollView>
      <Header
        navigation={navigation}
        title="Top Up"
        to="home"
        params={{ id: route.params.id }}
      />
      <View
        style={[
          {
            padding: 15,
            paddingHorizontal: 30,
            backgroundColor: "#537FE7",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
        ]}
      >
        <Text style={[{ color: "#fff", fontWeight: 300, fontSize: 16 }]}>
          Balance
        </Text>
        <Text
          style={[
            {
              fontSize: 24,
              fontWeight: "bold",
              color: "#fff",
              marginVertical: 5,
            },
          ]}
        >
          {balance && toCurrency(balance, "rupiah")}
        </Text>
      </View>
      <View style={[globalCss.container, { paddingBottom: 20 }]}>
        <Text
          style={[
            {
              textAlign: "center",
              color: "#537FE7",
              fontSize: 20,
              fontWeight: "bold",
              width: "90%",
              marginHorizontal: "5%",
            },
          ]}
        >
          We provide you virtual account number for top up
        </Text>
        <Image
          source={require("../../../assets/images/topup.png")}
          alt="Art-Illustration-Topup"
          style={[{ height: 350, width: "auto" }]}
        />
        <Text style={[{ fontSize: 18, marginBottom: 10 }]}>Bank Transfer</Text>
        <View>
          {banks.map((bank) => {
            return (
              <Pressable
                android_ripple={{
                  color: "#d3def9",
                  radius: 20,
                  borderless: true,
                  foreground: true,
                }}
                onPress={() =>
                  navigation.navigate("amount-topup", {
                    id: route.params.id,
                    method: bank.bank,
                  })
                }
                key={bank.name}
                style={[
                  {
                    padding: 20,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    borderBottomWidth: 1,
                    borderColor: "#d0d0d0",
                  },
                ]}
              >
                <Image
                  source={bank.name}
                  style={[{ width: bank.width, height: bank.height }]}
                />
              </Pressable>
            );
          })}
        </View>
        <Text style={[{ fontSize: 18, marginBottom: 10, marginTop: 20 }]}>
          Agent
        </Text>
        <View>
          {agents.map((agent) => {
            return (
              <View
                key={agent.name}
                style={[
                  {
                    padding: 20,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    borderBottomWidth: 1,
                    borderColor: "#d0d0d0",
                  },
                ]}
              >
                <Image
                  source={agent.name}
                  style={[{ width: agent.width, height: agent.height }]}
                />
              </View>
            );
          })}
        </View>
        <View
          style={[
            {
              marginTop: 20,
              padding: 20,
              backgroundColor: "#fff",
              borderRadius: 10,
              borderBottomWidth: 1,
              borderColor: "#d0d0d0",
            },
          ]}
        >
          <Text>Lainnya</Text>
        </View>
      </View>
    </ScrollView>
  );
};
