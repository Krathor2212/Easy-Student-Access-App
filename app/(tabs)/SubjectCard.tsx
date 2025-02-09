import React from 'react';
import { View, Text, Image } from 'react-native';

interface SubjectCardProps {
  name: string;
  unattendedClasses: number;
  attendancePercent: number;
  absenceLimit: number;
  graphImageUri: string;
  warningImageUri: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  name,
  unattendedClasses,
  attendancePercent,
  absenceLimit,
  graphImageUri,
  warningImageUri
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.subjectName}>{name}</Text>
          <Text style={styles.infoText}>Classes unattended: {unattendedClasses}</Text>
          <Text style={styles.infoText}>Attendance percent: {attendancePercent}%</Text>
          <Text style={styles.infoText}>Absence limit: {absenceLimit}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: graphImageUri }}
            style={styles.graphImage}
          />
          <Image
            source={{ uri: warningImageUri }}
            style={styles.warningImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
  },
  textContainer: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  graphImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain' as const,
  },
  warningImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain' as const,
  },
};

export default SubjectCard;