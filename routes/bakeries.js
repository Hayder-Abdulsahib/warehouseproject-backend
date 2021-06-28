const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");

const {
  bakeryFetch,
  bakeryCreate,
  productCreate,
  bakeryList,
  bakeryDetail,
  bakeryUpdate,
  bakeryDelete,
} = require("../controllers/bakeryController");

router.param("bakeryId", async (req, res, next, bakeryId) => {
  const bakery = await bakeryFetch(bakeryId, next);
  if (bakery) {
    req.bakery = bakery;
    next();
  } else {
    const err = new Error("Bakery Not Found");
    err.status = 404;
    next(err);
  }
});

//image in the single is the same name as we named it in the models in the Product.js
router.post("/", upload.single("image"), bakeryCreate);

router.post("/:bakeryId/products", upload.single("image"), productCreate);

router.get("/", bakeryList);

router.get("/:bakeryId", bakeryDetail);

router.put("/:bakeryId", upload.single("image"), bakeryUpdate);

router.delete("/:bakeryId", bakeryDelete);

module.exports = router;
