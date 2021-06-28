const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true, //this is optional but it prefer to put it
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: 1,
      },
    },
    image: {
      type: DataTypes.STRING,
      // validate: {
      //   isUrl: true,
      // },
    },
  });

  SequelizeSlugify.slugifyModel(Product, {
    source: ["name"],
  });

  Product.associate = (models) => {
    models.Bakery.hasMany(Product, {
      foreignKey: "bakeryId",
      as: "products",
      alloNull: false,
    });

    Product.belongsTo(models.Bakery, { foreignKey: "bakeryId" });
  };

  return Product;
};
