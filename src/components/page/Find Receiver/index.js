import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import globalCss from "../../../assets/styles/globalCss";
import ContactList from "../../molecules/Contact List";
import Header from "../../molecules/Header";
import NavTab from "../../molecules/NavTab";

const FindReceiver = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const route = useRoute();

  return (
    <>
      <ScrollView>
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
          <TextInput
            cursorColor="#537FE7"
            style={[
              {
                backgroundColor: "#fff",
                padding: 15,
                fontSize: 18,
                textDecorationLine: "none",
                borderRadius: 10,
              },
            ]}
            placeholder="Search receiver here"
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        <View style={[globalCss.container, { marginTop: 10 }]}>
          <Text style={[{ fontSize: 18 }]}>All Contacts</Text>
        </View>
        <ContactList
          search={search}
          id={route.params.id}
          balance={route.params.balance}
        />
      </ScrollView>
      <NavTab
        transfer={true}
        id={route.params.id}
        balance={route.params.balance}
      />
    </>
  );
};

export default FindReceiver;
