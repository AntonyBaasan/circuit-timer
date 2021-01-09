import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';

type PicturePickerProps = {};

function getBase64TypePrefix(extension: string | undefined) {
  if (extension) {
    return `data:image/${extension};base64,`;
  }
  return 'data:image/png;base64,';
}

function PicturePicker(props: PicturePickerProps) {
  const [imageBase64, setImageBase64] = useState();
  const [extension, setExtension] = useState<string>();

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
    if (pickerResult.cancelled) {
      return;
    }
    setImageBase64((pickerResult as any).base64);
    setExtension(pickerResult.uri.split('.').pop());
    delete pickerResult.base64;
    console.log(pickerResult);
  };

  const openCameraAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access camera access is required!');
      return;
    }
    const pickerResult = await ImagePicker.launchCameraAsync({ base64: true });
    if (pickerResult.cancelled) {
      return;
    }
    setImageBase64((pickerResult as any).base64);
    console.log(pickerResult);
  };

  return (
    <View style={styles.container}>
      <Text>Extension:{extension}</Text>
      <Button
        title="Pick an image from camera roll"
        onPress={openImagePickerAsync}
      />
      <Button title="Take a picture using camera" onPress={openCameraAsync} />
      {imageBase64 && (
        <Image
          source={{ uri: getBase64TypePrefix(extension) + imageBase64 }}
          style={styles.image}
        />
      )}
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
