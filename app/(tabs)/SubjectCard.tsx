import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SubjectCardProps {
  name: string;
  unattendedClasses: number;
  attendancePercent: number;
  absenceLimit: number;
}

const TOTAL_HOURS = 45;

const SubjectCard: React.FC<SubjectCardProps> = ({
  name,
  unattendedClasses,
  attendancePercent,
  absenceLimit,
}) => {
  const [unattended, setUnattended] = useState(unattendedClasses);
  const [attendance, setAttendance] = useState(attendancePercent);
  const [limit, setLimit] = useState(absenceLimit);

  const handleIncrease = () => {
    if (unattended < TOTAL_HOURS) {
      const newUnattended = unattended + 1;
      setUnattended(newUnattended);
      setAttendance(((TOTAL_HOURS - newUnattended) / TOTAL_HOURS) * 100);
      setLimit(limit - 1);
    } 
  };

  const handleDecrease = () => {
    if (unattended > 0) {
      const newUnattended = unattended - 1;
      setUnattended(newUnattended);
      setAttendance(((TOTAL_HOURS - newUnattended) / TOTAL_HOURS) * 100);
      setLimit(limit + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.subjectName}>{name}</Text>
          <Text style={styles.infoText}>Classes Missed: {unattended}</Text>
          <Text style={styles.infoText}>Attendance : {attendance.toFixed(2)}%</Text>
          <Text style={styles.infoText}>Skips Left: {limit}</Text>
        </View>
        <View style={styles.symbolContainer}>
          <TouchableOpacity onPress={handleDecrease}>
            <Text style={styles.symbolText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleIncrease}>
            <Text style={styles.symbolText}>+</Text>
          </TouchableOpacity>
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
  symbolContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 30, // Increased gap value
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
  symbolText: {
    fontSize: 30,
    fontWeight: 'bold' as const,
  },
};

export default SubjectCard;
