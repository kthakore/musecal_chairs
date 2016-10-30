/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_refs', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    job_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'jobs',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'job_refs'
  });
};
