import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  reportTitle: {
    color: '#E11D48',
    fontSize: 16,
    textAlign: 'center',
  },
});

const InvoiceTitle = ({ title }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>{title}</Text>
  </View>
);

export default InvoiceTitle;
