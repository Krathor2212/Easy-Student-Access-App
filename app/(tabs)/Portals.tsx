import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";

const Portals = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <SafeAreaView style={styles.container}>
        
      <ScrollView style={styles.scrollView}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Surf through Important Websites</Text>
        <Image source={{ uri: "../assets/images/back.svg" }} resizeMode={"stretch"} style={styles.image} />
        <View style={styles.column}>
          <Text style={styles.text}>{"NAVIGATE THROUGH PORTALS"}</Text>
          <TouchableOpacity style={styles.row} onPress={() => openLink("https://www.annauniv.edu")}>
            <Image source={{ uri: "../assets/images/aulogo.png" }} resizeMode={"stretch"} style={styles.image2} />
            <View style={styles.column2}>
              <Text style={styles.text2}>{"Main Portal"}</Text>
              <Text style={styles.text3}>{"www.annauniv.edu"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row2} onPress={() => openLink("https://acoe.annauniv.edu/sems")}>
            <Image source={{ uri: "../assets/images/aukdc_logo.png" }} resizeMode={"stretch"} style={styles.image3} />
            <View style={styles.column2}>
              <Text style={styles.text4}>{"AU SEMS"}</Text>
              <Text style={styles.text5}>{"acoe.annauniv.edu/sems"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row3} onPress={() => openLink("https://www.auegov.ac.in/AcademicConnect")}>
            <Image source={{ uri: "../assets/images/sems_logo.png" }} resizeMode={"stretch"} style={styles.image4} />
            <View style={styles.column2}>
              <Text style={styles.text6}>{"Academic Connect"}</Text>
              <Text style={styles.text7}>{"www.auegov.ac.in/AcademicConnect"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row4} onPress={() => openLink("https://annauniv.irins.org")}>
            <Image source={{ uri: "../assets/images/h-index.png" }} resizeMode={"stretch"} style={styles.image5} />
            <View style={styles.column2}>
              <Text style={styles.text8}>{"FACULTY H-INDEX"}</Text>
              <Text style={styles.text9}>{"annauniv.irins.org"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row5} onPress={() => openLink("http://vrl.annauniv.edu:8000")}>
            <Image source={{ uri: "../assets/images/jupyterlab.png" }} resizeMode={"stretch"} style={styles.image6} />
            <View style={styles.column2}>
              <Text style={styles.text10}>{"VRL/JLAB"}</Text>
              <Text style={styles.text3}>{"vrl.annauniv.edu:8000"}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  column: {
    backgroundColor: "#C1BFEB",
    borderRadius: 6,
    paddingTop: 46,
    paddingBottom: 76,
    paddingHorizontal: 33,
  },
  column2: {
    flex: 1,
  },
  image: {
    width: 32,
    height: 32,
    marginBottom: 6,
  },
  image2: {
    width: 59,
    height: 59,
    marginRight: 53,
  },
  image3: {
    width: 33,
    height: 45,
    marginTop: 5,
    marginRight: 64,
  },
  image4: {
    width: 56,
    height: 56,
    marginRight: 50,
  },
  image5: {
    width: 77,
    height: 77,
    marginRight: 38,
  },
  image6: {
    width: 56,
    height: 56,
    marginRight: 42,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFFF7",
    borderRadius: 6,
    paddingVertical: 22,
    paddingHorizontal: 17,
    marginBottom: 38,
  },
  row2: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingTop: 26,
    paddingBottom: 16,
    paddingHorizontal: 30,
    marginBottom: 38,
  },
  row3: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingVertical: 23,
    paddingHorizontal: 17,
    marginBottom: 38,
  },
  row4: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 11,
    marginBottom: 38,
  },
  row5: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingVertical: 23,
    paddingHorizontal: 17,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 13,
    paddingHorizontal: 9,
  },
  text: {
    color: "#2F2E41",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 21,
  },
  text2: {
    color: "#2F2E41",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 14,
    marginHorizontal: 17,
  },
  text3: {
    color: "#2F2E41",
    fontSize: 16,
    fontWeight: "bold",
  },
  text4: {
    color: "#2F2E41",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 9,
    marginHorizontal: 28,
  },
  text5: {
    color: "#2F2E41",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  text6: {
    color: "#2F2E41",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 1,
  },
  text7: {
    color: "#2F2E41",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 3,
  },
  text8: {
    color: "#2F2E41",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 4,
  },
  text9: {
    color: "#2F2E41",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  text10: {
    color: "#2F2E41",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 9,
    marginHorizontal: 36,
  },
});

export default Portals;