import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import { currencyFormatter } from '../../utils/functions';

const borderColor = '#E11D48';
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#F43F5E',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
  title: {
    width: '60%',
    textAlign: 'left',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: '10%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: 'right',
    paddingRight: 8,
  },
  unitPrice: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: 'right',
    paddingRight: 8,
  },
  amount: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 8,
  },
});

const InvoiceTableRow = ({ products }) => {
  return (
    <>
      {products?.map((product) => (
        <View style={styles.row} key={product?.c_id}>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.unitPrice}>
            {currencyFormatter(product?.price)}
          </Text>
          <Text style={styles.qty}>{product?.quantity}</Text>
          <Text style={styles.amount}>
            {currencyFormatter(product?.quantity * product?.price)}
          </Text>
        </View>
      ))}
    </>
  );
};

export default InvoiceTableRow;
