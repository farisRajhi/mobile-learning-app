// app/screens/PasswordResetScreen.js

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
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const GREEN = '#1CB955';
const LIGHT_BG = '#F2F2F2';

export default function PasswordResetScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [hidePwd, setHidePwd] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);

  const handleConfirm = () => {
    // TODO: call your reset-password API, then navigate
    // navigation.replace('Login');
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
          <Text style={styles.title}>Password Reset</Text>
          <Text style={styles.subtitle}>
            You can now reset your password
          </Text>

          {/* New Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputRow}>
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
          <Text style={[styles.label, { marginTop: 24 }]}>
            Confirm Password
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.flexInput]}
              placeholder="Type your password here"
              placeholderTextColor="#A0A0A0"
              secureTextEntry={hideConfirm}
              value={confirm}
              onChangeText={setConfirm}
            />
            <TouchableOpacity
              onPress={() => setHideConfirm(!hideConfirm)}
            >
              <MaterialIcons
                name={hideConfirm ? 'visibility' : 'visibility-off'}
                size={24}
                color="#A0A0A0"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleConfirm}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
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
    justifyContent: 'flex-start',
    paddingTop: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    lineHeight: 22,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 48,
    backgroundColor: LIGHT_BG,
    borderRadius: 24,
    paddingHorizontal: 16,
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
    marginTop: 40,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
