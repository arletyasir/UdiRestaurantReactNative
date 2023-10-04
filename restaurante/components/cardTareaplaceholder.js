import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardPlaceholder = () => {
  return (
    <>
      <View style={styles.container}>
      <View style={styles.imageContainer} />
      <View style={styles.content}>
        <View style={styles.datePlaceholder} />
        <View style={styles.descriptionPlaceholder} />
        <View style={styles.statusPlaceholder} />
      </View>
    </View>
    <View style={styles.container}>
      <View style={styles.imageContainer} />
      <View style={styles.content}>
        <View style={styles.datePlaceholder} />
        <View style={styles.descriptionPlaceholder} />
        <View style={styles.statusPlaceholder} />
      </View>
    </View>
    <View style={styles.container}>
      <View style={styles.imageContainer} />
      <View style={styles.content}>
        <View style={styles.datePlaceholder} />
        <View style={styles.descriptionPlaceholder} />
        <View style={styles.statusPlaceholder} />
      </View>
    </View>
    <View style={styles.container}>
      <View style={styles.imageContainer} />
      <View style={styles.content}>
        <View style={styles.datePlaceholder} />
        <View style={styles.descriptionPlaceholder} />
        <View style={styles.statusPlaceholder} />
      </View>
    </View>
    <View style={styles.container}>
      <View style={styles.imageContainer} />
      <View style={styles.content}>
        <View style={styles.datePlaceholder} />
        <View style={styles.descriptionPlaceholder} />
        <View style={styles.statusPlaceholder} />
      </View>
    </View>
    <View style={styles.container}>
      <View style={styles.imageContainer} />
      <View style={styles.content}>
        <View style={styles.datePlaceholder} />
        <View style={styles.descriptionPlaceholder} />
        <View style={styles.statusPlaceholder} />
      </View>
    </View>
    <View style={styles.container}>
      <View style={styles.imageContainer} />
      <View style={styles.content}>
        <View style={styles.datePlaceholder} />
        <View style={styles.descriptionPlaceholder} />
        <View style={styles.statusPlaceholder} />
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  datePlaceholder: {
    backgroundColor: '#ccc',
    height: 14,
    width: '70%',
    borderRadius: 5,
  },
  descriptionPlaceholder: {
    backgroundColor: '#ccc',
    height: 16,
    width: '100%',
    borderRadius: 5,
    marginTop: 10,
  },
  statusPlaceholder: {
    backgroundColor: '#ccc',
    height: 14,
    width: '40%',
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});

export default CardPlaceholder;
