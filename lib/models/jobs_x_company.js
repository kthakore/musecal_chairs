/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jobs_x_company', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    job_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'jobs',
        key: 'id'
      }
    },
    company_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'companies',
        key: 'id'
      }
    }
  }, {
    tableName: 'jobs_x_company'
  });
};
