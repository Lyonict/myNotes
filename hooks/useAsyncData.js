import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (dataName, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log("jsonValue", typeof jsonValue)
    await AsyncStorage.setItem(dataName, jsonValue);
  } catch (e) {
    alert("Error storing data");
    console.log(e);
  }
};

export const getData = async (dataName) => {
  try {
    const jsonValue = await AsyncStorage.getItem(dataName);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    alert("Error getting data");
    console.log(e);
  }
};