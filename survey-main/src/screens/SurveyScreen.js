import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SurveyScreen = ({ navigation, route }) => {
  // Generate dates for the 7-day survey plus 2 star days
  const generateDates = () => {
    const dates = [];
    // Regular numbered days (1-7)
    for (let i = 1; i <= 7; i++) {
      dates.push({
        id: i.toString(),
        dayNum: i,
        isToday: i === 3, // Day 3 is the current day
        isCompleted: i === 2, // Day 2 is completed
        isIncomplete: i === 1, // Day 1 is incomplete
        isStar: false,
      });
    }
    // Add 2 star days
    for (let i = 8; i <= 12; i++) {
      dates.push({
        id: i.toString(),
        isStar: true,
        isToday: false,
        isCompleted: false,
        isIncomplete: false,
      });
    }
    return dates;
  };

  const [dates] = useState(generateDates());
  const [selectedDate, setSelectedDate] = useState('3'); // Day 3 is selected by default

  // Tasks data organized by category
  const currentTask = { id: '1', title: 'Complete morning survey', completed: false };
  
  const upcomingTasks = [
    { id: '3', title: 'Take medication', completed: false },
    { id: '4', title: 'Complete evening survey', completed: false },
  ];
  
  const completedTasks = [
    { id: '2', title: 'Record water intake', completed: true },
  ];

  // Survey information
  const surveyInfo = {
    title: 'Survey name',
    category: 'CATEGORY',
    description: 'This survey helps us understand your daily habits and routines. Please complete all sections for accurate results.',
    totalQuestions: 6,
    completedQuestions: 1,
  };

  const renderDateItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.dateItem,
        selectedDate === item.id && styles.selectedDateItem,
        item.isCompleted && styles.completedDateItem,
        item.isIncomplete && styles.incompleteDateItem,
      ]}
      onPress={() => setSelectedDate(item.id)}
    >
      <Text style={styles.dayLabel}>Day</Text>
      {!item.isStar ? (
        <Text 
          style={[
            styles.dateText, 
            selectedDate === item.id && styles.selectedDateText,
            item.isToday && styles.todayText,
            item.isCompleted && styles.completedDateText,
            item.isIncomplete && styles.incompleteDateText,
          ]}
        >
          {item.dayNum}
        </Text>
      ) : (
        <Ionicons 
          name="star" 
          size={22} 
          style={[
            styles.starIcon,
            selectedDate === item.id && styles.selectedStarIcon
          ]} 
        />
      )}
      {item.isCompleted && (
        <View style={styles.completionIndicator}>
          <Ionicons name="checkmark" size={12} color="#FFF" />
        </View>
      )}
      {item.isIncomplete && (
        <View style={styles.incompletionIndicator}>
          <Ionicons name="close" size={12} color="#FFF" />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskLeftContent}>
        <View style={[styles.taskCheckbox, item.completed && styles.taskCompleted]}>
          {item.completed && <Ionicons name="checkmark" size={16} color="#FFF" />}
        </View>
        <Text style={styles.taskTitle}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{surveyInfo.title}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Date selector */}
        <View style={styles.dateContainer}>
          <Text style={styles.sectionTitle}>Drink Diary</Text>
          <FlatList
            data={dates}
            renderItem={renderDateItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateList}
          />
        </View>

        {/* Current Task section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Task</Text>
          <View style={styles.tasksContainer}>
            <View style={styles.taskItem}>
              <View style={styles.taskLeftContent}>
                <View style={styles.taskCheckbox}>
                  {/* No checkmark as it's not completed */}
                </View>
                <Text style={styles.taskTitle}>{currentTask.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </View>
          </View>
        </View>

        {/* Processing Task section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Processing Task</Text>
          <View style={styles.tasksContainer}>
            <View style={styles.taskItem}>
              <View style={styles.taskLeftContent}>
                <View style={styles.processingTaskIndicator}>
                  <Ionicons name="time-outline" size={14} color="#FFF" />
                </View>
                <View>
                  <Text style={styles.taskTitle}>Submit daily health metrics</Text>
                  <Text style={styles.processingText}>Processing validation...</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </View>
          </View>
        </View>

        {/* Upcoming Tasks section */}
        {upcomingTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
            <View style={styles.tasksContainer}>
              {upcomingTasks.map((task) => (
                <View key={task.id} style={styles.upcomingTaskItem}>
                  <Text style={styles.upcomingTaskTitle}>{task.title}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                </View>
              ))}
              
              {/* Extra Task option */}
              <TouchableOpacity style={styles.upcomingTaskItem}>
                <Text style={styles.upcomingTaskTitle}>Extra Task</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.upcomingTaskItem}>
                <Text style={styles.upcomingTaskTitle}>Extra Task</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.upcomingTaskItem}>
                <Text style={styles.upcomingTaskTitle}>Extra Task</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.upcomingTaskItem}>
                <Text style={styles.upcomingTaskTitle}>Extra Task</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.upcomingTaskItem}>
                <Text style={styles.upcomingTaskTitle}>Extra Task</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Completed Tasks section */}
        {completedTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed Tasks</Text>
            <View style={styles.tasksContainer}>
              {completedTasks.map((task) => (
                <View key={task.id} style={styles.taskItem}>
                  <View style={styles.taskLeftContent}>
                    <View style={[styles.taskCheckbox, styles.taskCompleted]}>
                      <Ionicons name="checkmark" size={16} color="#FFF" />
                    </View>
                    <Text style={[styles.taskTitle, styles.completedTaskTitle]}>
                      {task.title}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Survey information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Survey Information</Text>
          <View style={styles.surveyInfoContainer}>
            <Text style={styles.surveyDescription}>{surveyInfo.description}</Text>
            <TouchableOpacity style={styles.continueButton}>
              <Text style={styles.continueButtonText}>Continue Survey</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  dateContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
  dateList: {
    paddingRight: 20,
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    width: 40,
    height: 90,
    borderRadius: 20,
    position: 'relative',
    paddingVertical: 8,
  },
  selectedDateItem: {
    backgroundColor: '#F0F0F0',
  },
  completedDateItem: {
    backgroundColor: '#E0F7E0', // Light green background
  },
  incompleteDateItem: {
    backgroundColor: '#FFEBEB', // Light red background
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  selectedDateText: {
    color: '#000000',
  },
  todayText: {
    color: '#FF5C00',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
  },
  tasksContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  taskLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCompleted: {
    backgroundColor: '#FF5C00',
    borderColor: '#FF5C00',
  },
  taskTitle: {
    fontSize: 16,
    color: '#333333',
  },
  surveyInfoContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  surveyInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  surveyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  progressContainer: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 12,
    color: '#666666',
  },
  surveyDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#FF5C00',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedDateText: {
    color: '#34A853', // Green text
  },
  incompleteDateText: {
    color: '#EA4335', // Red text
  },
  completionIndicator: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#34A853',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incompletionIndicator: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#EA4335',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  starIcon: {
    color: '#FFD700',
    marginBottom: 15,
  },
  selectedStarIcon: {
    color: '#FF5C00',
  },
  completedTaskTitle: {
    color: '#666666', // Slightly grayed out text for completed tasks
  },
  upcomingTaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingLeft: 8, // Add a little padding to align with other task items
  },
  upcomingTaskTitle: {
    fontSize: 16,
    color: '#777777', // Slightly lighter color to indicate it's not active
  },
  processingTaskIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFC107', // Yellow color for processing
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    fontSize: 12,
    color: '#FFC107',
    marginTop: 2,
  },
});

export default SurveyScreen; 