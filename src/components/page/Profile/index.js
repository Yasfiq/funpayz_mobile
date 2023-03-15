import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import globalCss from "../../../assets/styles/globalCss";
import Header from "../../molecules/Header";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import NavTab from "../../molecules/NavTab";
import { Loading } from "../../atoms/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [load, setLoad] = useState();

  useFocusEffect(
    React.useCallback(() => {
      setData(false);
      axios
        .get(`https://funpayz.herokuapp.com/api/v1/user/${route.params.id}`)
        .then((res) => {
          setData(res.data.Data);
        })
        .catch((err) => console.log(err.response.data.Error));
    }, [editLoad, load])
  );

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

  // const [image, setImage] = useState(null);
  const [editLoad, setEditLoad] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setEditLoad(true);
      const formedit = new FormData();
      // formedit.append("image", result.assets[0]);
      formedit.append("image", {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "profile.jpg",
      });
      axios
        .patch(
          `https://funpayz.herokuapp.com/api/v1/user/${route.params.id}`,
          formedit,
          {
            method: "PATCH",
            headers: {
              "Content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setEdit(false);
          setLoad(!load);
          setEditLoad(false);
        })
        .catch((error) => {
          setEditLoad(false);
          setEdit(false);
          setLoad(!load);
          ToastAndroid.show("Image is not supported!", 5000);
        });
    } else if (result.canceled) {
      setEdit(false);
    }
  };

  const takeImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setEditLoad(true);
      const formedit = new FormData();
      // formedit.append("image", result.assets[0]);
      formedit.append("image", {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "profile.jpg",
      });
      axios
        .patch(
          `https://funpayz.herokuapp.com/api/v1/user/${route.params.id}`,
          formedit,
          {
            method: "PATCH",
            headers: {
              "Content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setEdit(false);
          setEditLoad(false);
          setLoad(!load);
        })
        .catch((error) => {
          setEditLoad(false);
          setEdit(false);
          setLoad(!load);
          ToastAndroid.show("Image is not supported!", 2000);
        });
    } else if (result.canceled) {
      setEdit(false);
    }
  };

  const deleteImage = () => {
    setEditLoad(true);
    const formedit = new FormData();
    // formedit.append("image", result.assets[0]);
    formedit.append("image", {
      uri: "https://res.cloudinary.com/dcf12mtca/image/upload/v1677937927/funpayz/default_ynmm89.webp",
      type: "image/webp",
      name: "profile.webp",
    });
    axios
      .patch(
        `https://funpayz.herokuapp.com/api/v1/user/${route.params.id}`,
        formedit,
        {
          method: "PATCH",
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setEdit(false);
        setEditLoad(false);
        setLoad(!load);
      })
      .catch((error) => {
        setEditLoad(false);
        setEdit(false);
        setLoad(!load);
        ToastAndroid.show("Image is not supported!", 2000);
      });
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
            <Pressable
              android_ripple={{
                color: "#d3def9",
                radius: 20,
                borderless: true,
                foreground: true,
              }}
              onPress={() => pickImage()}
              style={[{ alignItems: "center", flex: 1 }]}
            >
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
            </Pressable>
            <Pressable
              android_ripple={{
                color: "#d3def9",
                radius: 20,
                borderless: true,
                foreground: true,
              }}
              onPress={() => takeImage()}
              style={[{ alignItems: "center", flex: 1 }]}
            >
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
            </Pressable>
            <Pressable
              android_ripple={{
                color: "#d3def9",
                radius: 20,
                borderless: true,
                foreground: true,
              }}
              onPress={() => deleteImage()}
              style={[{ alignItems: "center", flex: 1 }]}
            >
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
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@login");
      navigation.navigate("home");
    } catch (e) {
      // remove error
      alert("Failed to logout!");
    }
  };

  const showModal = () => {
    return (
      <Modal visible={editLoad} transparent={true}>
        <Loading />
      </Modal>
    );
  };

  if (!data) {
    return <Loading />;
  } else {
    return (
      <>
        <ScrollView>
          {profileModal()}
          {editModal()}
          {showModal()}
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
                  source={{
                    uri: `https://res.cloudinary.com/dcf12mtca/image/upload/v1677939306/${data.image}.webp`,
                  }}
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
            <Pressable
              android_ripple={{
                color: "#d3def9",
                radius: 20,
                borderless: true,
                foreground: true,
              }}
              onPress={() => navigation.navigate("personal-information")}
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
            </Pressable>
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
            <Pressable
              onPress={() => handleLogout()}
              android_ripple={{
                color: "#d3def9",
                radius: 20,
                borderless: true,
                foreground: true,
              }}
              style={[{ marginTop: 30 }]}
            >
              <Text style={[{ fontSize: 20, color: "red" }]}>Logout</Text>
            </Pressable>
          </View>
        </ScrollView>
        <NavTab
          profile={true}
          id={route.params.id}
          balance={data && data.balance}
        />
      </>
    );
  }
};
