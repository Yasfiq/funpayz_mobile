import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
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
  const route = useRoute();
  console.log(route.params.data);
  const [modal, setModal] = useState(false);

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
              <Text
                style={[{ fontSize: 18, fontWeight: "bold", color: "#000" }]}
              >
                Yasfiq
              </Text>
              <Text style={[{ color: "#000" }]}>+62 858 9118 5933</Text>
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
          <Text>Amount</Text>
          <Text>{route.params.data.amount}</Text>
          <Text>Balance Left</Text>
          <Text>{toCurrency(20000, "rupiah")}</Text>
          <Text>Date & Time</Text>
          <Text>May, 11 2023 09.00</Text>
          <Text>Notes</Text>
          <Text>{route.params.data.note}</Text>
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
