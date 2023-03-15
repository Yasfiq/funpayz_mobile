import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import globalCss from "../../../assets/styles/globalCss";
import Brand from "../../atoms/Brand";
import { Ionicons } from "@expo/vector-icons";

export default ConfirmOtp = () => {
  const [confimOtp, setConfirmOtp] = useState();
  const [error, setError] = useState();
  const route = useRoute();
  const [modal, setModal] = useState(false);
  const navigation = useNavigation();
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
            <Text style={[{ textAlign: "center", fontSize: 16 }]}>
              Verified
            </Text>
            <Text style={[{ marginTop: 10, textAlign: "center" }]}>
              Please login to your account!
            </Text>
            <Pressable
              android_ripple={{
                color: "#d3def9",
                radius: 30,
                borderless: true,
                foreground: true,
              }}
              onPress={() => {
                if (route.params.isLogin != undefined) {
                  navigation.navigate("confirm-pin");
                } else {
                  navigation.navigate("login");
                }
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

  const handleConfirmPin = () => {
    if (confimOtp == route.params.otp) {
      const data = { email: route.params.email };
      axios
        .patch(`https://funpayz.herokuapp.com/api/v1/auth/activated`, data)
        .then((res) => {
          setModal(true);
        })
        .catch((err) => console.log(err.response.data.Error));
    } else {
      setError("OTP code is wrong!");
    }
  };

  return (
    <View
      style={[{ width: "100%", height: "100%", backgroundColor: "#f2f2f2" }]}
    >
      <View
        style={[
          globalCss.container,
          globalCss.centerItem,
          { width: "100%", paddingTop: "20%", paddingBottom: "10%" },
        ]}
      >
        <Brand className={{ fontSize: 40 }} />
      </View>
      <View
        style={[
          globalCss.container,
          {
            backgroundColor: "#fff",
            paddingVertical: 50,
            borderTopLeftRadius: 50,
            borderTopEndRadius: 70,
            height: "100%",
          },
        ]}
      >
        <Text
          style={[
            {
              fontSize: 28,
              fontWeight: "bold",
              marginBottom: 10,
              textAlign: "center",
            },
          ]}
        >
          Please input your OTP
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "#92979f",
          }}
        >
          We have sent your OTP {`(One Time Password)`} code via Email
        </Text>
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <TextInput
            cursorColor="#537FE7"
            style={[
              {
                borderWidth: 2,
                borderColor: "#9a9a9a",
                padding: 10,
                width: "80%",
                borderRadius: 10,
                fontSize: 18,
              },
            ]}
            onChangeText={(text) => {
              setError("");
              setConfirmOtp(text);
            }}
          />
        </View>
        {error && (
          <Text style={[{ marginTop: 10, color: "red", textAlign: "center" }]}>
            {error}
          </Text>
        )}
        <View style={{ alignItems: "center" }}>
          <Pressable style={{ width: "70%", marginTop: 20 }}>
            <Text
              style={[globalCss.btnPrimary, { fontSize: 20 }]}
              onPress={() => handleConfirmPin()}
            >
              Confirm
            </Text>
          </Pressable>
        </View>
        <Text
          style={[
            {
              marginTop: 20,
              textAlign: "center",
              color: "#537FE7",
              fontWeight: "bold",
            },
          ]}
        >
          Send OTP Again
        </Text>
      </View>
      {showModal()}
    </View>
  );
};
