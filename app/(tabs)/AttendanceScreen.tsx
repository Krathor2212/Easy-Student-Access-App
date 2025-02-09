import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import SubjectCard from './SubjectCard';

const AttendanceScreen = () => {
  const subjects = [
    {
      id: 1,
      name: 'Subject 1',
      unattendedClasses: 3,
      attendancePercent: 85,
      absenceLimit: 4,
      graphImageUri: 'https://cdn.builder.io/api/v1/image/assets/7ded4c0eea1b48fba2dba42fb46975e4/12d2610a-9f73-49a5-b8a6-3d41102525ee',
      warningImageUri: 'https://cdn.builder.io/api/v1/image/assets/7ded4c0eea1b48fba2dba42fb46975e4/8d5bb734-d2dc-4872-919f-f178a668c909'
    },
    {
      id: 2,
      name: 'Subject 2',
      unattendedClasses: 2,
      attendancePercent: 90,
      absenceLimit: 4,
      graphImageUri: 'https://cdn.builder.io/api/v1/image/assets/7ded4c0eea1b48fba2dba42fb46975e4/a51e0b72-60cf-4a31-b100-4edf50f1597c',
      warningImageUri: 'https://cdn.builder.io/api/v1/image/assets/7ded4c0eea1b48fba2dba42fb46975e4/d89d3d36-faa5-49d8-8b94-f6ed5a3e6402'
    },
    {
      id: 3,
      name: 'Subject 3',
      unattendedClasses: 1,
      attendancePercent: 95,
      absenceLimit: 4,
      graphImageUri: 'https://cdn.builder.io/api/v1/image/assets/7ded4c0eea1b48fba2dba42fb46975e4/f676dc61-c892-488e-b11e-775b954a734e',
      warningImageUri: 'https://cdn.builder.io/api/v1/image/assets/7ded4c0eea1b48fba2dba42fb46975e4/e92e9f26-233a-4436-aefb-b3556a95dbc5'
    },
    {
      id: 4,
      name: 'Subject 4',
      unattendedClasses: 0,
      attendancePercent: 100,
      absenceLimit: 4,
      graphImageUri: 'https://cdn.builder.io/api/v1/image/assets/7ded4c0eea1b48fba2dba42fb46975e4/a0bea8ec-ca09-469a-9302-5c85a5ba6837',
      warningImageUri: 'https://cdn.builder.io/api/v1/image/assets/7ded4c0eea1b48fba2dba42fb46975e4/91aad402-2bd3-4228-8ad1-68667c9bc1c4'
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