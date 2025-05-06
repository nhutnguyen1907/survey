import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OTPVerification = ({ route, navigation }) => {
  const { email, otp } = route.params;
  
  // Create state for each digit of the OTP
  const [otpValues, setOTPValues] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  // Create refs for each input
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Handle timer for resend button
  useEffect(() => {
    if (timer > 0) {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Handle input change
  const handleOTPChange = (value, index) => {
    if (value.length > 1) {
      // If pasting a code, distribute characters across inputs
      const pastedOTP = value.slice(0, 4);
      const newOtpValues = [...otpValues];
      
      for (let i = 0; i < pastedOTP.length; i++) {
        if (i + index < 4) {
          newOtpValues[i + index] = pastedOTP[i];
        }
      }

      setOTPValues(newOtpValues);
      
      // Focus last input
      if (inputRefs[3] && inputRefs[3].current) {
        inputRefs[3].current.focus();
      }
    } else {
      // Normal single digit input
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOTPValues(newOtpValues);
      
      // Auto-focus next input
      if (value && index < 3 && inputRefs[index + 1] && inputRefs[index + 1].current) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otpValues[index] === '') {
      // Move to previous input on backspace if current is empty
      if (inputRefs[index - 1] && inputRefs[index - 1].current) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  // Resend OTP
  const handleResendOTP = () => {
    // In a real app, make an API call to resend OTP
    const newOTP = Math.floor(1000 + Math.random() * 9000).toString();
    console.log('New OTP:', newOTP);
    
    // Reset timer
    setTimer(60);
    setCanResend(false);

    Alert.alert(
      'OTP Resent',
      `A new OTP has been sent to ${email}`,
      [{ text: 'OK' }]
    );
    
    // Update route params with new OTP
    navigation.setParams({ otp: newOTP });
  };

  // Verify OTP
  const handleVerifyOTP = () => {
    const enteredOTP = otpValues.join('');
    
    if (enteredOTP.length !== 4) {
      Alert.alert('Error', 'Please enter all 4 digits of the OTP');
      return;
    }
    
    // Verify against the OTP from route params
    if (enteredOTP === otp) {
      // Navigate to reset password screen
      navigation.navigate('ResetPassword', { email });
    } else {
      Alert.alert('Invalid OTP', 'The OTP you entered is incorrect');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>OTP Verification</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          We've sent a 4-digit OTP to your email
        </Text>
        <Text style={styles.email}>{email}</Text>

        <View style={styles.otpContainer}>
          {otpValues.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={index === 0 ? 4 : 1} // Allow pasting in the first input
              value={digit}
              onChangeText={(value) => handleOTPChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the OTP? </Text>
          {canResend ? (
            <TouchableOpacity onPress={handleResendOTP}>
              <Text style={styles.resendLink}>Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timerText}>Resend in {timer}s</Text>
          )}
        </View>
      </View>
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
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  otpInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    textAlign: 'center',
    width: 55,
    height: 55,
  },
  button: {
    backgroundColor: '#FF5C00',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    color: '#666',
    fontSize: 14,
  },
  resendLink: {
    color: '#FF5C00',
    fontSize: 14,
    fontWeight: 'bold',
  },
  timerText: {
    color: '#999',
    fontSize: 14,
  },
});

export default OTPVerification; 