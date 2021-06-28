const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");

const {
  productFetch,
  productList,
  productDetail,
  productUpdate,
  productDelete,
} = require("../controllers/productController");

router.param("productId", async (req, res, next, productId) => {
  const product = await productFetch(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const err = new Error("Product Not Found");
    err.status = 404;
    next(err);
  }
});

//image in the single is the same name as we named it in the models in the Product.js

router.get("/", productList);

router.get("/:productId", productDetail);

router.put("/:productId", upload.single("image"), productUpdate);

router.delete("/:productId", productDelete);

module.exports = router;
