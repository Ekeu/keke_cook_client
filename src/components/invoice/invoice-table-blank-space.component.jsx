import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#E11D48';
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#F43F5E',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
    color: 'white',
  },
  title: {
    width: '60%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: '10%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  unitPrice: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: '15%',
  },
});

const InvoiceTableBlankSpace = ({ rowsCount }) => {
  const blankRows = Array(rowsCount).fill(0);
  return (
    <>
      {blankRows.map((x, i) => (
        <View style={styles.row} key={`blank${i}`}>
          <Text style={styles.title}>-</Text>
          <Text style={styles.unitPrice}>-</Text>
          <Text style={styles.qty}>-</Text>
          <Text style={styles.amount}>-</Text>
        </View>
      ))}
    </>
  );
};

export default InvoiceTableBlankSpace;
