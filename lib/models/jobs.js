/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jobs', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    short_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    model_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true
    },
    categories: {
      type: DataTypes.JSON,
      allowNull: true
    },
    refs: {
      type: DataTypes.JSON,
      allowNull: true
    },
    locations: {
      type: DataTypes.JSON,
      allowNull: true
    },
    levels: {
      type: DataTypes.JSON,
      allowNull: true
    },
    publication_date: {
      type: DataTypes.TIME,
      allowNull: false
    },
    created_at: {
      type: DataTypes.TIME,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.TIME,
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    underscored: true,
    timestamps: true,
    tableName: 'jobs'
  });
};
