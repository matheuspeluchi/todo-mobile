import commonStyles from "@/commonStyles";
import { StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper/lib/typescript/types";


export const styles = (colors: MD3Colors) => StyleSheet.create({
  header: {
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    marginTop: 20,
  },
  avatar: {
    margin: 10,
    
  },
  title: {
    color: colors.primary,
    fontFamily: "Roboto",
    fontSize: 30,
    padding: 10
  },
  userInfo: {
    marginLeft: 10

  },
  name: {
    fontFamily: "Roboto",
    fontSize: 20,
    marginBottom: 5,
    color: commonStyles.colors.mainText

  },
  email: {
    fontSize: 10,
    fontFamily: "Roboto",
    color: commonStyles.colors.subText,
    marginBottom: 10,

  }
})