import { StyleSheet } from "react-native";
import commonStyles from "../../commonStyles";

export const styles = StyleSheet.create({
  root: {
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  text: {
    fontFamily: commonStyles.fontFamiy,
    color: "#FFF",
    fontSize: 20,
    margin: 10
  },
  icon: {
    marginLeft: 10
  }
})