import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CGPACalculator = () => {
  const [semesters, setSemesters] = useState({
    '1': { courses: [], cgpa: 0 }, // Default semester with empty courses
  });
  const [currentSemester, setCurrentSemester] = useState('1'); // Default semester

  const addCourse = () => {
    const updatedSemesters = { ...semesters };
    updatedSemesters[currentSemester].courses.push({
      id: Date.now(),
      name: '',
      credits: '',
      grade: 'A',
    });
    setSemesters(updatedSemesters);
  };

  const deleteCourse = (id) => {
    const updatedSemesters = { ...semesters };
    updatedSemesters[currentSemester].courses = updatedSemesters[currentSemester].courses.filter(
      course => course.id !== id
    );
    setSemesters(updatedSemesters);
  };

  const updateCourse = (id, field, value) => {
    const updatedSemesters = { ...semesters };
    const courseIndex = updatedSemesters[currentSemester].courses.findIndex(
      course => course.id === id
    );
    updatedSemesters[currentSemester].courses[courseIndex][field] = value;
    setSemesters(updatedSemesters);
  };

  const calculateCGPA = () => {
    const updatedSemesters = { ...semesters };
    const semesterData = updatedSemesters[currentSemester];
    let totalCredits = 0;
    let totalGradePoints = 0;

    for (const course of semesterData.courses) {
      if (!course.name || !course.credits) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }

      const credits = parseFloat(course.credits);
      const gradePoint = getGradePoint(course.grade);
      
      totalCredits += credits;
      totalGradePoints += credits * gradePoint;
    }

    if (totalCredits === 0) {
      Alert.alert('Error', 'Please add at least one course');
      return;
    }

    semesterData.cgpa = (totalGradePoints / totalCredits).toFixed(2);
    setSemesters(updatedSemesters);
  };

  const getGradePoint = (grade) => {
    const gradePoints = {
      'A': 4.0,
      'A-': 3.7,
      'B+': 3.3,
      'B': 3.0,
      'B-': 2.7,
      'C+': 2.3,
      'C': 2.0,
      'F': 0.0
    };
    return gradePoints[grade];
  };

  const getGrades = () => {
    return ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'F'];
  };

  const getSemesters = () => {
    return ['1', '2', '3', '4', '5', '6', '7', '8']; // Example semesters
  };

  const addSemester = () => {
    const newSemester = String(Object.keys(semesters).length + 1);
    setSemesters({
      ...semesters,
      [newSemester]: { courses: [], cgpa: 0 },
    });
    setCurrentSemester(newSemester);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>CGPA Calculator</Text>

      {/* Semester Picker */}
      <View style={styles.semesterContainer}>
        <Text style={styles.label}>Select Semester:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={currentSemester}
            onValueChange={(value) => setCurrentSemester(value)}
            style={styles.picker}
          >
            {Object.keys(semesters).map(sem => (
              <Picker.Item key={sem} label={`Semester ${sem}`} value={sem} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.addSemesterButton} onPress={addSemester}>
          <Text style={styles.addSemesterButtonText}>Add Semester</Text>
        </TouchableOpacity>
      </View>

      {/* Course Inputs */}
      {semesters[currentSemester].courses.map(course => (
        <View key={course.id} style={styles.courseCard}>
          <TextInput
            style={styles.input}
            placeholder="Course Name"
            value={course.name}
            onChangeText={(text) => updateCourse(course.id, 'name', text)}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.creditInput]}
              placeholder="Credits"
              keyboardType="numeric"
              value={course.credits}
              onChangeText={(text) => updateCourse(course.id, 'credits', text)}
            />

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={course.grade}
                onValueChange={(value) => updateCourse(course.id, 'grade', value)}
                style={styles.picker}
              >
                {getGrades().map(grade => (
                  <Picker.Item key={grade} label={grade} value={grade} />
                ))}
              </Picker>
            </View>

            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => deleteCourse(course.id)}
            >
              <Text style={styles.deleteText}>×</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Buttons */}
      <TouchableOpacity style={styles.addButton} onPress={addCourse}>
        <Text style={styles.addButtonText}>Add Course</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.calculateButton} onPress={calculateCGPA}>
        <Text style={styles.calculateButtonText}>Calculate CGPA</Text>
      </TouchableOpacity>

      {/* Result */}
      {semesters[currentSemester].cgpa > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Your CGPA for Semester {currentSemester} is: {semesters[currentSemester].cgpa}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginVertical: 20,
  },
  semesterContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    color: '#34495e',
  },
  addSemesterButton: {
    backgroundColor: '#8e44ad',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  addSemesterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    color: '#34495e',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  creditInput: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: 24,
    lineHeight: 28,
  },
  addButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  calculateButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
  },
});

export default CGPACalculator;
