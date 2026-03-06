import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// Sample data to start with
const INITIAL_COMBOS = [
  {
    id: '1',
    game: 'Street Fighter 6',
    character: 'Ken',
    combo: 'HP > Drive Rush > MP > HP > Dragonlash Kick',
  },
  {
    id: '2',
    game: 'Tekken 8',
    character: 'Jin',
    combo: 'f,f+2 > d/f+1,4 > b,f+2,1,d/f+2',
  },
];

const Stack = createNativeStackNavigator();

function ComboListScreen({ navigation, combos, onDelete }: any) {
  const [filter, setFilter] = useState('');

  const filteredCombos = combos.filter(
    (item: any) =>
      item.game.toLowerCase().includes(filter.toLowerCase()) ||
      item.character.toLowerCase().includes(filter.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemGame}>{item.game} - {item.character}</Text>
      <Text style={styles.itemCombo}>{item.combo}</Text>
      <View style={styles.actionRow}>
        <Button title="Edit" color="red" onPress={() => navigation.navigate('AddCombo', { comboToEdit: item })} />
        <Button title="Delete" color="red" onPress={() => onDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Placeholder for Logo - replace URI with your own image */}
        <Image source={require('Logo/ComboLab Logo.png')} style={styles.logo} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Filter by game or character..."
        value={filter}
        onChangeText={setFilter}
      />
      <FlatList
        data={filteredCombos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Button
            title="Add New Combo"
            color="red"
            onPress={() => navigation.navigate('AddCombo')}
          />
        }
      />
    </SafeAreaView>
  );
}

function AddComboScreen({ navigation, route, onAdd, onEdit }: any) {
  const comboToEdit = route.params?.comboToEdit;
  const [game, setGame] = useState(comboToEdit ? comboToEdit.game : '');
  const [character, setCharacter] = useState(comboToEdit ? comboToEdit.character : '');
  const [combo, setCombo] = useState(comboToEdit ? comboToEdit.combo : '');

  const handleSave = () => {
    if (comboToEdit) {
      onEdit({ ...comboToEdit, game, character, combo });
    } else {
      onAdd({ game, character, combo });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Game</Text>
      <TextInput style={styles.input} value={game} onChangeText={setGame} placeholder="e.g. Street Fighter 6" />
      
      <Text style={styles.label}>Character</Text>
      <TextInput style={styles.input} value={character} onChangeText={setCharacter} placeholder="e.g. Ken" />
      
      <Text style={styles.label}>Combo</Text>
      <TextInput style={styles.input} value={combo} onChangeText={setCombo} placeholder="Enter notation..." multiline />
      
      <Button title="Save Combo" onPress={handleSave} color="red" />
    </View>
  );
}

export default function HomeScreen() {
  const [combos, setCombos] = useState(INITIAL_COMBOS);

  const handleAdd = (newCombo: any) => {
    setCombos([...combos, { id: Date.now().toString(), ...newCombo }]);
  };

  const handleEdit = (updatedCombo: any) => {
    setCombos(combos.map((c) => (c.id === updatedCombo.id ? updatedCombo : c)));
  };

  const handleDelete = (id: string) => {
    setCombos(combos.filter((c) => c.id !== id));
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="ComboList"
        screenOptions={{
          headerStyle: { backgroundColor: 'red' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="ComboList" options={{ title: 'My Combos' }}>
          {(props) => <ComboListScreen {...props} combos={combos} onDelete={handleDelete} />}
        </Stack.Screen>
        <Stack.Screen name="AddCombo" options={{ title: 'Add/Edit Combo' }}>
          {(props) => <AddComboScreen {...props} onAdd={handleAdd} onEdit={handleEdit} />}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemGame: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 5,
  },
  itemCombo: {
    fontSize: 14,
    color: '#333',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'red',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    color: 'red',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
