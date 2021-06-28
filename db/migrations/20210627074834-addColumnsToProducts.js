"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "name", Sequelize.STRING);
    await queryInterface.addColumn("Products", "slug", Sequelize.STRING, {
      unique: true,
    });
    await queryInterface.addColumn("Products", "price", Sequelize.INTEGER, {
      defaultValue: 5,
      // validate: {
      //   min: 1,    //it is better to not define validation in the migration files
      // },
    });
    await queryInterface.addColumn("Products", "description", Sequelize.STRING);
    await queryInterface.addColumn("Products", "image", Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "name");
    await queryInterface.removeColumn("Products", "slug");
    await queryInterface.removeColumn("Products", "price");
    await queryInterface.removeColumn("Products", "description");
    await queryInterface.removeColumn("Products", "image");
  },
};
