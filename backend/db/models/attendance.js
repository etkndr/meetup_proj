'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendance.belongsTo(models.Event, {foreignKey: "eventId", as: "numAttending"})
      Attendance.belongsTo(models.User, {foreignKey: "userId"})
    }
  }
  Attendance.init({
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: "Events"},
      onDelete: "CASCADE"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: "Users"},
      onDelete: "CASCADE"
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Attendance',
  });

  Attendance.addScope("defaultScope", {
    attributes: {
      exclude: ["updatedAt", "createdAt"]
    }
  })

  Attendance.addScope("submission", {
    attributes: {
      exclude: ["id", "eventId", "updatedAt", "createdAt"]
    }
  })
  return Attendance;
};