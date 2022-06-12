"use strict";

const Joi = require("joi");

/**
 * Current implementation validate inputs when adding new product
 * uses joi @visit {https://www.npmjs.com/package/joi}
 *
 * @params {An instance of product model}
 * @return {boolean} {valid or invalid}
 */
const productValidateAdd = (inputs) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(100).required(),
    discription: Joi.string().min(4).max(255).required(),
    category: Joi.string().min(4).max(255).required(),
    quantity: Joi.number().integer().min(1).required(),
    price: Joi.number().min(0).required(),
    addedAt: Joi.date().required(),
    updatedAt: Joi.date(),
    ownerRef: Joi.string().min(1).max(255).required(),
    images: Joi.array().items(Joi.string()),
  });

  return schema.validate({
    name: inputs.name,
    discription: inputs.discription,
    category: inputs.category,
    quantity: inputs.quantity,
    price: inputs.price,
    addedAt: inputs.addedAt,
    updatedAt: inputs.updatedAt,
    ownerRef: inputs.ownerRef,
    images: inputs.images
  });
};


/**
 * Current implementation validate inputs when updating a product
 * uses joi @visit {https://www.npmjs.com/package/joi}
 *
 * @params {An instance of product model}
 * @return {boolean} {valid or invalid}
 */
 const productValidateUpdate = (inputs) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(100).required(),
    discription: Joi.string().min(4).max(255).required(),
    category: Joi.string().min(4).max(255).required(),
    quantity: Joi.number().integer().min(1).required(),
    price: Joi.number().min(0).required(),
    updatedAt: Joi.date().required(),
  });

  return schema.validate({
    name: inputs.name,
    discription: inputs.discription,
    category: inputs.category,
    quantity: inputs.quantity,
    price: inputs.price,
    updatedAt: inputs.updatedAt,
  });
};

module.exports.productValidateAdd = productValidateAdd;
module.exports.productValidateUpdate = productValidateUpdate;