import ImageViewer from '@/components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';

import Button from '@/components/Buttons';
import CircleButton from '@/components/CircleButton';
import EmojiList from '@/components/EmojiList';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiSticker from '@/components/EmojiSticker';
import IconButton from '@/components/IconButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const randomImages = [
  require('@/assets/images/try.png'),
  require('@/assets/images/try2.png'),
  require('@/assets/images/try3.png'),
  require('@/assets/images/try4.png'),
  require('@/assets/images/try5.png'),
  require('@/assets/images/try6.png'),
];


export default function Index() {
  const [finalImage, setFinalImage] = useState<any>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const currentImage = randomImages[0];
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  
  const handleRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    setFinalImage(randomImages[randomIndex]);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setFinalImage({ uri });
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };
  
  const onSaveImageAsync = async () => {
    // we will implement this later
  };
  
  return (
    <GestureHandlerRootView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={finalImage || currentImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {showAppOptions ? 
      (<View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>):
      (<View style={styles.footerContainer}>
          <Button label="Randomize image" onPress={handleRandomImage} />
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
          <Button label="Use this photo" />
        </View>)}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
     </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff6e0ff',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    marginTop: 60,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
   footerContainer: {
    flex: 2 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
