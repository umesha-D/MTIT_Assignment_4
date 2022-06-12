const express = require("express");
const router = express.Router();
const validateToken = require("./../util/validateToken");
const {
  addProduct,
  getProducts,
  getSellerProducts,
  deleteProduct,
  updateProduct,
  viewProductById,
  addImage,
  removeImage,
} = require("./../service/ProductService");

/**
 * This function is only for accepting /api/product/add requests for adding products
 * The request body must contain all the attributes of model product(images are optional)
 * see model product @path {src/model/product.js}
 * This function can use any method implementation inside the service layer for adding products to any given relational or none relational database
 * see productService @path {src/service/productService.js}
 *
 * @method { HTTP POST }
 * @url {/api/product/add}
 * @urlparams {none}
 * @return {json} {Newly added product}
 */
router.post("/add", validateToken, async (req, res) => {
  try {
    const result = await addProduct(req.body, req.data);
    res.status(201).json({ result });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

/**
 * This function is only for accepting /api/product/view?page=m&limit=n requests for view all products
 * The request should not contain any body
 * This function can use any method implementation inside the service layer for view products
 * see productService @path {src/service/productService.js}
 *
 * @method { HTTP GET }
 * @url {/api/product/view?page=m&limit=n}
 * @urlparams {integer m - page number} - pagination page number
 * @urlparams {integer n - limit} -  pagination item limit
 * @return {json} {All products with pagination}
 */
router.get("/view", async (req, res) => {
  try {
    const result = await getProducts(req.query);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * This function is only for accepting /api/product/viewbyid/itemid requests for view product by id
 * The request should not contain any body
 * This function can use any method implementation inside the service layer for view producy by id
 * see productService @path {src/service/productService.js}
 *
 * @method { HTTP GET }
 * @url {/api/product/viewbyid/itemid}
 * @urlparams {itemid}
 * @return {json} {product data}
 */
router.get("/viewbyid/:itemid", async (req, res) => {
  try {
    const result = await viewProductById(req.params.itemid);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * This function is only for accepting /api/product/view/sellerid?page=m&limit=n requests for view products of a specific seller
 * The request should not contain any body
 * This function can use any method implementation inside the service layer for view products of a specific seller
 * see productService @path {src/service/productService.js}
 *
 * @method { HTTP GET }
 * @url {/api/product/view/:sellerid?page=m&limit=n}
 * @urlparams {integer sellerid}
 * @urlparams {integer m - page number} - pagination page number
 * @urlparams {integer n - limit} -  pagination item limit
 * @return {json} {All products for the specified sellerId with pagination}
 */
router.get("/view/:sellerid", async (req, res) => {
  try {
    const result = await getSellerProducts(req.params.sellerid, req.query);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * This function is only for accepting /api/product/delete/itemid requests for delete product
 * by it's respective id
 * This function can use any method implementation inside the service layer for delete product
 * see productService @path {src/service/productService.js}
 *
 * @method { HTTP DELETE }
 * @url {/api/product/delete/itemid}
 * @urlparams {integer itemid}
 * @return {json} {delected product data}
 */
router.delete("/delete/:itemid", validateToken, async (req, res) => {
  try {
    const result = await deleteProduct(req.params.itemid, req.data);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * This function is only for accepting /api/product/update/itemid requests for updating products
 * The request body must contain all the attributes of model product expect images
 * see model product @path {src/model/product.js}
 * This function can use any method implementation inside the service layer for upding products
 * see productService @path {src/service/productService.js}
 *
 * @method { HTTP UPDATE }
 * @url {/api/product/update/itemid}
 * @urlparams {itemid}
 * @return {json} {updated product}
 */
router.patch("/update/:itemid", validateToken, async (req, res) => {
  try {
    const result = await updateProduct(req.body, req.params.itemid, req.data);
    res.status(201).json({ result });
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * This function is only for accepting /api/product/addimage/itemid requests for adding images
 * The request body must contain a URL for a image
 * This function can use any method implementation inside the service layer for adding images
 * see productService @path {src/service/productService.js}
 *
 * @method { HTTP PATCH }
 * @url {/api/product/addimage/itemid}
 * @urlparams {itemid}
 * @return {json} {updated product}
 */
router.patch("/addimage/:itemid", validateToken, async (req, res) => {
  try {
    const result = await addImage(req.body, req.params.itemid, req.data);
    res.status(201).json({ result });
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * This function is only for accepting /api/product/removeimage/itemid requests for removing images
 * The request body must contain a URL for a image
 * This function can use any method implementation inside the service layer for adding images
 * see productService @path {src/service/productService.js}
 *
 * @method { HTTP PATCH }
 * @url {/api/product/removeimage/itemid}
 * @urlparams {itemid}
 * @return {json} {updated product}
 */
router.patch("/removeimage/:itemid", validateToken, async (req, res) => {
  try {
    const result = await removeImage(req.body, req.params.itemid, req.data);
    res.status(201).json({ result });
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
