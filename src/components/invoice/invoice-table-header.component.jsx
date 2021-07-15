import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#E11D48';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#F43F5E',
    backgroundColor: '#F43F5E',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
  },
  title: {
    width: '60%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  unitPrice: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: '10%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: '15%',
  },
});

const InvoiceTableHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nom</Text>
      <Text style={styles.unitPrice}>PU</Text>
      <Text style={styles.qty}>Quantité</Text>
      <Text style={styles.amount}>PT</Text>
    </View>
  );
};

export default InvoiceTableHeader;
