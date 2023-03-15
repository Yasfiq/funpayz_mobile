import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import loading from "../../../assets/images/loading.gif";

const TransactionHistory = ({ id }) => {
  const [data, setData] = useState();
  const [load, setLoad] = useState();
  useEffect(() => {
    if (load) {
      setTimeout(() => {
        setLoad(false);
      }, 2000);
    }
  }, [load]);

  useEffect(() => {
    if (!load) {
      setTimeout(() => {
        setLoad(true);
        // console.log("load home");
      }, 2000);
    }
  }, [load]);

  function formatRupiah(angka, prefix) {
    let number_string = angka.toString().replace(/[^,\d]/g, ""),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }

  useEffect(() => {
    axios
      .get(`https://funpayz.herokuapp.com/api/v1/transaction/${id}`)
      .then((res) => {
        setData(res.data.Data);
      })
      .catch((err) => setData("No transaction yet."));
  }, [id, load]);

  if (!data) {
    return (
      <View
        style={[
          {
            width: "100%",
            // height: "10%",
            // justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            // backgroundColor: "green",
          },
        ]}
      >
        <Image source={loading} style={{ width: "15%", height: 60 }} />
      </View>
    );
  } else {
    if (typeof data == "string") {
      return (
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 18,
            color: "gray",
          }}
        >
          {data}
        </Text>
      );
    } else {
      return (
        <View style={[{ marginTop: 20, marginBottom: 100 }]}>
          {data?.map((item, index) => {
            if (index > data.length - 6) {
              return (
                <View
                  key={item.id}
                  style={[
                    {
                      marginBottom: 10,
                      padding: 10,
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      elevation: 2,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <View
                    style={[
                      {
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
                        source={{
                          uri: `https://res.cloudinary.com/dcf12mtca/image/upload/v1677939306/${item.subject_image}`,
                        }}
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
                      <Text style={[{ fontSize: 18, fontWeight: "bold" }]}>
                        {item.subject_name}
                      </Text>
                      <Text>
                        {item.type == "expense" ? "Transfer" : "Accept"}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        color: item.type == "expense" ? "red" : "teal",
                      },
                    ]}
                  >
                    + {formatRupiah(item.nonimal, "rupiah")}
                  </Text>
                </View>
              );
            }
          })}
        </View>
      );
    }
  }
};

export default TransactionHistory;
