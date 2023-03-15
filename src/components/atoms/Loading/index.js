import globalCss from "../../../assets/styles/globalCss";
import loading from "../../../assets/images/loading.gif";

const { Text, View, Image } = require("react-native");

export const Loading = () => {
  return (
    <>
      <View style={[globalCss.centerItem, { width: "100%", height: "100%" }]}>
        <View
          style={[
            {
              width: "20%",
              height: "10%",
              justifyContent: "center",
            },
          ]}
        >
          <Image source={loading} style={{ width: "auto", height: "100%" }} />
        </View>
        <Text style={{ fontSize: 20 }}>Loading</Text>
      </View>
    </>
  );
};
