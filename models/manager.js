module.exports = function(sequelize, DataTypes) {
  var Manager = sequelize.define("Manager", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password : {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    getterMethods: {
      isAdmin: function() {
        return this.getDataValue('isAdmin');
      }
    }
  });

  return Manager;
};