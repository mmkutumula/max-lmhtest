import React, { useEffect, useState } from "react";
import { Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";

const TableExample = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

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
      console.log("Record added:", json);
      // Optionally, re-fetch data after adding
      setData((prevData) => [...prevData, json]);
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  return (
    <ScrollView horizontal>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🩺 Patient Records</Text>

        {/* New Record Form */}
        <Text style={styles.formTitle}>📥 Add New Record</Text>
        <TextInput
          placeholder="Date (YYYY-MM-DD)"
          placeholderTextColor="#fff"
          value={newRecord.date}
          onChangeText={(text) => setNewRecord({ ...newRecord, date: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Gender"
          placeholderTextColor="#fff"
          value={newRecord.gender}
          onChangeText={(text) => setNewRecord({ ...newRecord, gender: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Age"
          placeholderTextColor="#fff"
          value={newRecord.age}
          onChangeText={(text) => setNewRecord({ ...newRecord, age: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Disease Classification"
          placeholderTextColor="#fff"
          value={newRecord.disease}
          onChangeText={(text) => setNewRecord({ ...newRecord, disease: text })}
          style={styles.input}
        />
        <Button title="Add Record" onPress={handleSubmit} />
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