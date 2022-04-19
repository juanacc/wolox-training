'use strict';

module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'weet',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
        reference: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'weets'
    }
  );

  return Weet;
};
