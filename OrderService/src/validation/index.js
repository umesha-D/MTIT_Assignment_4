'use strict'

const Joi = require('joi')

exports.validateOrder = (order) => {
    const schema = Joi.object({
        customer: {
            firstname: Joi.string().min(1).max(255).required(),
            lastname: Joi.string().min(1).max(255),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','lk'] } })
        },
        amount: Joi.number().min(0).required(),
        items: Joi.array().items({
            name: Joi.string().min(1).max(255).required(),
            quantity: Joi.number().min(1).required(),
            price: Joi.number().min(0).required()
        }),
        billing: {
            name: Joi.string().min(1).max(255).required(),
            street: Joi.string(),
            town_city: Joi.string(),
            country_city: Joi.string(),
            postal_zip_code: Joi.string(),
            country: Joi.string()
        }
    })

    return schema.validate({
        customer: {
            firstname: order.customer.firstname,
            lastname: order.customer.lastname,
            email: order.customer.email
        },
        amount: order.amount
    })
}
