import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: 'Helvetica-Oblique',
  },
});

const InvoiceBillTo = ({ address }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.billTo}>Adresse de Facturation:</Text>
      <Text>{address?.first_name}</Text>
      <Text>{address?.last_name}</Text>
      <Text>{address?.street_address}</Text>
      <Text>{address?.street_address_cp}</Text>
      <Text>{address?.city}</Text>
      <Text>{address?.zip}</Text>
      <Text>{address?.email}</Text>
    </View>
  );
};

export default InvoiceBillTo;
