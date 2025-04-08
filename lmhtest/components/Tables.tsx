import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

const Tables = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [newRecord, setNewRecord] = useState({
        date: "",
        gender: "",
        age: "",
        disease: "",
    });

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
            console.error("Error fetching data: ", error);
        } finally {
            setLoading(false);
        }
    };

    fetchRecords();
}, []);

const filteredData = data.filter((item) =>
    item["Disease Classification"]?.toLowerCase().includes(filter.toLowerCase())
);

const handleSubmit = async () => {
    try {
        const response = await fetch(
            "https://incldigitrans-5881.restdb.io/rest/cases-disease",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     "x-apikey": "67f3e466636df6b1f15d955a",
                },
                body: JSON.stringify({
                    "Date Recorded": newRecord.date,
                    "Client Gender": newRecord.gender,
                    "Client Age": newRecord.age,
                    "Disease Classification": newRecord.disease,
                }),
            }
        );

        const json = await response.json();
        console.log("Record added: ", json);
        setData((prevData) => [...prevData, json]);
    } catch (error) {
        console.error("Error adding record: ", error);
    }
};

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

        {/* New Record Form */}
        <Text style={styles.formTitle}>📥 Add New Record</Text>
        <TextInput
          placeholder="Date (YYYY-MM-DD)"
          value={newRecord.date}
          onChangeText={(text) => setNewRecord({ ...newRecord, date: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Gender"
          value={newRecord.gender}
          onChangeText={(text) => setNewRecord({ ...newRecord, gender: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Age"
          value={newRecord.age}
          onChangeText={(text) => setNewRecord({ ...newRecord, age: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Disease Classification"
          value={newRecord.disease}
          onChangeText={(text) => setNewRecord({ ...newRecord, disease: text })}
          style={styles.input}
        />
        <Button title="Add Record" onPress={handleSubmit} />

        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator
            color="#fff"
            size="large"
            style={{ marginTop: 20 }}
          />
        ) : (
          <>
            {/* Table Header */}
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

export default Tables;

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
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
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