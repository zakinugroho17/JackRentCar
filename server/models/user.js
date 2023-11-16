"use strict";
const { Model } = require("sequelize");

const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transportation, {
        foreignKey: "authorId",
      });
      User.hasMany(models.Transaction, {
        foreignKey : "clientId"
      })
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: `Email is EXIST`,
        },
        validate: {
          notNull: {
            args: true,
            msg: `Email is not NULL`,
          },
          notEmpty: {
            args: true,
            msg: `Email is not EMPTY`,
          },
          isEmail: {
            args: true,
            msg: `Format email INVALID`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5],
          notNull: {
            args: true,
            msg: `Password is not NULL`,
          },
          notEmpty: {
            args: true,
            msg: `Password is not EMPTY`,
          },
        },
      },
      role: {
        type: DataTypes.STRING,
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    if (user.role === "Admin") {
      user.role = "Admin";
    } else {
      user.role = "User";
    }
  });
  return User;
};
