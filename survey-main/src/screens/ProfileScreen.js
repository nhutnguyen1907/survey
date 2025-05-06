import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileSection = ({ title, value, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.section} onPress={onPress}>
      <View style={styles.sectionIconContainer}>
        <Ionicons name={icon} size={22} color="#FF5C00" />
      </View>
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionValue}>{value}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
    </TouchableOpacity>
  );
};

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => {
            // Navigate to login screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileIconLarge}>
            <Text style={styles.profileInitialLarge}>Q</Text>
          </View>
          <Text style={styles.profileName}>Quoc Ngo</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionContainerTitle}>Personal Information</Text>
          
          <ProfileSection 
            title="Email" 
            value="quoc.ngo@example.com" 
            icon="mail-outline"
            onPress={() => Alert.alert("Change Email", "Would you like to change your email?")}
          />
          
          <ProfileSection 
            title="Phone" 
            value="+1 (555) 123-4567" 
            icon="call-outline"
            onPress={() => Alert.alert("Change Phone", "Would you like to change your phone number?")}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionContainerTitle}>App Settings</Text>
          
          <ProfileSection 
            title="Notification Settings" 
            value="Enabled" 
            icon="notifications-outline"
            onPress={() => Alert.alert("Notification Settings", "Configure your notification preferences")}
          />
          
          <ProfileSection 
            title="Privacy Policy" 
            value="" 
            icon="shield-outline"
            onPress={() => Alert.alert("Privacy Policy", "View our privacy policy")}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF5C00" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  profileIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF5C00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileInitialLarge: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionContainer: {
    backgroundColor: 'white',
    marginBottom: 16,
    paddingTop: 16,
  },
  sectionContainerTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 16,
    marginBottom: 8,
    color: '#333',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  sectionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 92, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  sectionValue: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: '#FF5C00',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default ProfileScreen; 