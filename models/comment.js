'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Tweet,
        {
          foreignKey: "tweetId",
          as: "tweet"
        });

      Comment.belongsTo(models.User,
        {
          foreignKey: "userId",
          as: "commenter"
        });
    }
  }
  Comment.init({
    text: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    tableName: "comments",
    modelName: 'Comment',
  });
  return Comment;
};