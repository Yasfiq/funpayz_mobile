import { ScrollView, Text, TextInput, View } from "react-native";
import globalCss from "../../../assets/styles/globalCss";
import ContactList from "../../molecules/Contact List";
import Header from "../../molecules/Header";

const FindReceiver = ({ navigation }) => {
  return (
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
        />
      </View>
      <View style={[globalCss.container, { marginTop: 10 }]}>
        <Text style={[{ fontSize: 18 }]}>All Contacts</Text>
        <Text style={[{ fontSize: 14, fontWeight: 300 }]}>
          10 contact found
        </Text>
      </View>
      <ContactList />
    </ScrollView>
  );
};

export default FindReceiver;
