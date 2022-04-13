import React from 'react';
import {ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {scale} from 'react-native-size-matters';

export default function Container({
  children,
  isScrollable,
  bodyStyle,
  backgroundColor,
}) {
  return (
    <SafeAreaView
      styles={{backgroundColor: {backgroundColor}}}
      style={styles.container}>
      {isScrollable ? (
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
          <View style={[styles.innerView, bodyStyle]}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.innerView, bodyStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b1369',
  },
  innerView: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
});
