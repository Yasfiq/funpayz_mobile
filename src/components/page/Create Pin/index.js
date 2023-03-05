import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import globalCss from "../../../assets/styles/globalCss";
import Brand from "../../atoms/Brand";
import axios from "axios";

const FormPin = ({ navigation }) => {
  const [pin, setPin] = useState(new Array(6).fill(""));
  let [activePin, setActivePin] = useState(0);
  const inputRef = useRef(null);
  const [focus, setFocus] = useState({ borderColor: "#DADADA" });
  const [id, setId] = useState();
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@login");
      setId(JSON.parse(jsonValue).id);
      setData(JSON.parse(jsonValue));
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@login", jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (text, index) => {
    const newPin = [...pin];
    newPin[index] = text.substring(text.length - 1);

    if (!text) setActivePin(index - 1);
    else setActivePin(index + 1);

    setPin(newPin);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activePin]);

  const handleKeyPress = (key, index) => {
    if (key == "Backspace") {
      activePin = index + 1;
      setActivePin(activePin - 1);
    }
  };

  useEffect(() => {
    if (pin.join("").length === 6) {
      setFocus({ borderColor: "#537FE7" });
    } else {
      setFocus({ borderColor: "#DADADA" });
    }
  }, [pin]);

  const handleCreatePin = () => {
    axios
      .patch(`http://192.168.1.6:5000/api/v1/user/${id}`, {
        pin_number: pin,
      })
      .then(async (res) => {
        setModal(true);
        await storeData({ ...data, active_pin: true });
        navigation.navigate("home", { load: true });
      })
      .catch((err) => console.log(err.response.data));
  };

  const showModal = () => {
    return <Modal visible={modal}></Modal>;
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
          Create Security PIN
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "#92979f",
          }}
        >
          Create a PIN that's contain 6 digits number for security purpose in
          Funpayz.
        </Text>
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <FlatList
            horizontal={true}
            data={pin}
            renderItem={({ item, index }) => {
              return (
                <View key={index}>
                  <TextInput
                    keyboardType="number-pad"
                    ref={index === activePin ? inputRef : null}
                    style={[
                      {
                        borderWidth: 2,
                        height: 50,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        textAlign: "center",
                        fontSize: 20,
                        marginRight: 10,
                      },
                      focus && focus,
                    ]}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(key) => handleKeyPress(key, index)}
                    value={pin[index]}
                  />
                </View>
              );
            }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Pressable style={{ width: "70%", marginTop: 40 }}>
            {pin.join("").length === 6 ? (
              <Text
                style={[globalCss.btnPrimary, { fontSize: 20 }]}
                onPress={() => handleCreatePin()}
              >
                Confirm
              </Text>
            ) : (
              <Text style={[globalCss.btnDisabled, { fontSize: 20 }]}>
                Confirm
              </Text>
            )}
          </Pressable>
        </View>
      </View>
      {showModal()}
    </View>
  );
};

export default FormPin;
