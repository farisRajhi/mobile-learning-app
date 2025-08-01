// app/screens/LoginScreen.js

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { login } from '../Api';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidden, setHidden] = useState(true);
//   async function handleLogin() {
//     try {
//         const response = await login(email, password);
//         if (response.success) {
//             navigation.replace('Home');
//         } else {
//             // Handle login error (e.g., show an alert)
//             console.error('Login failed:', response.message);
//         }
//     } catch (error) {
//         console.error('Login error:', error);
//         // Handle network or other errors
//         alert('An error occurred while trying to log in. Please try again.');
//     }
//     }


  const togglePassword = () => setHidden(!hidden);
  const handleLogin = async () => {
    try {
        const response = await login(email, password);
        if (response.success) {
            navigation.replace('Home');
        } else {
            // Handle login error (e.g., show an alert)
            console.error('Login failed:', response.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        // Handle network or other errors
        alert('An error occurred while trying to log in. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Log in</Text>
          <Text style={styles.subtitle}>Welcome again</Text>

          {/* Email Field */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your email here"
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password Field */}
          <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Type your password here"
              placeholderTextColor="#A0A0A0"
              secureTextEntry={hidden}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePassword}>
              <MaterialIcons
                name={hidden ? 'visibility' : 'visibility-off'}
                size={24}
                color="#A0A0A0"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgot} onPress={() => navigation.navigate('ForgetPassword')}>
            
            <Text style={styles.forgotText}>Forget your password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialButton, { marginRight: 8 }]}>
              <FontAwesome
                name="facebook"
                size={20}
                color="#1877F2"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { marginLeft: 8 }]}>
              <FontAwesome
                name="google"
                size={20}
                color="#DB4437"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>You don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const GREEN = '#1CB955';
const LIGHT_BG = '#F2F2F2';

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: LIGHT_BG,
    borderRadius: 24,
    paddingHorizontal: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 24,
  },
  forgotText: {
    color: GREEN,
    fontSize: 14,
  },
  loginButton: {
    height: 50,
    backgroundColor: GREEN,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    fontSize: 14,
    color: '#000',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  signupText: {
    fontSize: 14,
    color: '#666',
  },
  signupLink: {
    fontSize: 14,
    color: GREEN,
    fontWeight: '600',
  },
});
