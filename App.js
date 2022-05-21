import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
} from 'expo-image-picker';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import logo from './assets/logo.png';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = async () => {
    const permission = await requestMediaLibraryPermissionsAsync;

    if (permission === false) {
      alert('Permission to access camera roll is required');
      return;
    }

    const selectedImage = await launchImageLibraryAsync();

    if (selectedImage.cancelled === true) {
      return;
    }

    setSelectedImage(selectedImage.uri);
    console.log(selectedImage.uri);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  if (selectedImage === null) {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.instructions}>
          To share a photo from your phone with a friend, just press the button
          below!
        </Text>
        <TouchableOpacity onPress={selectImage} style={styles.button}>
          <Text style={styles.buttonText}>Pick a photo</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        <TouchableOpacity onPress={removeImage} style={styles.button}>
          <Text style={styles.buttonText}>Pick a different photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: { width: 150, height: 150, borderRadius: 6, marginBottom: 20 },

  instructions: {
    color: '#888',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },

  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 6,
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
  },

  selectedImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default App;
