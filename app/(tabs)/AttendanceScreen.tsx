import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import SubjectCard from './SubjectCard';

const AttendanceScreen = () => {
  const subjects = [
    {
      id: 1,
      name: 'Subject 1',
      unattendedClasses: 0,
      attendancePercent: 100,
      absenceLimit: 11
    },
    {
      id: 2,
      name: 'Subject 2',
      unattendedClasses: 0,
      attendancePercent: 100,
      absenceLimit: 11
    },
    {
      id: 3,
      name: 'Subject 3',
      unattendedClasses: 0,
      attendancePercent: 100,
      absenceLimit: 11
    },
    {
      id: 4,
      name: 'Subject 4',
      unattendedClasses: 0,
      attendancePercent: 100,
      absenceLimit: 11
    }
  ];

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
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Attendance Tracker</Text>
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