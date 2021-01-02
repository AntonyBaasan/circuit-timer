import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Button, Text } from 'react-native-elements';

type TagViewProps = {
  title: string;
  tags: string[];
};

function TagView(props: TagViewProps) {
  const { title, tags } = props;
  useEffect(() => {});

  function toCamelCase(str: string) {
    return str.replace(/\b(\w)/g, (s) => s.toUpperCase());
  }

  const addTag = () => {};

  const removeTag = () => {};

  const renderTagList = () => {
    return tags.map((tag, index) => {
      return (
        <Badge
          containerStyle={styles.tagContainer}
          badgeStyle={styles.tag}
          textStyle={styles.tagText}
          status="success"
          key={index}
          value={<Text>{toCamelCase(tag)}</Text>}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>{title}</Text>
      </View>
      {renderTagList()}
      <Button title="Add" onPress={addTag} />
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
    marginRight: 5,
    // height: 50,
  },
  tag: {
    padding: 5,
    height: 30,
  },
  tagText: {
    // margin: 5,
    // fontSize: 20,
  },
});
