import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import globalCss from "../../../assets/styles/globalCss";
import Header from "../../molecules/Header";
import InputLine from "../../atoms/InputLine";
import toRupiah from "../../../utils/Function/toCurrency";

export default AmountInput = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name } = route.params;
  const [data, setData] = useState({
    note: "",
  });

  // console.log(parseInt(data.amount.replace(/["Rp.",\s]/g, "")));

  return (
    <View>
      <Header navigation={navigation} title="Transfer" />
      <View
        style={[
          {
            padding: 15,
            backgroundColor: "#537FE7",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
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
            <Text style={[{ fontSize: 18, fontWeight: "bold", color: "#fff" }]}>
              {name}
            </Text>
            <Text style={[{ color: "#fff" }]}>+62 858 9118 5933</Text>
          </View>
        </View>
      </View>
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
          value={data.amount ? toRupiah(data.amount, "rupiah") : ""}
        />
        <Text
          style={[{ marginVertical: 10, textAlign: "center", fontSize: 18 }]}
        >
          {toRupiah(120000, "rupiah")} Available
        </Text>
        <InputLine
          parentClass={{ marginTop: 20, marginBottom: 50 }}
          className={{
            paddingVertical: 0,
            borderColor: data.note.length == 0 ? "#9a9a9a" : "#537FE7",
          }}
          icon={<Text style={[{ fontSize: 18 }]}>Note :</Text>}
          onChange={(text) => setData({ ...data, note: text })}
        />
        {data.amount &&
        parseInt(data.amount.replace(/["Rp.",\s]/g, "")) !== 0 &&
        data.amount.replace(/["Rp.",\s]/g, "").length !== 0 &&
        parseInt(data.amount.replace(/["Rp.",\s]/g, "")) <= 120000 ? (
          <Text
            style={[globalCss.btnPrimary, { fontSize: 20 }]}
            onPress={() => navigation.navigate("confirmation", { data })}
          >
            Continue
          </Text>
        ) : (
          <Text style={[globalCss.btnDisabled, { fontSize: 20 }]}>
            Continue
          </Text>
        )}
      </View>
    </View>
  );
};
