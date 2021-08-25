import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export function useImagePicker() {
  const [permission, setPermission] = useState<boolean | null>(null);

  useEffect(() => {
    onPermissionRequest();
  }, []);

  async function onPermissionRequest() {
    const _permLibrary =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    const _permCamera: any = await ImagePicker.requestCameraPermissionsAsync();
    setPermission(_permLibrary === ImagePicker.PermissionStatus.GRANTED);
    setPermission(_permCamera === ImagePicker.PermissionStatus.GRANTED);
  }

  async function manipulateImage(image: ImagePicker.ImagePickerResult) {
    function getWidthHeight(width: number, height: number) {
      const lineLong = 1024;
      const lineSort = 768;
      const isVertical = width > height;
      return {
        height: isVertical ? lineSort : lineLong,
        width: !isVertical ? lineSort : lineLong,
      };
    }

    if (!image.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: getWidthHeight(image.width, image.height) }],
        {
          compress: 0.5,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );
      return {...manipResult, extension: "jpeg"};
    }
    return null;
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.6,
      allowsMultipleSelection: false,
    });

    if (result.cancelled) {
      return null;
    }

    return await manipulateImage(result);
  }

  async function takePhoto() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.6,
      allowsMultipleSelection: false,
    });

    if (result.cancelled) {
      return null;
    }

    return await manipulateImage(result);
  }

  async function manipulateDocument(result: DocumentPicker.DocumentResult) {
    if (result.type === "cancel") return undefined;

    const file = await FileSystem.readAsStringAsync(result.uri, {
      encoding: "base64",
    });

    return {
      base64: file,
      extension: result.uri.split(".").pop(),
      uri: result.uri
    }
  }

  async function pickDocument() {
    let result = await DocumentPicker.getDocumentAsync({ multiple: false });

    return manipulateDocument(result);
  }

  async function pickImageOrTakePhoto(justPhoto: boolean = false) {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Seçim Yapınız",
        "",
        justPhoto
          ? [
              {
                text: "Kamerayı Kullan",
                onPress: async () => {
                  return resolve(takePhoto());
                },
              },
              {
                text: "Fotoğraf Seç",
                onPress: async () => {
                  return resolve(await pickImage());
                },
              },
              {
                text: "Vazgeç",
                onPress: () => {
                  return resolve(null);
                },
              },
            ]
          : [
              {
                text: "Dosya Seç",
                onPress: async () => {
                  return resolve(pickDocument());
                },
              },
              {
                text: "Kamerayı Kullan",
                onPress: async () => {
                  return resolve(takePhoto());
                },
              },
              {
                text: "Fotoğraf Seç",
                onPress: async () => {
                  return resolve(await pickImage());
                },
              },
              {
                text: "Vazgeç",
                onPress: () => {
                  return resolve(null);
                },
              },
            ]
      );
    });
  }

  return {
    permission,
    onPermissionRequest,
    pickImage,
    takePhoto,
    pickImageOrTakePhoto,
  };
}
