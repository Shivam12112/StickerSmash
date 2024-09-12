import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { storeData } from "../utils/asyncStorage";

// Consolidated state into one object
const initialState = {
  scanQR: false,
  scanData: null,
};

const HomeScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [state, setState] = useState({ ...initialState });

  const navigation = useNavigation();

  const handleScanClick = useCallback(() => {
    setState((prevState) => ({ ...prevState, scanQR: true, scanData: null }));
  }, []);

  const handleBarCodeScanned = useCallback(({ type, data }) => {
    setState({
      scanQR: false,
      scanData: { type, data },
    });
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
  }, []);

  const handleShowToastMessage = useCallback(
    (type: any) => {
      showMessage({
        message: "Transaction Status",
        description: state?.scanData
          ? type === "success"
            ? "Data successfully saved offline."
            : "There was an error while saving data."
          : "Please scan the QR Code before proceeding.",
        type: type,
        duration: 2000,
        floating: true,
        style: { marginTop: Platform.OS === "ios" ? 10 : 50 },
      });
    },
    [state?.scanData]
  );

  const handleSaveOfflineHistory = useCallback(
    (type: string) => {
      if (!state.scanData) {
        handleShowToastMessage("danger");
        return;
      }
      storeData(type, state.scanData?.data).then((res: any) => {
        if (res?.success) {
          handleShowToastMessage("success");
          setState({ ...initialState });
        } else {
          handleShowToastMessage("danger");
        }
      });
    },
    [state.scanData, handleShowToastMessage]
  );

  useFocusEffect(
    useCallback(() => {
      if (!permission?.granted) {
        requestPermission();
      }
    }, [permission, requestPermission])
  );

  const dataParts = state?.scanData?.data?.split("|") || [];
  const vehicleNumber = dataParts[5] || "";
  const passNumber = dataParts[0] || "";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/icon.png")} style={styles.logo} />
          <Text style={styles.logoText}>Tranzol</Text>
        </View>
        <View style={styles.headerIcons}>
          <Ionicons name="location" size={24} color="#4B6478" />
          <Text style={styles.enterCodeText}>Enter Code</Text>
          <MaterialIcons
            name="logout"
            size={24}
            color="#4B6478"
            onPress={() => navigation.replace("LoginScreen")}
          />
        </View>
      </View>

      <View style={styles.scannerContainer}>
        <Text style={styles.scannerText}>Scanner</Text>
        {state.scanQR ? (
          <CameraView
            onBarcodeScanned={state.scanQR ? handleBarCodeScanned : undefined}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={styles.scanBox}
          />
        ) : (
          <View style={styles.scanBox}>
            {state?.scanData ? (
              <View style={styles.scanDataContainer}>
                <Text style={styles.scanDataText}>{state?.scanData?.data}</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.scanButton}
                onPress={handleScanClick}
              >
                <Text style={styles.scanButtonText}>SCAN HERE</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter PassNo"
          value={passNumber}
          placeholderTextColor="#A3B3C5"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter TruckNo"
          value={vehicleNumber}
          placeholderTextColor="#A3B3C5"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.inButton}
          onPress={() => handleSaveOfflineHistory("IN")}
        >
          <Text style={styles.buttonText}>IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.outButton}
          onPress={() => handleSaveOfflineHistory("OUT")}
        >
          <Text style={styles.buttonText}>OUT</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 40,
  },
  logoText: {
    fontSize: 18,
    color: "#4B6478",
    marginLeft: 10,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  enterCodeText: {
    fontSize: 16,
    color: "#4B6478",
    marginHorizontal: 10,
  },
  scannerContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  scannerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4B6478",
    marginBottom: 20,
  },
  scanBox: {
    width: 200,
    height: 200,
    backgroundColor: "#276974",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  scanButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  scanButtonText: {
    color: "#276974",
    fontSize: 16,
    fontWeight: "bold",
  },
  scanDataContainer: {
    padding: 18,
  },
  scanDataText: {
    color: "#fff",
  },
  inputContainer: {
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#276974",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
    color: "#4B6478",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inButton: {
    backgroundColor: "#276974",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  outButton: {
    backgroundColor: "#276974",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
