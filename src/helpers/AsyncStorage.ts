import AsyncStorage from "@react-native-async-storage/async-storage";

const setItemToAsyncStorage = async (key: string, value: any) => {
  const data = await getItemFromAsyncStorage(key);

  console.log("value", value);

  const finalDataFormatted = JSON.stringify([...data, value]);

  await AsyncStorage.setItem(key, finalDataFormatted);
};

const setItemWhenDataIsOneValue = async (
  key: string,
  value: boolean | Date
) => {
  await AsyncStorage.setItem(key, JSON.stringify([value]));
};

const getItemFromAsyncStorage = async (key: string) => {
  const response = await AsyncStorage.getItem(key);
  return response ? JSON.parse(response) : [];
};

const deleteItemFromAsyncStorage = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};
export {
  setItemToAsyncStorage,
  getItemFromAsyncStorage,
  setItemWhenDataIsOneValue,
  deleteItemFromAsyncStorage,
};
