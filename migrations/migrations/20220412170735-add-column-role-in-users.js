'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn('users', 'role', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'REGULAR'
    });
  },
  down: async queryInterface => {
    await queryInterface.removeColumn('users', 'role');
  }
};
