import { FlatList, Image, ScrollView, Text, View } from "react-native";

const TransactionHistory = () => {
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

  return (
    <View style={[{ marginTop: 20 }]}>
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return (
          <View
            key={item}
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
                { flexDirection: "row", alignItems: "center", columnGap: 10 },
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
                <Text style={[{ fontSize: 18, fontWeight: "bold" }]}>
                  Jhonson Gridle
                </Text>
                <Text>Transfer</Text>
              </View>
            </View>
            <Text style={[{ fontSize: 16, color: "teal" }]}>
              + {formatRupiah(50000)}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default TransactionHistory;
