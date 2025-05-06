import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SurveyCard = ({ title, progress, isNew = false, onPress }) => {
  // Convert progress like "01/06" to percentage
  const getPercentage = (progressStr) => {
    const [completed, total] = progressStr.split('/').map(num => parseInt(num, 10));
    return Math.round((completed / total) * 100) + '%';
  };

  return (
    <TouchableOpacity 
      style={[
        styles.surveyCard, 
        isNew ? styles.newSurveyCard : styles.startedSurveyCard
      ]}
      onPress={onPress}
    >
      <View style={styles.surveyContent}>
        <Text style={[styles.surveyTitle, isNew && styles.newSurveyTitle]}>
          {title}
        </Text>
        <Text style={[styles.progressText, isNew && styles.newProgressText]}>
          {getPercentage(progress)}
        </Text>
      </View>
      <View style={styles.surveyIconContainer}>
        <Ionicons 
          name="document-text-outline" 
          size={40} 
          color={isNew ? "#FFFFFF" : "#FF5C00"} 
        />
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>Q</Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting}>Hi Quoc!</Text>
            <Text style={styles.title}>Your surveys</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationIcon}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color="#FF5C00" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New surveys</Text>
          <SurveyCard 
            title="Survey name" 
            progress="01/06" 
            isNew={true}
            onPress={() => navigation.navigate('Survey')}
          />
          <SurveyCard 
            title="Another survey name" 
            progress="01/06" 
            isNew={true} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Started surveys</Text>
          <SurveyCard 
            title="Survey name" 
            progress="01/06" 
            isNew={false} 
          />
          <SurveyCard 
            title="Another survey name" 
            progress="01/06" 
            isNew={false} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completed surveys</Text>
          <SurveyCard 
            title="Completed survey" 
            progress="06/06" 
            isNew={false} 
          />
          <SurveyCard 
            title="Another completed survey" 
            progress="06/06" 
            isNew={false} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Non-compliant surveys</Text>
          <SurveyCard 
            title="Non-compliant survey" 
            progress="03/06" 
            isNew={false} 
          />
          <SurveyCard 
            title="Another non-compliant survey" 
            progress="02/06" 
            isNew={false} 
          />
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
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5C00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInitial: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  surveyCard: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  newSurveyCard: {
    backgroundColor: '#FF5C00',
  },
  startedSurveyCard: {
    backgroundColor: '#FFFFFF',
  },
  surveyContent: {
    flex: 1,
  },
  surveyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  newSurveyTitle: {
    color: '#FFFFFF',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  newProgressText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  surveyIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#AEAEAE',
    marginTop: 4,
  },
  activeTabText: {
    fontSize: 12,
    color: '#FF5C00',
    marginTop: 4,
  },
  headerTextContainer: {
    flex: 1,
  },
  notificationIcon: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 