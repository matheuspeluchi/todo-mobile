import { Platform, StyleSheet } from "react-native";
import commonStyles from "../../commonStyles";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: 'center',

  },
  header: {
    flexDirection: 'row',
    alignItems: "center",
    marginLeft: "25%",
    width: "90%"
  },
  headerIcon: {
    width: 64,
    height: 64,
    marginRight: 10
  },
  title: {
    fontFamily: commonStyles.fontFamiy,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10
  },
  subTitle: {
    fontFamily: commonStyles.fontFamiy,
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10
  },
  formContainer: {
    // backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
    width: "90%",

  },
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 15,
    fontSize: 30,
  },
  buttonGoogle: {
    alignSelf: "center", 
    width: "100%",
    marginTop: 15,
    fontSize: 30
  }
});