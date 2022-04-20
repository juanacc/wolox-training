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
          model: 'user',
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
  // https://stackoverflow.com/questions/53882278/sequelize-association-called-with-something-thats-not-a-subclass-of-sequelize-m
  Weet.associate = model => {
    Weet.belongsTo(model.user, { foreignKey: 'userId' });
  };
  return Weet;
};
