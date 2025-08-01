import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * Props:
 *  - Icon: the icon component from @expo/vector-icons
 *  - name: the icon name string
 *  - label?: optional text label
 *  - selected: boolean — controls styling
 *  - onPress: handler
 */
export default function TabButton({ Icon, name, label, selected = false, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        selected ? styles.buttonSelected : styles.buttonUnselected,
        label && styles.withLabel, 
      ]}
      onPress={onPress}
    >
      <Icon
        name={name}
        size={20}
        color={selected ? '#fff' : '#666'}
      />
      {label && (
        <Text style={[styles.label, selected ? styles.labelSelected : styles.labelUnselected]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const GREEN = '#1CB955';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    paddingHorizontal: 12,
  },
  withLabel: {
    paddingHorizontal: 16,
  },
  buttonSelected: {
    backgroundColor: GREEN,
  },
  buttonUnselected: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 14,
    marginLeft: 8,
  },
  labelSelected: {
    color: '#fff',
  },
  labelUnselected: {
    color: '#666',
  },
});
