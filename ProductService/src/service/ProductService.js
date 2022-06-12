"use strict";

const {
  productValidateAdd,
  productValidateUpdate,
} = require("./../util/productValidation");
const Product = require("./../model/product");
const { paginationControl } = require("./../util/paginationControl");

/**
 * Current implementation for add product to mopngodb using mongoose
 * uses mongoose @visit {https://www.npmjs.com/package/mongoose} for object mappping
 *
 * @params {productData - An instance of product model}
 * @params {payload - payload given by the JWT vertification}
 * @return {promise} {resolve upon successfull product add or reject if there is any error}
 */
const addProduct = (productData, payload) => {
  return new Promise(async (resolve, reject) => {
    //validate inputs
    const validate = productValidateAdd(productData);
    if (validate.error !== undefined) {
      reject(validate.error.details[0].message); //reject if there is any validation error
    }

    try {
      if (productData.ownerRef !== payload._id) {
        reject("unauthorized access");
      } else {
        const product = new Product(productData);
        const savedData = await product.save();
        resolve(savedData);
      }
    } catch (err) {
      console.log(err)
      reject(err);
    }
  });
};

/**
 * Current implementation for view all products from the mongodb database
 * uses mongoose @visit {https://www.npmjs.com/package/mongoose} for object mappping
 *
 * @params {object query - that contains page number and item limit for pagination}
 * @return {promise} {resolve all products with pagination or reject if there is any error}
 */
const getProducts = (query) => {
  //extract url params for control pagination
  const page = query.page;
  const limit = query.limit;

  return new Promise(async (resolve, reject) => {
    try {
      const allProducts = await Product.find(); //get all products
      resolve(paginationControl(allProducts, page, limit));
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Current implementation for view product by id from the mongodb database
 * uses mongoose @visit {https://www.npmjs.com/package/mongoose} for object mappping
 *
 * @params {item id}
 * @return {promise} {resolve product data reject if there is any error}
 */
const viewProductById = (itemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productData = await Product.findOne({ _id: itemId }); //get all products
      resolve(productData);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Current implementation for view all products of a specific seller from the mongodb database
 * uses mongoose @visit {https://www.npmjs.com/package/mongoose} for object mappping
 *
 * @params {integer sellerId}
 * @params {object query - that contains page number and item limit for pagination}
 * @return {promise} {resolve allproducts of a specific seller with pagination or reject if there is any error}
 */
const getSellerProducts = (sellerId, query) => {
  //extract url params for control pagination
  const page = query.page;
  const limit = query.limit;

  return new Promise(async (resolve, reject) => {
    try {
      const allSellerProducts = await Product.find({ ownerRef: sellerId }); //get products for a specific seller
      resolve(paginationControl(allSellerProducts, page, limit));
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Current implementation for delete product from mopngodb using it's id
 * uses mongoose @visit {https://www.npmjs.com/package/mongoose} for object mappping
 *
 * @params {productId - product id}
 * @params {payload - payload given by the JWT vertification}
 * @return {promise} {delected product data}
 */
const deleteProduct = (productId, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const itemData = await Product.find({ _id: productId });
      if (itemData[0].ownerRef !== payload._id) {
        reject("unauthorized access");
      } else {
        const delectedProduct = await Product.deleteOne({ _id: productId });
        resolve(delectedProduct);
      }
    } catch (err) {
      console.log(err)

      reject(err);
    }
  });
};

/**
 * Current implementation for update product from mopngodb using mongoose
 * uses mongoose @visit {https://www.npmjs.com/package/mongoose} for object mappping
 *
 * @params {productData - An instance of product model}
 * @params {itemId - item id}
 * @params {payload - payload given by the JWT vertification}
 * @return {promise} {resolve upon successfull product add or reject if there is any error}
 */
const updateProduct = (productData, itemId, payload) => {
  return new Promise(async (resolve, reject) => {
    //validate inputs
    const validate = productValidateUpdate(productData);
    if (validate.error !== undefined) {
      reject(validate.error.details[0].message); //reject if there is any validation error
    }

    try {
      const itemData = await Product.find({ _id: itemId });
      if (itemData[0].ownerRef !== payload._id) {
        reject("unauthorized access");
      } else {
        const updatedProduct = await Product.updateOne(
          { _id: itemId },
          {
            $set: {
              name: productData.name,
              discription: productData.discription,
              category: productData.category,
              quantity: productData.quantity,
              price: productData.price,
              updatedAt: productData.updatedAt,
            },
          }
        );
        resolve(updatedProduct);
      }
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Current implementation for add new image for a product to mopngodb using mongoose
 * uses mongoose @visit {https://www.npmjs.com/package/mongoose} for object mappping
 *
 * @params {imageURL - item id}
 * @params {imageURL - image URL}
 * @params {payload - payload given by the JWT vertification}
 * @return {promise} {resolve upon successfull image add or reject if there is any error}
 */
const addImage = (imageURL, itemId, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const itemData = await Product.find({ _id: itemId });
      if (itemData[0].ownerRef !== payload._id) {
        reject("unauthorized access");
      } else {
        const updatedProduct = await Product.updateOne(
          { _id: itemId },
          {
            $push: {
              images: imageURL.url,
            },
          }
        );
        resolve(updatedProduct);
      }
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Current implementation for remove existing image from a product to mopngodb using mongoose
 * uses mongoose @visit {https://www.npmjs.com/package/mongoose} for object mappping
 *
 * @params {imageURL - item id}
 * @params {imageURL - image URL}
 * @params {payload - payload given by the JWT vertification}
 * @return {promise} {resolve upon successfull image add or reject if there is any error}
 */
const removeImage = (imageURL, itemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const itemData = await Product.find({ _id: itemId });
      if (itemData[0].ownerRef !== payload._id) {
        reject("unauthorized access");
      } else {
        const updatedProduct = await Product.updateOne(
          { _id: itemId },
          {
            $pull: {
              images: imageURL.url,
            },
          }
        );
        resolve(updatedProduct);
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports.addProduct = addProduct;
module.exports.getProducts = getProducts;
module.exports.addImage = addImage;
module.exports.removeImage = removeImage;
module.exports.getSellerProducts = getSellerProducts;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;
module.exports.viewProductById = viewProductById;
