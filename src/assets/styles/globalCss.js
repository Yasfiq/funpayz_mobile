import { StyleSheet } from "react-native";

const globalCss = StyleSheet.create({
  // Brand
  brand: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#537FE7",
  },
  brandWhite: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  // Container
  container: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  // Center Item
  centerItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  // Button
  btnDisabled: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#DADADA",
    color: "#88888F",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 10,
  },
  btnPrimary: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#537FE7",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 10,
  },
  btnSecondary: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#EAEDFF",
    color: "#2a2c30",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 10,
  },
});

export default globalCss;
