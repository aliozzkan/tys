import React, { FC, Fragment, useEffect, useState } from "react";
import { TouchableOpacity, Image as RNImage } from "react-native";
import { Box, Text } from "../";
import { useImagePicker } from "../../hooks/permissions";
import { Ionicons } from "@expo/vector-icons";
import { Image as IImage } from "../../models/file";
import { colors } from "../../theme";

interface Props {
  onChange?: (files: any[]) => void;
  onlyImage?: boolean;
}

const FileSelecter: FC<Props> = (props) => {
  const [isMounted, setMounted] = useState<boolean>(false);
  const { pickImageOrTakePhoto } = useImagePicker();
  const [selectedFiles, setSelectedFiles] = useState<IImage[]>([]);

  function addImage(image: IImage) {
    if (!!image) {
      setSelectedFiles((state) => [...state, image]);
    }
  }

  function removeImage(image: IImage) {
    if (!!image) {
      setSelectedFiles((state) =>
        state.filter((item) => item.uri !== image.uri)
      );
    }
  }

  useEffect(() => {
    if (isMounted) {
      if (props.onChange) {
        props.onChange(selectedFiles);
      }
    } else {
      setMounted(true);
    }
  }, [selectedFiles]);

  return (
    <Fragment>
      {selectedFiles.length > 0 && (
        <Text variant="smallest" mb="xs">
          Silmek istediğiniz fotoğraf üstüne basılı tutun
        </Text>
      )}
      <Box borderWidth={1} borderColor="gray.400" borderStyle="dashed">
        <TouchableOpacity
          onPress={async () => {
            const image = (await pickImageOrTakePhoto(props.onlyImage)) as IImage;
            addImage(image);
          }}
        >
          <Box p="m" alignItems="center" backgroundColor="blue.50">
            <Box flexDirection="row">
              <Ionicons
                name="cloud-upload"
                size={30}
                color={colors.blue["500"]}
              />
            </Box>
            <Text color="blue.500">{props.onlyImage ? "Fotoğraf" : "Dosya"} Seç</Text>
          </Box>
        </TouchableOpacity>
        <Box flexDirection="row" flexWrap="wrap">
          {selectedFiles.map((file, index) => (
            <Box
              style={{ width: `${100 / 3}%`, height: 80, minWidth: 80 }}
              key={`${file.uri}_${index}`}
              position="relative"
            >
              <Box
                position="absolute"
                width="100%"
                height="100%"
                alignItems="center"
                justifyContent="center"
              >
                <Ionicons name="trash" size={40} />
              </Box>
              <TouchableOpacity
                onLongPress={() => {
                  removeImage(file);
                }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  backgroundColor="gray.100"
                  p="s"
                  style={{ width: "100%", height: "100%" }}
                  alignItems="center"
                  justifyContent="center"
                >
                  {file.extension === "jpeg" || file.extension === "jpg" ? (
                    <RNImage
                      source={{ uri: file.uri }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                      }}
                    />
                  ) : (
                    <Text variant="body">{file.extension}</Text>
                  )}
                </Box>
              </TouchableOpacity>
            </Box>
          ))}
        </Box>
      </Box>
    </Fragment>
  );
};

export default FileSelecter;
