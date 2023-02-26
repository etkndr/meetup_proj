'use strict';
const {Event} = require("../models")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EventImage.belongsTo(models.Event, {foreignKey: "eventId"})
      // EventImage.belongsTo(models.Event, {foreignKey: "eventId", as: "previewImage"})
    }
  }
  EventImage.init({
    eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: "Events"},
    onDelete: "CASCADE"
  },
    url: {
      type: DataTypes.STRING,
    allowNull: false
  },
    preview: {
      type: DataTypes.BOOLEAN,
    allowNull: false
  },
  }, {
    sequelize,
    modelName: 'EventImage',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return EventImage;
};