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
    fontSize: 12,
    fontStyle: 'bold',
  },
  description: {
    width: '85%',
    textAlign: 'right',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 8,
  },
});

const InvoiceTableFooter = ({ products }) => {
  let discount;
  let totalPriceAfterDiscount;

  if (products[0]?.discount && products[0]?.priceAfterDiscount) {
    discount = products[0]?.discount;
    totalPriceAfterDiscount = products
      ?.map((product) => product?.quantity * product?.priceAfterDiscount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  const totalPrice = products
    ?.map((product) => product?.quantity * product?.price)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.description}>
          {discount ? 'Prix initial' : 'Total'}
        </Text>
        <Text style={styles.total}>{currencyFormatter(totalPrice)}</Text>
      </View>
      {discount && (
        <View style={styles.row}>
          <Text style={styles.description}>
            {`Total apres remise de -${discount}%`}
          </Text>
          <Text style={styles.total}>
            {currencyFormatter(totalPriceAfterDiscount)}
          </Text>
        </View>
      )}
    </>
  );
};

export default InvoiceTableFooter;
