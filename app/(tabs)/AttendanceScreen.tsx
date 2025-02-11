import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SubjectCard from './SubjectCard';

const AttendanceScreen = () => {
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState<string[]>([]);
  
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
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://10.16.49.151:5000/departments');
        const data = await response.json();
        if (data && Array.isArray(data.departments)) {
          setDepartments(data.departments);
        } else {
          console.error('Unexpected data format for departments:', data);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!selectedSemester || !selectedDepartment) {
        console.log('Selected semester or department is missing:', { selectedSemester, selectedDepartment });
        return;
      }

      const encodedSemester = encodeURIComponent(selectedSemester);
      const encodedDepartment = encodeURIComponent(selectedDepartment);
      const url = `http://10.16.49.151:5000/subjects?department=${encodedDepartment}&semester=${encodedSemester}`;
      console.log('Fetching subjects with URL:', url);

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched subjects data:', data);
        if (Array.isArray(data)) {
          const formattedSubjects = data.map((subject: any, index: number) => ({
            id: index + 1,
            name: subject.subject_name,
            unattendedClasses: 0,
            attendancePercent: 100,
            total_hrs: subject.no_of_hours,
            absenceLimit: Math.floor(subject.no_of_hours * 0.25)
          }));
          setSubjects(formattedSubjects);
        } else {
          console.error('Unexpected data format for subjects:', data);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, [selectedSemester, selectedDepartment]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Image
            source={{
              uri: 'https://cdn.builder.io/api/v1/image/assets/7ded4c0eea1b48fba2dba42fb46975e4/9a90d5e38755e56174e9f8e2c32d289d9fe1d770b97bd6fd46adff01fe3b45e8'
            }}
            style={{ width: 24, height: 24, marginRight: 8 }}
          />
          <Picker
            selectedValue={selectedSemester}
            style={{ height: 60, width: 200, fontWeight: 'bold' }}
            onValueChange={(itemValue) => setSelectedSemester(itemValue)}
          >
            <Picker.Item label="Semester 1" value="1" />
            <Picker.Item label="Semester 2" value="2" />
            <Picker.Item label="Semester 3" value="3" />
            <Picker.Item label="Semester 4" value="4" />
            <Picker.Item label="Semester 5" value="5" />
            <Picker.Item label="Semester 6" value="6" />
            <Picker.Item label="Semester 7" value="7" />
            <Picker.Item label="Semester 8" value="8" />
          </Picker>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ marginRight: 8 }}>Department:</Text>
          <Picker
            selectedValue={selectedDepartment}
            style={{ height: 60, width: 200, fontWeight: 'bold' }}
            onValueChange={(itemValue) => setSelectedDepartment(itemValue)}
          >
            {departments.map((department, index) => (
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