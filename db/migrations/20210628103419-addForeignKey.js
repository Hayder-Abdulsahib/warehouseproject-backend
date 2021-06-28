"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "bakeryId", Sequelize.INTEGER, {
      allowNull: false,
      references: {
        model: {
          tableName: "Bakeries",
        },
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "bakeryId");
  },
};
