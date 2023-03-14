import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import globalCss from "../../../assets/styles/globalCss";
import Header from "../../molecules/Header";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    axios
      .get(`https://funpayz.herokuapp.com/api/v1/user/${route.params.id}`)
      .then((res) => {
        setData(res.data.Data);
      })
      .catch((err) => console.log(err.response.data.Error));
  }, []);

  const profileModal = () => {
    return (
      <Modal
        visible={modal}
        transparent={true}
        onRequestClose={() => setModal(false)}
      >
        <View
          style={[
            {
              padding: 20,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,.9))",
            },
          ]}
        >
          <AntDesign
            name="arrowleft"
            size={40}
            color="white"
            onPress={() => setModal(false)}
          />
          <View style={[{ marginTop: "40%" }]}>
            <Image
              source={
                data
                  ? {
                      uri: `https://res.cloudinary.com/dcf12mtca/image/upload/v1677939306/${data.image}.webp`,
                    }
                  : {
                      uri: "https://res.cloudinary.com/dcf12mtca/image/upload/v1677939306/default.webp",
                    }
              }
              style={[
                {
                  width: "100%",
                  height: "80%",
                  resizeMode: "cover",
                },
              ]}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const editModal = () => {
    return (
      <Modal
        visible={edit}
        transparent={true}
        onRequestClose={() => setEdit(false)}
      >
        <View
          style={[
            {
              justifyContent: "flex-end",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,.3)",
            },
          ]}
        >
          <View
            style={[
              { backgroundColor: "#fff", padding: 20, flexDirection: "row" },
            ]}
          >
            <View style={[{ alignItems: "center", flex: 1 }]}>
              <View
                style={[
                  globalCss.centerItem,
                  {
                    borderWidth: 2,
                    width: 50,
                    height: 50,
                    padding: 5,
                    borderRadius: 50,
                    borderColor: "#537FE7",
                  },
                ]}
              >
                <Entypo name="images" size={24} color="#537FE7" />
              </View>
              <Text>From Gallery</Text>
            </View>
            <View style={[{ alignItems: "center", flex: 1 }]}>
              <View
                style={[
                  globalCss.centerItem,
                  {
                    borderWidth: 2,
                    width: 50,
                    height: 50,
                    padding: 5,
                    borderRadius: 50,
                    borderColor: "#537FE7",
                  },
                ]}
              >
                <Entypo name="camera" size={24} color="#537FE7" />
              </View>
              <Text>Camera</Text>
            </View>
            <View style={[{ alignItems: "center", flex: 1 }]}>
              <View
                style={[
                  globalCss.centerItem,
                  {
                    borderWidth: 2,
                    width: 50,
                    height: 50,
                    padding: 5,
                    borderRadius: 50,
                    borderColor: "#537FE7",
                  },
                ]}
              >
                <FontAwesome5 name="trash" size={24} color="#537FE7" />
              </View>
              <Text>Delete</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <ScrollView>
        {profileModal()}
        {editModal()}
        <Header navigation={navigation} title="Profile" />
        <View style={[globalCss.container, globalCss.centerItem]}>
          <View
            style={{
              // elevation: 8,
              width: 100,
              height: 100,
              //   overflow: "hidden",
            }}
          >
            <Pressable
              android_ripple={{
                color: "#d3def9",
                radius: 30,
                borderless: true,
                foreground: true,
              }}
              onPress={() => setModal(true)}
            >
              <Image
                source={
                  data
                    ? {
                        uri: `https://res.cloudinary.com/dcf12mtca/image/upload/v1677939306/${data.image}.webp`,
                      }
                    : {
                        uri: "https://res.cloudinary.com/dcf12mtca/image/upload/v1677939306/default.webp",
                      }
                }
                style={[
                  {
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: 15,
                  },
                ]}
              />
            </Pressable>
            <View
              style={[
                {
                  position: "absolute",
                  bottom: -10,
                  right: -10,
                  padding: 5,
                  backgroundColor: "#537FE7",
                  borderRadius: 50,
                },
              ]}
            >
              <Entypo
                name="camera"
                size={24}
                color="white"
                onPress={() => setEdit(true)}
              />
            </View>
          </View>
          <Text style={[{ marginTop: 20, fontSize: 20, fontWeight: "bold" }]}>
            {data?.username}
          </Text>
          <Text>{data?.phone_number}</Text>
          <View
            style={[
              {
                padding: 15,
                backgroundColor: "#fff",
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 10,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                elevation: 2,
              },
            ]}
          >
            <Text style={[{ fontSize: 18 }]}>Personal Information</Text>
          </View>
          <View
            style={[
              {
                padding: 15,
                backgroundColor: "#fff",
                borderRadius: 10,
                marginBottom: 10,
                width: "100%",
                elevation: 2,
              },
            ]}
          >
            <Text style={[{ fontSize: 18 }]}>Change Password</Text>
          </View>
          <View
            style={[
              {
                padding: 15,
                backgroundColor: "#fff",
                borderRadius: 10,
                marginBottom: 10,
                width: "100%",
                elevation: 2,
              },
            ]}
          >
            <Text style={[{ fontSize: 18 }]}>Change PIN</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
