module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define("Restaurant", {
    name: {
    type: DataTypes.STRING,
    allowNull: false
    },
    address: {
      type: DataTypes.STRING,
    allowNull:false
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false
    },
    total_tables: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Restaurant.associate = function(models) {
    
    Restaurant.hasMany(models.Table, {
      onDelete: "cascade"
    });
  
  };


  return Restaurant;
};