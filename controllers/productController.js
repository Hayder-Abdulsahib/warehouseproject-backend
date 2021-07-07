// Database
const { Product, Bakery } = require("../db/models");

exports.productFetch = async (productId, next) => {
  try {
    const product = await Product.findByPk(productId);
    return product;
  } catch (error) {
    next(error);
  }
};

exports.productList = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.productDetail = async (req, res) => res.json(req.product);

exports.productUpdate = async (req, res, next) => {
  try {
    if (req.bakery.userId !== req.user.id)
      throw {
        status: 401,
        message: "you can't update coockies that are not yours",
      };
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.product.update(req.body);
    res.status(201).json(req.product);
  } catch (error) {
    next(error);
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    if (req.bakery.userId !== req.user.id)
      throw {
        status: 401,
        message: "you can't delete coockies that are not yours",
      };
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
