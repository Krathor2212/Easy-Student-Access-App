import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Assuming data.json contains dynamic subjects data
import data from '../../assets/data.json';  // Your dynamic data source

const CGPACalculator = () => {
  const [semesters, setSemesters] = useState({ '1': { courses: [], gpa: 0 } });
  const [currentSemester, setCurrentSemester] = useState('1');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [overallCGPA, setOverallCGPA] = useState(0);

  useEffect(() => {
    loadSemesters();
  }, []);

  useEffect(() => {
    saveSemesters();
    calculateCGPA();
  }, [semesters]);

  useEffect(() => {
    if (selectedDepartment && currentSemester) {
      // Fetch subjects dynamically based on department and semester
      setSubjects(getSubjectsByDepartmentAndSemester(selectedDepartment, currentSemester));
    } else {
      setSubjects([]);
    }
  }, [selectedDepartment, currentSemester]);

  // Function to fetch subjects for a department and semester
  const getSubjectsByDepartmentAndSemester = (department, semester) => {
    // Filter subjects based on department and semester
    return data.subjects[department]?.filter(subject => subject.sem_offered === semester) || [];
  };

  const loadSemesters = async () => {
    try {
      const storedSemesters = await AsyncStorage.getItem('semesters');
      if (storedSemesters) {
        setSemesters(JSON.parse(storedSemesters));
      }
    } catch (error) {
      console.error('Failed to load semesters:', error);
    }
  };

  const saveSemesters = async () => {
    try {
      await AsyncStorage.setItem('semesters', JSON.stringify(semesters));
    } catch (error) {
      console.error('Failed to save semesters:', error);
    }
  };

  const addSemester = () => {
    if (Object.keys(semesters).length >= 8) {
      Alert.alert('Error', 'Maximum of 8 semesters allowed.');
      return;
    }

    setSemesters((prev) => {
      const semKeys = Object.keys(prev).map(Number);
      const maxKey = semKeys.length > 0 ? Math.max(...semKeys) : 0;
      const newSemester = String(maxKey + 1);
      return { ...prev, [newSemester]: { courses: [], gpa: 0 } };
    });
    setCurrentSemester(prev => String(Number(prev) + 1));
  };

  const removeSemester = () => {
    if (Object.keys(semesters).length === 1) {
      Alert.alert('Error', 'You cannot delete the only remaining semester.');
      return;
    }

    setSemesters((prev) => {
      const updatedSemesters = { ...prev };
      delete updatedSemesters[currentSemester];

      // Set the current semester to the previous one
      const remainingSemesters = Object.keys(updatedSemesters);
      setCurrentSemester(remainingSemesters[remainingSemesters.length - 1]);

      return updatedSemesters;
    });
  };

  const addCourse = () => {
    if (!selectedDepartment) {
      Alert.alert('Error', 'Please select a department first.');
      return;
    }

    // Get all selected courses across all semesters
    const allSelectedCourses = Object.values(semesters).flatMap((sem) =>
      sem.courses.map((course) => course.name)
    );

    // Filter out subjects that have already been selected
    const availableSubjects = subjects.filter(
      (subject) => !allSelectedCourses.includes(subject.subject_name)
    );

    if (availableSubjects.length === 0) {
      Alert.alert('Error', 'All subjects for this department are already selected.');
      return;
    }

    setSemesters((prev) => {
      const updatedSemesters = { ...prev };
      const selectedSubject = availableSubjects[0]; // Default to first available subject
      updatedSemesters[currentSemester].courses.push({
        id: Date.now(),
        name: selectedSubject.subject_name,
        code: selectedSubject.subject_code,
        credits: selectedSubject.credits,
        grade: 'A',
      });
      return { ...updatedSemesters };
    });
  };

  const deleteCourse = (id) => {
    setSemesters((prev) => {
      const updatedSemesters = { ...prev };
      updatedSemesters[currentSemester].courses = updatedSemesters[currentSemester].courses.filter(
        (course) => course.id !== id
      );
      return { ...updatedSemesters };
    });
  };

  const updateCourse = (id, field, value) => {
    setSemesters((prev) => {
      const updatedSemesters = { ...prev };
      const courseIndex = updatedSemesters[currentSemester].courses.findIndex((course) => course.id === id);
      if (courseIndex !== -1) {
        updatedSemesters[currentSemester].courses[courseIndex][field] = value;

        // Update credits when the subject is changed
        if (field === 'name') {
          const selectedSubject = subjects.find((sub) => sub.subject_name === value);
          if (selectedSubject) {
            updatedSemesters[currentSemester].courses[courseIndex].credits = selectedSubject.credits;
          }
        }
      }
      return { ...updatedSemesters };
    });
  };

  const calculateGPA = () => {
    const semesterData = semesters[currentSemester];
    let totalCredits = 0;
    let totalGradePoints = 0;

    for (const course of semesterData.courses) {
      const gradePoint = getGradePoint(course.grade);
      totalCredits += course.credits;
      totalGradePoints += course.credits * gradePoint;
    }

    if (totalCredits === 0) {
      Alert.alert('Error', 'Please add at least one course');
      return;
    }

    setSemesters((prev) => {
      const updatedSemesters = { ...prev };
      updatedSemesters[currentSemester].gpa = (totalGradePoints / totalCredits).toFixed(2);
      return { ...updatedSemesters };
    });

    calculateCGPA();
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    Object.values(semesters).forEach((semester) => {
      if (semester.gpa && semester.courses.length > 0) {
        const semesterCredits = semester.courses.reduce((sum, course) => sum + course.credits, 0);
        totalCredits += semesterCredits;
        totalGradePoints += semester.gpa * semesterCredits;
      }
    });

    const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    setOverallCGPA(cgpa);
  };

  const getGradePoint = (grade) => {
    switch (grade) {
      case 'O': return 10;
      case 'A+': return 9;
      case 'A': return 8;
      case 'B+': return 7;
      case 'B': return 6;
      case 'C+': return 5;
      case 'C': return 4;
      case 'D': return 3;
      case 'F': return 0;
      default: return 0;
    }
  };

  const resetAllData = async () => {
    try {
      await AsyncStorage.removeItem('semesters');
      setSemesters({ '1': { courses: [], gpa: 0 } });
      setCurrentSemester('1');
      setSelectedDepartment('');
      setOverallCGPA(0);
      Alert.alert('Success', 'All data has been reset.');
    } catch (error) {
      console.error('Failed to reset data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Department Selection */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Department:</Text>
        <Picker
          selectedValue={selectedDepartment}
          onValueChange={(value) => {
            if (currentSemester === '1') {
              setSelectedDepartment(value);
            } else {
              Alert.alert('Error', 'You cannot change the department after the first semester.');
            }
          }}
          style={styles.picker}
          enabled={currentSemester === '1'} // Disable after first semester
        >
          <Picker.Item label="Select your department" value="" />
          {data.departments.map((dept) => (
            <Picker.Item key={dept} label={dept} value={dept} />
          ))}
        </Picker>
      </View>

      {/* Semester Selection */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Semester:</Text>
        <Picker
          selectedValue={currentSemester}
          onValueChange={(value) => setCurrentSemester(value)}
          style={styles.picker}
        >
          {Array.from({ length: 8 }, (_, i) => i + 1).map((sem) => (
            <Picker.Item key={sem} label={`Semester ${sem}`} value={String(sem)} />
          ))}
        </Picker>
      </View>

      {/* Course List */}
      {semesters[currentSemester].courses.map((course) => (
        <View key={course.id} style={styles.courseCard}>
          <Picker
            selectedValue={course.name}
            onValueChange={(value) => updateCourse(course.id, 'name', value)}
            style={styles.input}
          >
            {subjects.map((subject) => (
              <Picker.Item key={subject.subject_code} label={subject.subject_name} value={subject.subject_name} />
            ))}
          </Picker>
          <Text style={styles.creditsText}>Credits: {course.credits}</Text>
          <Picker
            selectedValue={course.grade}
            onValueChange={(value) => updateCourse(course.id, 'grade', value)}
            style={styles.input}
          >
            {['O', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'].map((grade) => (
              <Picker.Item key={grade} label={grade} value={grade} />
            ))}
          </Picker>
          <TouchableOpacity onPress={() => deleteCourse(course.id)}>
            <Icon name="delete" size={30} color="red" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Add Course Button */}
      <TouchableOpacity onPress={addCourse} style={styles.button}>
        <Text style={styles.buttonText}>Add Course</Text>
      </TouchableOpacity>

      {/* Calculate GPA Button */}
      <TouchableOpacity onPress={calculateGPA} style={styles.button}>
        <Text style={styles.buttonText}>Calculate GPA</Text>
      </TouchableOpacity>

      {/* CGPA */}
      <View style={styles.cgpaContainer}>
        <Text style={styles.cgpaText}>CGPA: {overallCGPA}</Text>
      </View>

      {/* Add/Remove Semester */}
      <View style={styles.addRemoveContainer}>
        <TouchableOpacity onPress={addSemester} style={styles.button}>
          <Text style={styles.buttonText}>Add Semester</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={removeSemester} style={styles.button}>
          <Text style={styles.buttonText}>Remove Semester</Text>
        </TouchableOpacity>
      </View>

      {/* Reset All Data */}
      <TouchableOpacity onPress={resetAllData} style={styles.button}>
        <Text style={styles.buttonText}>Reset All Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 60,
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseCard: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  creditsText: {
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  cgpaContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  cgpaText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  addRemoveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CGPACalculator;
