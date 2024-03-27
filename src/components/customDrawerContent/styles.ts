import commonStyles from "@/commonStyles";
import { StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper/lib/typescript/types";


export const styles = (colors: MD3Colors) => StyleSheet.create({
  header: {
    width: 275,
    marginHorizontal: 3
    
  },
  avatar: {
    margin: 10,    
  },
  logo: {
    width: 48,
    height: 48,
    resizeMode: "stretch",
    marginHorizontal: 10
  },
  title: {
    color: commonStyles.colors.mainText,
    fontFamily: "Roboto",
    fontSize: 30,
    marginBottom: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent:"center",
  },
  user: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
  userInfo: {
    width: 190,
    marginTop: 10,
    alignItems: "center",
    
  },
  name: {
    fontFamily: "Roboto",
    fontSize: 20,
    marginBottom: 5,
    color: commonStyles.colors.mainText

  },
  email: {
    textAlign: "center",    
    fontSize: 12,
    flexWrap: "wrap",
    fontFamily: "Roboto",
    color: commonStyles.colors.subText,
    marginBottom: 10,

  }
})