module.exports = function(sequelize, DataTypes) {
  var Guest = sequelize.define("Guest", {
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
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    room_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    checkin: {
      type: DataTypes.DATEONLY
    },
    checkout: {
      type: DataTypes.DATEONLY
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    getterMethods: {
      isAdmin: function() {
        return this.getDataValue('isAdmin');
      }
    }
  });

  Guest.associate = function(models) {
    Guest.hasOne(models.Room);
    Guest.hasOne(models.Table);
  }

  return Guest;
};