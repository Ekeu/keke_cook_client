import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { v4 as uuidv4 } from 'uuid';

import InvoiceProductSpec from './invoice-product-spec.component';

const styles = StyleSheet.create({
  textContainer: {
    margin: 12,
  },
  title: {
    color: '#E11D48',
    fontSize: 14,
    marginBottom: 3,
  },
  specTitle: {
    fontSize: 11,
    color: '#A855F7',
    marginBottom: 5,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#1E293B',
  },
});

const InvoiceDetails = ({ products }) => {
  return (
    <>
      {products?.map((product, productIdx) => {
        if (
          product?.productType === 'Number Cake' ||
          product?.productType === 'Letter Cake'
        ) {
          return (
            <View key={uuidv4()} style={styles.textContainer}>
              <Text style={styles.title}>{`${productIdx + 1} - ${
                product?.title
              }`}</Text>
              <Text style={styles.specTitle}>Nombre de Parts</Text>
              <InvoiceProductSpec value={product?.share} />
              <Text style={styles.specTitle}>Caractères</Text>
              <InvoiceProductSpec value={product?.caracters} />
              <Text style={styles.specTitle}>Crème</Text>
              <InvoiceProductSpec value={product?.cream} />
              <Text style={styles.specTitle}>Biscuit</Text>
              <InvoiceProductSpec value={product?.biscuit} />
              <Text style={styles.specTitle}>Toppings</Text>
              {product?.toppings?.map((topping) => (
                <InvoiceProductSpec key={uuidv4()} value={topping?.name} />
              ))}
              {product?.numberOfFlavors >= 2 && (
                <>
                  <Text style={styles.specTitle}>Crème 2</Text>
                  <InvoiceProductSpec value={product?.cream2} />
                  <Text style={styles.specTitle}>Biscuit 2</Text>
                  <InvoiceProductSpec
                    label={'Biscuit 2'}
                    value={product?.biscuit2}
                  />
                  <Text style={styles.specTitle}>Toppings 2</Text>
                  {product?.toppings2?.map((topping) => (
                    <InvoiceProductSpec key={uuidv4()} value={topping?.name} />
                  ))}
                </>
              )}
            </View>
          );
        }
        if (product?.productType === 'Cupcake') {
          return (
            <View key={uuidv4()} style={styles.textContainer}>
              <Text style={styles.title}>{`${productIdx + 1} - ${
                product?.title
              }`}</Text>
              <Text style={styles.specTitle}>Nombre de Parts</Text>
              <InvoiceProductSpec value={product?.share} />
              <Text style={styles.specTitle}>Cake</Text>
              <InvoiceProductSpec value={product?.cake} />
              <Text style={styles.specTitle}>Cake 2</Text>
              <InvoiceProductSpec value={product?.cake2} />
              <Text style={styles.specTitle}>Fourage</Text>
              <InvoiceProductSpec value={product?.fodder} />
              <Text style={styles.specTitle}>Fourage 2</Text>
              <InvoiceProductSpec value={product?.fodder2} />
              <Text style={styles.specTitle}>Couleur Crème</Text>
              <InvoiceProductSpec value={product?.creamColor} />
              <Text style={styles.specTitle}>Couleur Crème 2</Text>
              <InvoiceProductSpec value={product?.creamColor2} />
              <Text style={styles.specTitle}>Toppings</Text>
              {product?.toppings?.map((topping) => (
                <InvoiceProductSpec key={uuidv4()} value={topping?.name} />
              ))}
              <Text style={styles.specTitle}>Toppings 2</Text>
              {product?.toppings2?.map((topping) => (
                <InvoiceProductSpec key={uuidv4()} value={topping?.name} />
              ))}
              {product?.description && (
                <>
                  <Text style={styles.specTitle}>Description</Text>
                  <InvoiceProductSpec value={product?.description} />
                </>
              )}
            </View>
          );
        }
        if (product?.productType === 'Macaron') {
          return (
            <View key={uuidv4()} style={styles.textContainer}>
              <Text style={styles.title}>{`${productIdx + 1} - ${
                product?.title
              }`}</Text>
              <Text style={styles.specTitle}>Nombre de Parts</Text>
              <InvoiceProductSpec value={product?.share} />
              <Text style={styles.specTitle}>Couleur coque</Text>
              <InvoiceProductSpec value={product?.shellColor} />
              <Text style={styles.specTitle}>Fourage</Text>
              <InvoiceProductSpec value={product?.fodder} />
            </View>
          );
        }
        if (product?.productType === 'Brownie') {
          return (
            <View key={uuidv4()} style={styles.textContainer}>
              <Text style={styles.title}>{`${productIdx + 1} - ${
                product?.title
              }`}</Text>
              {product?.toppings?.length > 0 && (
                <>
                  <Text style={styles.specTitle}>Toppings</Text>
                  {product?.toppings?.map((topping) => (
                    <InvoiceProductSpec key={uuidv4()} value={topping?.name} />
                  ))}
                </>
              )}
            </View>
          );
        }
        return (
          <View key={uuidv4()} style={styles.textContainer}>
            <Text style={styles.title}>{`${productIdx + 1} - ${
              product?.title
            }`}</Text>
          </View>
        );
      })}
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </>
  );
};

export default InvoiceDetails;
