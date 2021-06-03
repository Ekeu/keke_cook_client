import md5 from 'md5';

export const generateGravatar = (email) => {
  const hashedEmail = md5(email.toLowerCase().trim());
  return `https://www.gravatar.com/avatar/${hashedEmail}?d=identicon`;
};

export const currencyFormatter = (value) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
};

export const filterShares = (productShares) => {
  return productShares.map((ps) => ({
    share: ps.share.name,
    price: ps.price,
  }));
};

export const filterData = (data) => {
  return data.map((d) => d.name);
};

export const updateSelectShares = (shares, data, index) => {
  const shareList = [...shares];
  shareList[index]['share'] = data;
  return shareList;
};

export const updatePrice = (shares, e, index) => {
  const { name, value } = e.target;
  const shareList = [...shares];
  shareList[index][name] = value;
  return shareList;
};

export const updateAfterRemove = (shares, index) => {
  const shareList = [...shares];
  shareList.splice(index, 1);
  return shareList;
};

export const averageRating = (ratingsObjectArray) => {
  const ratingsObjectArrayLength = ratingsObjectArray.length
  const numericRatingsArray = ratingsObjectArray.map(review => review.rating)
  const sumOfAllNumericRatings = numericRatingsArray.reduce((acc, rating) => acc + rating, 0)
  const highestRatingValue = ratingsObjectArrayLength * 5
  const averageResult = (sumOfAllNumericRatings * 5) / highestRatingValue

  return averageResult
}
