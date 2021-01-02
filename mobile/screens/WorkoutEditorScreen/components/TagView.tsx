import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Badge, Button, Overlay, Text } from 'react-native-elements';

type TagViewProps = {
  title: string;
  tags: string[];
  addTag: (newTag: string) => void;
  removeTag: (tag: string) => void;
};

function TagView(props: TagViewProps) {
  const { title, tags, addTag, removeTag } = props;
  useEffect(() => {});

  const [isAddTagOverlayVisible, setIsAddTagOverlayVisible] = useState(false);
  const [newTagValue, setNewTagValue] = useState('');

  function toCamelCase(str: string) {
    return str.replace(/\b(\w)/g, (s) => s.toUpperCase());
  }

  const onSaveTag = () => {
    addTag(newTagValue);
    closeOverlay();
  };

  const closeOverlay = () => {
    setNewTagValue('');
    setIsAddTagOverlayVisible(false);
  };

  const toggleAddTagOverlay = () => {
    setNewTagValue('');
    setIsAddTagOverlayVisible(!isAddTagOverlayVisible);
  };

  const renderTaskTable = () => {
    return (
      <View style={styles.overlayAddTag}>
        <Overlay
          isVisible={isAddTagOverlayVisible}
          onBackdropPress={toggleAddTagOverlay}
        >
          <View>
            <TextInput value={newTagValue} onChangeText={setNewTagValue} />
            <Button title="Save" onPress={onSaveTag} />
            <Button title="Cancel" onPress={closeOverlay} />
          </View>
        </Overlay>
      </View>
    );
  };

  const renderTagList = () => {
    return tags.map((tag, index) => {
      return (
        <View style={styles.tagContainer} key={index}>
          <Text>{toCamelCase(tag)}</Text>
          <Button buttonStyle={styles.tagCloseButton} title="X" onPress={() => removeTag(tag)} />
        </View>
        // <Badge
        //   containerStyle={styles.tagContainer}
        //   badgeStyle={styles.tag}
        //   textStyle={styles.tagText}
        //   status="success"
        //   key={index}
        //   value={
        //     <View>
        //       <Text>{toCamelCase(tag)}</Text>
        //       <Button style={{width:5, height:5}} title="X" onPress={() => removeTag(tag)} />
        //     </View>
        //   }
        // />
      );
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>{title}</Text>
      </View>
      {renderTagList()}
      <Button title="Add" onPress={toggleAddTagOverlay} />
      {renderTaskTable()}
    </View>
  );
}

export default TagView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    // backgroundColor: 'red',
  },
  tagContainer: {
    flexDirection: 'row',
    marginRight: 5,
    // height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 3,
    margin: 3,

  },
  tag: {
    padding: 5,
    height: 30,
  },
  tagCloseButton: {
    backgroundColor: 'grey',
    height: 15
    // margin: 5,
    // fontSize: 20,
  },
  overlayAddTag: {},
});
