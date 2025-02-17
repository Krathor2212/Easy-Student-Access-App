import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SubjectCard from './SubjectCard';
import data from '../../assets/data.json'; // Adjust the path as needed

const AttendanceScreen = () => {
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [selectedDepartment, setSelectedDepartment] = useState(data.departments[0]);
  
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
    if (!selectedSemester || !selectedDepartment) {
      console.log('Selected semester or department is missing:', { selectedSemester, selectedDepartment });
      return;
    }

    const departmentSubjects = data.subjects[selectedDepartment] || [];
    const filteredSubjects = departmentSubjects.filter(subject => subject.sem_offered === selectedSemester);
    const formattedSubjects = filteredSubjects.map((subject, index) => ({
      id: index + 1,
      name: subject.subject_name,
      unattendedClasses: 0,
      attendancePercent: 100,
      total_hrs: subject.no_of_hours,
      absenceLimit: Math.floor(subject.no_of_hours * 0.25),
    }));
    setSubjects(formattedSubjects);
  }, [selectedSemester, selectedDepartment]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/7ded4c0eea1b48fba2dba42fb46975e4/9a90d5e38755e56174e9f8e2c32d289d9fe1d770b97bd6fd46adff01fe3b45e8' }}
            style={{ width: 24, height: 24, marginRight: 8 }}
          />
          <Picker
            selectedValue={selectedSemester}
            style={{ height: 60, width: 200, fontWeight: 'bold' }}
            onValueChange={(itemValue) => setSelectedSemester(itemValue)}
          >
            {Array.from({ length: 8 }, (_, i) => (
              <Picker.Item key={i} label={`Semester ${i + 1}`} value={`${i + 1}`} />
            ))}
          </Picker>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ marginRight: 8 }}>Department:</Text>
          <Picker
            selectedValue={selectedDepartment}
            style={{ height: 60, width: 200, fontWeight: 'bold' }}
            onValueChange={(itemValue) => {
              console.log('Selected department:', itemValue);
              setSelectedDepartment(itemValue);
            }}
          >
            {data.departments.map((department, index) => (
              <Picker.Item key={index} label={department} value={department} />
            ))}
          </Picker>
        </View>

        <View style={{ gap: 16 }}>
          {subjects.map(subject => (
            <SubjectCard key={subject.id} {...subject} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AttendanceScreen;