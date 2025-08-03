// app/screens/DecksScreen.js

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';
import TabButton from '../components/TabButton';
import api from '../services/api';

const GREEN = '#1CB955';
const LIGHT_BG = '#F7FFF9'; // very light tint for cards

export default function DecksScreen() {
  const [subjects, setSubjects]           = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName]           = useState('');

  useEffect(() => {
    // Load initial subjects
    async function load() {
      try {
        const { data } = await api.get('/subjects');
        setSubjects(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const createSubject = async () => {
    if (!newName.trim()) return;
    try {
      const { data } = await api.post('/subjects', { name: newName });
      setSubjects([data, ...subjects]);
      setNewName('');
      setModalVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* New Subject Button */}
        <TouchableOpacity
          style={styles.newSubjectBtn}
          onPress={() => setModalVisible(true)}
        >
          <MaterialCommunityIcons
            name="plus"
            size={20}
            color={GREEN}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.newSubjectText}>New subject</Text>
        </TouchableOpacity>

        {/* Subjects List */}
        {subjects.map(subject => (
          <View key={subject.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={20}
                color={GREEN}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.cardTitle}>{subject.name}</Text>
              <TouchableOpacity style={styles.cardMenu}>
                <Entypo name="dots-three-vertical" size={16} color="#666" />
              </TouchableOpacity>
            </View>

            {subject.topics?.map(topic => (
              <View key={topic.id} style={styles.topicRow}>
                <Text style={styles.topicText}>
                  {topic.name} ({topic.sectionsCount} sections)
                </Text>
                <Entypo name="dots-three-vertical" size={16} color="#999" />
              </View>
            ))}

            <TouchableOpacity style={styles.addTopicBtn}>
              <MaterialCommunityIcons name="plus" size={20} color={GREEN} />
              <Text style={[styles.addTopicText, { color: GREEN }]}>
                Add Topic
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TabButton
          Icon={MaterialCommunityIcons}
          name="cards-outline"
          label="Decks"
          selected
          onPress={() => {}}
        />
        <TabButton
          Icon={Entypo}
          name="pie-chart"
          selected={false}
          onPress={() => {}}
        />
        <TabButton
          Icon={Feather}
          name="edit-3"
          selected={false}
          onPress={() => {}}
        />
        <TabButton
          Icon={Feather}
          name="check"
          selected={false}
          onPress={() => {}}
        />
      </View>

      {/* Create New Subject Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Subject</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>Subject name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Type your subject name here"
              placeholderTextColor="#A0A0A0"
              value={newName}
              onChangeText={setNewName}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.createBtn]}
                onPress={createSubject}
              >
                <Text style={styles.createText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const CARD_PADDING = 16;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: {
    padding: CARD_PADDING,
    paddingBottom: 80, // leave space for tab bar
  },
  newSubjectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GREEN,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  newSubjectText: {
    color: GREEN,
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: LIGHT_BG,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardMenu: {
    padding: 4,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  topicText: {
    fontSize: 14,
    color: '#333',
  },
  addTopicBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#E8FEF1',
    justifyContent: 'center',
  },
  addTopicText: {
    fontSize: 14,
    marginLeft: 6,
  },

  /* Tab Bar */
  tabBar: {
    position: 'absolute',
    bottom: 0,
    width,
    paddingHorizontal: CARD_PADDING,
    paddingVertical: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalLabel: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  modalInput: {
    height: 45,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalBtn: {
    minWidth: 80,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginLeft: 12,
  },
  cancelBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: GREEN,
  },
  createBtn: {
    backgroundColor: GREEN,
  },
  cancelText: {
    color: '#333',
    fontSize: 14,
  },
  createText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
