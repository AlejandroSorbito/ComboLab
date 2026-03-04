import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [name, setName] = useState('');

  const handlePress = () => {
    if (name.trim()) {
      Alert.alert('Greetings!', `Hello, ${name}!`);
    } else {
      Alert.alert('Oops!', 'Please enter your name first.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://static.wikia.nocookie.net/logopedia/images/a/a5/Allalaaditud_fail_%281%29-0.jpg/revision/latest?cb=20160108121924' }}
        style={styles.logo}
      />
      <Text style={styles.label}>What's your name?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={setName}
        value={name}
      />
      <Button title="Say Hello" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'yellow', // Bright background color
  },
  logo: {
    width: 150, // Adjusted size for the new image
    height: 150,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 22, // Larger font
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    height: 50, // Taller input
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8, // Rounded corners
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});
