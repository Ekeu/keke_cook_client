import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import Logo from '../../assets/images/keke_cook_logo.png';

import InvoiceTitle from './invoice-title.component';
import InvoiceNumber from './invoice-number.component';
import InvoiceBillTo from './invoice-bill-to.component';
import InvoiceItemsTable from './invoice-items-table.component';
import InvoiceMessage from './invoice-message.component';
import InvoiceDetails from './invoice-details.component';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  logo: {
    width: 66,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const Invoice = ({ order, address }) => {
  return (
    <Document>
      <Page size={'A4'} style={styles.page}>
        <Image style={styles.logo} src={Logo} />
        <InvoiceTitle title='Keke Cook' />
        <InvoiceNumber order={order} />
        <InvoiceBillTo address={address} />
        <InvoiceItemsTable order={order} />
      </Page>
      <Page size={'A4'} style={styles.page}>
        <InvoiceMessage message='Détail Commande' />
        <InvoiceDetails products={order?.products} />
      </Page>
    </Document>
  );
};

export default Invoice;
