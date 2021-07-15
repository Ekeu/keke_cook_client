import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './invoice-table-header.component';
import InvoiceTableRow from './invoice-table-row.component';
import InvoiceTableBlankSpace from './invoice-table-blank-space.component';
import InvoiceTableFooter from './invoice-table-footer.component';

const tableRowsCount = 12;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#F43F5E',
  },
});

const InvoiceItemsTable = ({ order }) => (
  <View style={styles.tableContainer}>
    <InvoiceTableHeader />
    <InvoiceTableRow products={order?.products} />
    <InvoiceTableBlankSpace rowsCount={tableRowsCount - order?.products?.length} />
    <InvoiceTableFooter products={order?.products} />
  </View>
);

export default InvoiceItemsTable;
