/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jobs_x_tag', {
    job_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'jobs',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'job_tags',
        key: 'id'
      }
    }
  }, {
    tableName: 'jobs_x_tag'
  });
};
