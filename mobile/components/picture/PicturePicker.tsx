import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';

type PicturePickerProps = {};

function PicturePicker(props: PicturePickerProps) {
  const [imageUri, setImageUri] = useState();

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    if (pickerResult.cancelled) {
      return;
    }
    setImageUri((pickerResult as any).uri);
  };

  const openCameraAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access camera access is required!');
      return;
    }
    const pickerResult = await ImagePicker.launchCameraAsync();
    console.log(pickerResult);
    if (pickerResult.cancelled) {
      return;
    }
    setImageUri((pickerResult as any).uri);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Pick an image from camera roll"
        onPress={openImagePickerAsync}
      />
      <Button title="Take a picture using camera" onPress={openCameraAsync} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

export default PicturePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
  },
  image: {
    width: 200,
    height: 200,
  },
});
