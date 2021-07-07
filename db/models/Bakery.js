const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Bakery = sequelize.define("Bakery", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  SequelizeSlugify.slugifyModel(Bakery, {
    source: ["name"],
  });

  Bakery.associate = (models) => {
    models.User.hasMany(Bakery, {
      foreignKey: "userId",
      alloNull: false,
    });

    Bakery.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Bakery;
};
