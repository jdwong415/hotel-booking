module.exports = function(sequelize, DataTypes) {
  var Table = sequelize.define("Table", {
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false 
    },
    party_number: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  });

  Table.associate = function(models) {
    
    Table.belongsTo(models.Guest, {
      onDelete: "cascade"
    });
  
  };


  return Table;
};