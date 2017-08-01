module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define("Room", {
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });

  Room.associate = function(models) {
    Room.belongsTo(models.Guest, {
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Room;
};