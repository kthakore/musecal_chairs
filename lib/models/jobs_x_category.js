/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jobs_x_category', {
    job_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'jobs',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'job_categories',
        key: 'id'
      }
    }
  }, {
    tableName: 'jobs_x_category'
  });
};
