import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const { useState } = require("react");
const { View, TextInput, Text, Modal, Pressable } = require("react-native");
const { default: globalCss } = require("../../../assets/styles/globalCss");
const { default: toCurrency } = require("../../../utils/Function/toCurrency");
const { default: Header } = require("../../molecules/Header");
import { Ionicons } from "@expo/vector-icons";

export default AmountTopup = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    amount: "",
  });
  const route = useRoute();
  const [modal, setModal] = useState(false);

  const handleTopup = () => {
    axios
      .post(
        `https://funpayz.herokuapp.com/api/v1/transaction/topup/${route.params.id}`,
        { nominal: data.amount.replace(/["Rp.",\s]/g, "") }
      )
      .then((res) => {
        setModal(true);
      })
      .catch((err) => console.log(err));
  };

  const showModal = () => {
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
            <Ionicons
              name="checkmark-circle"
              size={40}
              color="#1EC15F"
              style={[{ textAlign: "center" }]}
            />
            <Text style={[{ textAlign: "center", fontSize: 16 }]}>Success</Text>
            <Pressable
              android_ripple={{
                color: "#d3def9",
                radius: 30,
                borderless: true,
                foreground: true,
              }}
              onPress={() => {
                navigation.navigate("home", { id: route.params.id });
              }}
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
                OK
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      <Header navigation={navigation} title="Topup" />
      <View style={[globalCss.container, { marginTop: 20 }]}>
        <TextInput
          placeholder="0.00"
          cursorColor="#537FE7"
          keyboardType="number-pad"
          style={[
            {
              borderWidth: 2,
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              fontSize: 18,
              color: "#537FE7",
              fontWeight: "600",
            },
            data.amount &&
            parseInt(data.amount.replace(/["Rp.",\s]/g, "")) !== 0 &&
            data.amount.replace(/["Rp.",\s]/g, "").length !== 0
              ? { borderColor: "#537FE7" }
              : { borderColor: "#9a9a9a" },
          ]}
          onChangeText={(text) => setData({ ...data, amount: text })}
          value={data.amount ? toCurrency(data.amount, "rupiah") : ""}
        />
        <Text
          style={[{ marginVertical: 10, textAlign: "center", fontSize: 18 }]}
        >
          Min. {toCurrency(10000, "rupiah")}
        </Text>
        {data.amount &&
        parseInt(data.amount.replace(/["Rp.",\s]/g, "")) !== 0 &&
        data.amount.replace(/["Rp.",\s]/g, "").length !== 0 &&
        parseInt(data.amount.replace(/["Rp.",\s]/g, "")) >= 10000 ? (
          <Text
            style={[globalCss.btnPrimary, { fontSize: 20 }]}
            onPress={() => handleTopup()}
          >
            Continue
          </Text>
        ) : (
          <Text style={[globalCss.btnDisabled, { fontSize: 20 }]}>
            Continue
          </Text>
        )}
      </View>
      {showModal()}
    </View>
  );
};
