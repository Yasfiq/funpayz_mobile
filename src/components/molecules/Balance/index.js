import { Text, View } from "react-native";

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

const Balance = () => {
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
        {formatRupiah(200000, "rupiah")}
      </Text>
      <Text style={[{ color: "#fff" }]}>+62-858-9118-5933</Text>
    </View>
  );
};

export default Balance;
