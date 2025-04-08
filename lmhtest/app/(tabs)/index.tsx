import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";

const TableExample = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(
          "https://incldigitrans-5881.restdb.io/rest/cases-disease",
          {
            headers: {
              "Content-Type": "application/json",
              "x-apikey": "67f3e466636df6b1f15d955a",
              "cache-control": "no-cache",
            },
          }
        );

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const filteredData = data.filter((item) =>
    item["Disease Classification"]?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ScrollView horizontal>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🩺 Patient Records</Text>

        {/* Filter Input */}
        <TextInput
          placeholder="Filter by disease..."
          placeholderTextColor="#888"
          value={filter}
          onChangeText={setFilter}
          style={styles.input}
        />

        {loading ? (
          <ActivityIndicator
            color="#fff"
            size="large"
            style={{ marginTop: 20 }}
          />
        ) : (
          <>
            {/* Header */}
            <View style={[styles.row, styles.header]}>
              <Text style={[styles.cell, styles.headerText]}>Date</Text>
              <Text style={[styles.cell, styles.headerText]}>Gender</Text>
              <Text style={[styles.cell, styles.headerText]}>Age</Text>
              <Text style={[styles.cell, styles.headerText]}>Disease</Text>
            </View>

            {/* Filtered Rows */}
            {filteredData.map((item, index) => (
              <View key={item._id || index} style={styles.row}>
                <Text style={styles.cell}>
                  {item["Date Recorded"]?.split("T")[0] || "—"}
                </Text>
                <Text style={styles.cell}>{item["Client Gender"] || "—"}</Text>
                <Text style={styles.cell}>{item["Client Age"] || "—"}</Text>
                <Text style={styles.cell}>
                  {item["Disease Classification"] || "—"}
                </Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default TableExample;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: "#000",
    minWidth: 600,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#444",
  },
  header: {
    backgroundColor: "#222",
  },
  cell: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    color: "#fff",
    minWidth: 120,
  },
  headerText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
