import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import globalCss from "../../../assets/styles/globalCss";
import toCurrency from "../../../utils/Function/toCurrency";
import Header from "../../molecules/Header";

export default Confirmation = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const route = useRoute();
  const [modal, setModal] = useState(false);
  const time = new Date();
  const balance_left =
    route.params.balance - route.params.data.amount.replace(/["Rp.",\s]/g, "");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = `${
    months[time.getMonth()]
  } ${time.getDate()}, ${time.getFullYear()} - ${time.getHours()}.${time.getMinutes()}`;
  const [pin, setPin] = useState("");

  useEffect(() => {
    axios
      .get(`https://funpayz.herokuapp.com/api/v1/user/${route.params.user_id}`)
      .then((res) => {
        setUser(res.data.Data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleConfirmPin = () => {
    axios
      .post(
        `https://funpayz.herokuapp.com/api/v1/user/confirm-pin/${route.params.user_id}`,
        {
          pin: pin.split(""),
        }
      )
      .then((res) => {
        axios
          .post(
            `https://funpayz.herokuapp.com/api/v1/transaction/${route.params.dataUser.id}`,
            {
              user_id: route.params.user_id,
              username: user.id,
              user_phone: user.phone_number,
              nominal: route.params.data.amount.replace(/["Rp.",\s]/g, ""),
              notes: route.params.data.note,
              time: date,
              phone_number: route.params.data.phone_number,
              subject_name: route.params.data.username,
            }
          )
          .then((result) => {
            setModal(false);
            alert("Success");
            navigation.navigate("home", { id: route.params.user_id });
          })
          .catch((error) => console.log(error.response.data.Error));
      })
      .catch((err) => console.log(err.response.data.Error));
  };

  useEffect(() => {
    if (pin.length == 6) {
      handleConfirmPin();
    }
  }, [pin]);

  const showConfirmPin = () => {
    return (
      <Modal visible={modal} transparent={true}>
        <View
          style={[
            {
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,.5)",
            },
            globalCss.centerItem,
          ]}
        >
          <View
            style={[
              {
                width: "70%",
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 10,
              },
            ]}
          >
            <Text
              style={[{ marginBottom: 10, textAlign: "center", fontSize: 16 }]}
            >
              Enter PIN to transfer
            </Text>
            <TextInput
              cursorColor="#537FE7"
              style={[
                {
                  borderWidth: 2,
                  borderColor: "#9a9a9a",
                  padding: 10,
                  width: "100%",
                  borderRadius: 10,
                  fontSize: 18,
                },
              ]}
              keyboardType="number-pad"
              onChangeText={(text) => setPin(text)}
            />
            {/* <Text style={[{ marginVertical: 5, color: "#ff4a42" }]}>
              PIN is wrong!
            </Text> */}
            <Pressable
              android_ripple={{
                color: "#d3def9",
                radius: 30,
                borderless: true,
                foreground: true,
              }}
              onPress={() => setModal(false)}
            >
              <Text
                style={[
                  {
                    marginTop: 10,
                    padding: 5,
                    paddingVertical: 10,
                    textAlign: "center",
                    color: "#537FE7",
                    fontSize: 16,
                    backgroundColor: "#ebebeb",
                  },
                ]}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      <Header navigation={navigation} title="Confirmation" />
      <View style={[globalCss.container]}>
        <Text style={[{ fontSize: 20 }]}>Transfer to</Text>
        <View
          style={[
            {
              marginTop: 10,
              padding: 15,
              backgroundColor: "#fff",
              borderRadius: 20,
              elevation: 3,
            },
          ]}
        >
          <View
            style={[
              {
                borderRadius: 8,
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
                  uri: `https://res.cloudinary.com/dcf12mtca/image/upload/v1677939306/${route.params.dataUser.image}.webp`,
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
              <Text
                style={[{ fontSize: 18, fontWeight: "bold", color: "#000" }]}
              >
                {route.params.dataUser.username}
              </Text>
              <Text style={[{ color: "#000" }]}>
                {route.params.dataUser.phone_number}
              </Text>
            </View>
          </View>
        </View>
        <Text style={[{ fontSize: 20, marginVertical: 10 }]}>Details</Text>
        <View
          style={[
            {
              padding: 15,
              backgroundColor: "#fff",
              borderRadius: 15,
            },
          ]}
        >
          <Text style={[{ fontWeight: "bold" }]}>Amount</Text>
          <Text style={[{ marginBottom: 5 }]}>
            {toCurrency(
              route.params.data.amount.replace(/["Rp.",\s]/g, ""),
              "rupiah"
            )}
          </Text>
          <Text style={[{ fontWeight: "bold" }]}>Balance Left</Text>
          <Text style={[{ marginBottom: 5 }]}>
            {toCurrency(balance_left, "rupiah")}
          </Text>
          <Text style={[{ fontWeight: "bold" }]}>Date & Time</Text>
          <Text style={[{ marginBottom: 5 }]}>{date}</Text>
          <Text style={[{ fontWeight: "bold" }]}>Notes</Text>
          <Text style={[{ marginBottom: 5 }]}>{route.params.data.note}</Text>
        </View>
        <Pressable
          android_ripple={{
            color: "#d3def9",
            radius: 20,
            borderless: true,
            foreground: true,
          }}
          onPress={() => setModal(true)}
        >
          <Text style={[globalCss.btnPrimary, { fontSize: 20, marginTop: 30 }]}>
            Continue
          </Text>
        </Pressable>
      </View>
      {showConfirmPin()}
    </View>
  );
};
