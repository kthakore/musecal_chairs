/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_tags', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'job_tags'
  });
};
