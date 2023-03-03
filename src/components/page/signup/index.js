import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import globalCss from "../../../assets/styles/globalCss";
import Brand from "../../atoms/Brand";
import InputLine from "../../atoms/InputLine";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Signup = ({ navigation }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState();

  return (
    <>
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
              display: "flex",
              backgroundColor: "#fff",
              alignItems: "center",
              paddingVertical: 50,
              borderTopLeftRadius: 50,
              borderTopEndRadius: 70,
              height: "100%",
            },
          ]}
        >
          <Text
            style={[{ fontSize: 28, fontWeight: "bold", marginBottom: 10 }]}
          >
            Signup
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              maxWidth: "90%",
              color: "#92979f",
            }}
          >
            Create your account to access FunPayz.
          </Text>
          <InputLine
            parentClass={{ marginTop: 50 }}
            className={
              data.email.length > 0
                ? { borderColor: "#537FE7" }
                : { borderColor: "#dfdfdf" }
            }
            label="Enter your username"
            icon={
              <AntDesign
                name="user"
                size={30}
                color={data.username.length > 0 ? "#537FE7" : "#d0d0d0"}
              />
            }
            onChange={(text) => setData({ ...data, username: text })}
            value={data.username}
          />
          <InputLine
            parentClass={{ marginTop: 20 }}
            className={
              data.email.length > 0
                ? { borderColor: "#537FE7" }
                : { borderColor: "#dfdfdf" }
            }
            label="Enter your e-mail"
            icon={
              <Ionicons
                name="mail-outline"
                size={30}
                color={data.email.length > 0 ? "#537FE7" : "#d0d0d0"}
              />
            }
            onChange={(text) => setData({ ...data, email: text })}
            value={data.email}
            type="email-address"
          />
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 15,
              },
            ]}
          >
            <InputLine
              parentClass={{ marginTop: 20 }}
              className={
                data.password.length > 0
                  ? { borderColor: "#537FE7" }
                  : { borderColor: "#dfdfdf" }
              }
              label="Enter your password"
              icon={
                <Feather
                  name="lock"
                  size={30}
                  color={data.password.length > 0 ? "#537FE7" : "#d0d0d0"}
                />
              }
              onChange={(text) => setData({ ...data, password: text })}
              value={data.password}
              secure={show ? false : true}
            />
            <Ionicons
              name={show ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={show ? "#537FE7" : "black"}
              style={{ marginBottom: -30 }}
              onPress={() => (show ? setShow(false) : setShow(true))}
            />
          </View>
          <Text
            style={[
              {
                textAlign: "right",
                width: "100%",
                marginTop: 40,
                color: "#92979f",
                fontSize: 16,
                paddingHorizontal: 10,
              },
            ]}
          >
            Forgot password?
          </Text>
          <Pressable style={{ width: "70%", marginTop: 70 }}>
            {data.email.length > 0 &&
            data.password.length > 0 &&
            data.username.length > 0 ? (
              <Text style={[globalCss.btnPrimary, { fontSize: 20 }]}>
                Signup
              </Text>
            ) : (
              <Text style={[globalCss.btnDisabled, { fontSize: 20 }]}>
                Signup
              </Text>
            )}
          </Pressable>
          <Text style={{ marginTop: 20, fontSize: 16 }}>
            Already have an account? Let's{" "}
            <Text
              style={{ color: "#537FE7" }}
              onPress={() => navigation.navigate("login")}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
};

export default Signup;
