import React from 'react';
import moment from 'moment';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'flex-end',
  },
  invoiceDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: 'bold',
    textTransform: 'uppercase',
    marginLeft: 3
  },
  label: {},
});

const InvoiceNumber = ({ order }) => {
  return (
    <>
      <View style={styles.invoiceNoContainer}>
        <Text style={styles.label}>Reçu No:</Text>
        <Text style={styles.invoiceDate}>{order?._id}</Text>
      </View>
      <View style={styles.invoiceDateContainer}>
        <Text style={styles.label}>Date: </Text>
        <Text>{moment(order?.paymentIntent?.created * 1000).format('LL')}</Text>
      </View>
    </>
  );
};

export default InvoiceNumber;
