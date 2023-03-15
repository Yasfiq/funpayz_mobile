import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import globalCss from "../../../assets/styles/globalCss";
import InputLine from "../../atoms/InputLine";
import { Loading } from "../../atoms/Loading";
import Header from "../../molecules/Header";

const PersonalInformation = () => {
  const [id, setId] = useState();
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [reload, setReload] = useState();
  const [data, setData] = useState({
    username: null,
    email: "",
    phone_number: "",
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@login");
      setId(JSON.parse(jsonValue).id);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    axios
      .get(`https://funpayz.herokuapp.com/api/v1/user/${id}`)
      .then((res) => {
        setData(res.data.Data);
      })
      .catch((err) => console.log(err.response.data.Error));
  }, [id, reload]);

  const handleUpdate = () => {
    axios
      .patch(`https://funpayz.herokuapp.com/api/v1/user/${id}`, data)
      .then((res) => {
        ToastAndroid.show(res.data.Data, 5000);
        setModal(false);
        setReload(!reload);
      })
      .catch((error) => ToastAndroid.show(error.response.data.Error));
  };

  const showModal = () => {
    return (
      <Modal visible={modal} transparent={true}>
        <View
          style={[
            globalCss.centerItem,
            {
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,.3)",
            },
          ]}
        >
          <View
            style={{
              padding: 15,
              backgroundColor: "#fff",
              width: "90%",
              elevation: 4,
              borderRadius: 10,
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              Are you sure you want to change ?
            </Text>
            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <Pressable
                onPress={() => handleUpdate()}
                style={{
                  padding: 10,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#537FE7",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Yes
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setModal(false)}
                style={{
                  padding: 10,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#a9a9a9",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  No
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  if (data.username === null) {
    return <Loading />;
  } else {
    return (
      <>
        <Header navigation={navigation} title="Personal Information" />
        <ScrollView style={[globalCss.container]}>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>Username</Text>
            <InputLine
              onChange={(text) => setData({ ...data, username: text })}
              value={data.username}
              className={{ borderColor: "#dfdfdf" }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>Email</Text>
            <InputLine
              onChange={(text) => setData({ ...data, email: text })}
              value={data.email}
              className={{ borderColor: "#dfdfdf" }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>Phone Number</Text>
            <InputLine
              onChange={(text) => setData({ ...data, phone_number: text })}
              value={data.phone_number}
              className={{ borderColor: "#dfdfdf" }}
            />
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
            <Text
              style={[globalCss.btnPrimary, { fontSize: 20, marginTop: 30 }]}
            >
              Save Changes
            </Text>
          </Pressable>
          {showModal()}
        </ScrollView>
      </>
    );
  }
};

export default PersonalInformation;
