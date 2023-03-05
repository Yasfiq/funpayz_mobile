import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import toCurrency from "../../../utils/Function/toCurrency";

const Balance = ({ balance, phone }) => {
  return (
    <View
      style={[
        {
          marginVertical: 20,
          padding: 20,
          backgroundColor: "#537FE7",
          borderRadius: 20,
        },
      ]}
    >
      <Text style={[{ color: "#fff", fontWeight: 300, fontSize: 16 }]}>
        Balance
      </Text>
      <Text
        style={[
          {
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
            marginVertical: 5,
          },
        ]}
      >
        {balance && toCurrency(balance, "rupiah")}
      </Text>
      <Text style={[{ color: "#fff" }]}>{phone && phone}</Text>
    </View>
  );
};

export default Balance;
