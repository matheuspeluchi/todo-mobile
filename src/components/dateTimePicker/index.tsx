import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

// import { Container } from './styles';

interface DatePickerProps {
  onChange: (date: Date) => void;
  date: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, onChange: setDate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDatePicker = (date: Date) => {
    setDate(date as Date);
    setShowDatePicker(false);
  };
  let datePicker = (
    <DateTimePicker
      value={date}
      dateFormat="dayofweek day month"
      locale="pt-br"
      display="spinner"
      onChange={(_, dt) => handleDatePicker(dt as Date)}
    />
  );
  const stringDate = moment(date).format("ddd, D [de] MMMM [de] YYYY");
  if (Platform.OS === "android") {
    datePicker = (
      <View style={styles.root}>
        <TouchableOpacity
          style={styles.root}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.date}>{stringDate}</Text>
        </TouchableOpacity>
        {showDatePicker && datePicker}
      </View>
    );
  }
  return datePicker;
};

export default DatePicker;
