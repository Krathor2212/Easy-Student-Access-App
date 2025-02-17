import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubjectCard from './SubjectCard';
import data from '../../assets/data.json'; // Adjust the path as needed

const AttendanceScreen = () => {
  const route = useRoute();
  const initialDepartment = (route.params as { department?: string })?.department || data.departments[0];
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [selectedDepartment, setSelectedDepartment] = useState(initialDepartment);

  interface Subject {
    id: number;
    name: string;
    unattendedClasses: number;
    attendancePercent: number;
    absenceLimit: number;
    total_hrs: number;
  }

  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const loadSelectedDepartment = async () => {
      try {
        const storedDepartment = await AsyncStorage.getItem('selectedDepartment');
        if (storedDepartment) {
          setSelectedDepartment(storedDepartment);
        }
      } catch (error) {
        console.error('Error loading selected department:', error);
      }
    };

    loadSelectedDepartment();
  }, []);

  useEffect(() => {
    if (!selectedSemester || !selectedDepartment) {
      console.log('Selected semester or department is missing:', { selectedSemester, selectedDepartment });
      return;
    }

    const departmentSubjects = data.subjects[selectedDepartment] || [];
    const filteredSubjects = departmentSubjects.filter((subject: any) => subject.sem_offered === selectedSemester);
    const formattedSubjects = filteredSubjects.map((subject: any, index: number) => ({
      id: index + 1,
      name: subject.subject_name,
      unattendedClasses: 0,
      attendancePercent: 100,
      total_hrs: subject.no_of_hours,
      absenceLimit: Math.floor(subject.no_of_hours * 0.25),
    }));
    setSubjects(formattedSubjects);
  }, [selectedSemester, selectedDepartment]);

  const handleDepartmentChange = async (itemValue: string) => {
    try {
      await AsyncStorage.setItem('selectedDepartment', itemValue);
      setSelectedDepartment(itemValue);
    } catch (error) {
      console.error('Error saving selected department:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedSemester}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedSemester(itemValue)}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <Picker.Item key={i} label={`Semester ${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Department:</Text>
        <Picker
          selectedValue={selectedDepartment}
          style={styles.picker}
          onValueChange={(itemValue) => {
            console.log('Selected department:', itemValue);
            handleDepartmentChange(itemValue);
          }}
        >
          {data.departments.map((department, index) => (
            <Picker.Item key={index} label={department} value={department} />
          ))}
        </Picker>
      </View>

      <View style={styles.subjectsContainer}>
        {subjects.map(subject => (
          <SubjectCard key={subject.id} {...subject} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  picker: {
    flex: 1,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  subjectsContainer: {
    paddingHorizontal: 16,
  },
});

export default AttendanceScreen;