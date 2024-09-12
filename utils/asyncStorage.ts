import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (type: string, value: any) => {
  try {
    const previousData = (await getData()) || [];
    const newData = { type, data: value };

    previousData.push(newData);

    const jsonValue = JSON.stringify(previousData);
    await AsyncStorage.setItem("scanned_data", jsonValue);
    return { success: true };
  } catch (error) {
    console.error("Failed to save the data to the storage", error);
    return { success: false };
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("scanned_data");
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.error("Failed to fetch the data from storage", error);
    return [];
  }
};

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem("scanned_data");
    console.log("Data removed successfully");
  } catch (error) {
    console.error("Failed to remove the data from storage", error);
  }
};

// removeData();
