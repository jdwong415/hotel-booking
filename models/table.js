module.exports = function(sequelize, DataTypes) {
  var Table = sequelize.define("Table", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$",'i']
      }
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        not: ["[a-z]",'i']
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:  {
        isEmail: true
      }
    },
    res_time: {
      type: DataTypes.TIME,
      allowNull:false
    },
    num_party: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
    
  });

  Table.associate = function(models) {
    Table.belongsTo(models.Guest, {
      onDelete: "cascade"
    });
  
  };


  return Table;
};