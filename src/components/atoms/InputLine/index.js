import { Text, TextInput, View, mode } from "react-native";

const InputLine = ({
  parentClass,
  className,
  label,
  defaulValue,
  value,
  type,
  secure,
  onChange,
  icon,
}) => {
  return (
    <>
      <View
        style={[parentClass, { flexDirection: "row", alignItems: "center" }]}
      >
        {icon}
        <TextInput
          cursorColor={"#537FE7"}
          style={[
            className,
            { padding: 5, borderBottomWidth: 2, marginLeft: 10, width: "80%" },
          ]}
          placeholder={label}
          onChangeText={(text) => onChange(text)}
          value={value}
          keyboardType={type}
          secureTextEntry={secure}
          defaultValue={defaulValue}
        />
      </View>
    </>
  );
};

export default InputLine;
