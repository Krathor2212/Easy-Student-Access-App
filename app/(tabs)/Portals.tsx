import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";

const portalsData = [
  {
    title: "Main Portal",
    url: "https://www.annauniv.edu",
    image: require("../../assets/images/aulogo.png"),
  },
  {
    title: "AU SEMS",
    url: "https://acoe.annauniv.edu/sems",
    image: require("../../assets/images/aukdc_logo.png"),
  },
  {
    title: "Academic Connect",
    url: "https://www.auegov.ac.in/AcademicConnect",
    image: require("../../assets/images/sems_logo.png"),
  },
  {
    title: "FACULTY H-INDEX",
    url: "https://annauniv.irins.org",
    image: require("../../assets/images/h-index.png"),
  },
  {
    title: "VRL/JLAB",
    url: "http://vrl.annauniv.edu:8000",
    image: require("../../assets/images/jupyterlab.png"),
  },
];

const Portals = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.cardContainer}>
          <Text style={styles.sectionTitle}>NAVIGATE THROUGH PORTALS</Text>

          {portalsData.map((portal, index) => (
            <TouchableOpacity key={index} style={styles.portalCard} onPress={() => openLink(portal.url)}>
              <Image source={portal.image} resizeMode="contain" style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.portalTitle}>{portal.title}</Text>
                <Text style={styles.portalUrl}>{portal.url}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  scrollView: {
    paddingVertical: 20,
  },
  cardContainer: {
    backgroundColor: "#C1BFEB",
    borderRadius: 6,
    padding: 20,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2F2E41",
    textAlign: "center",
    marginBottom: 20,
  },
  portalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 16,
    marginBottom: 15,
    elevation: 3, // Shadow effect
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  portalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  portalUrl: {
    fontSize: 14,
    color: "#555",
  },
});

export default Portals;
