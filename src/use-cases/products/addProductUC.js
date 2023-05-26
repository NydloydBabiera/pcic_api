module.exports = function addProductUC({ productDataAccess }) {
  return async function newProduct(prodDetails) {
    const result = await productDataAccess.addNewProduct(prodDetails);

    return result;
  };
};
