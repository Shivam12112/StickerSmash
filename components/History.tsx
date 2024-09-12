import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { getData } from "../utils/asyncStorage";
import { FlashList } from "@shopify/flash-list";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default function History() {
  const [history, setHistory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        const res = await getData();
        setHistory(res || []);
      };

      fetchHistory();
    }, [])
  );

  const renderItem = ({ item }) => {
    let dataParts;
    let date;
    let vehicleNumber;
    let passNumber;

    if (item?.data) {
      dataParts = item?.data?.split("|");
      date = dataParts[3];
      vehicleNumber = dataParts[5];
      passNumber = dataParts[0];
    }
    const status = item?.type;
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.vehicleText}>{vehicleNumber}</Text>
          <Text style={styles.passNumberText}>{passNumber}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>HISTORY</Text>
        {history?.length ? (
          <View style={styles.listContainer}>
            <FlashList
              data={history}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              estimatedItemSize={100}
              contentContainerStyle={styles.listContent}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text style={styles.noDataText}>NO DATA</Text>
          </View>
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0.93,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#4B6478",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#3A7072",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardContent: {
    flex: 1,
  },
  dateText: {
    fontSize: 10,
    color: "#fff",
  },
  vehicleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  passNumberText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 5,
  },
  statusContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  noDataText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B6478",
    textAlign: "center",
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
});
