'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transportation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transportation.belongsTo(models.User, {
        foreignKey : "authorId"
      })
      Transportation.belongsTo(models.Type, {
        foreignKey : "typeId"
      })
    }
  }
  Transportation.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "Name is not NULL"
        },
        notEmpty : {
          args : true,
          msg : "Name is not Empty"
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "Description is not NULL"
        },
        notEmpty : {
          args : true,
          msg : "Description is not Empty"
        }
      }
    },
    imgUrl: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "Image is not NULL"
        },
        notEmpty : {
          args : true,
          msg : "Image is not Empty"
        },
        isUrl : {
          msg : "Invalid Url"
        }
      }
    },
    location: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "Location is not NULL"
        },
        notEmpty : {
          args : true,
          msg : "Location is not Empty"
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "Price is not NULL"
        },
        notEmpty : {
          args : true,
          msg : "Price is not Empty"
        }
      },
      min : {
        args : 100000
      }
    },
    status : {
      type : DataTypes.STRING
    },
    typeId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transportation',
  });
  return Transportation;
};
