// app/screens/SignUpScreen.js

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const GREEN = '#1CB955';
const LIGHT_BG = '#F2F2F2';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [hidePwd, setHidePwd] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);

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
          <Text style={styles.title}>Sign up</Text>
          <Text style={styles.subtitle}>Welcome</Text>

          {/* Name */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your name here"
            placeholderTextColor="#A0A0A0"
            value={name}
            onChangeText={setName}
          />

          {/* Email */}
          <Text style={[styles.label, { marginTop: 16 }]}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your email here"
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password */}
          <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.flexInput]}
              placeholder="Type your password here"
              placeholderTextColor="#A0A0A0"
              secureTextEntry={hidePwd}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setHidePwd(!hidePwd)}>
              <MaterialIcons
                name={hidePwd ? 'visibility' : 'visibility-off'}
                size={24}
                color="#A0A0A0"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <Text style={[styles.label, { marginTop: 16 }]}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.flexInput]}
              placeholder="Type your password here"
              placeholderTextColor="#A0A0A0"
              secureTextEntry={hideConfirm}
              value={confirm}
              onChangeText={setConfirm}
            />
            <TouchableOpacity onPress={() => setHideConfirm(!hideConfirm)}>
              <MaterialIcons
                name={hideConfirm ? 'visibility' : 'visibility-off'}
                size={24}
                color="#A0A0A0"
              />
            </TouchableOpacity>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.button} onPress={() => {/* TODO: signup logic */}}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialBtn, { marginRight: 8 }]}>
              <FontAwesome
                name="facebook"
                size={20}
                color="#1877F2"
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialBtn, { marginLeft: 8 }]}>
              <FontAwesome
                name="google"
                size={20}
                color="#DB4437"
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={styles.signupLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
  flexInput: {
    flex: 1,
    marginRight: 8,
  },
  button: {
    height: 50,
    backgroundColor: GREEN,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    marginRight: 8,
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
