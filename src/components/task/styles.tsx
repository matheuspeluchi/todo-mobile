import { StyleSheet } from "react-native";
import commonStyles from "../../commonStyles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#AAA",
    borderBottomWidth: 1,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  checkContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    fontFamily: "Lato",
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: commonStyles.fontFamiy,
    color: commonStyles.colors.subText,
    fontSize: 12,
  },
});
