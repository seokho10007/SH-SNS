const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
	static init(sequelize) {
		return super.init(
			{
				// id가 기본적으로 들어있다.
				userId: {
					type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
					allowNull: false, // 필수
					unique: true, // 고유한 값
				},
				nickname: {
					type: DataTypes.STRING(30),
					allowNull: false, // 필수
				},
				password: {
					type: DataTypes.STRING(100),
					allowNull: false, // 필수
				},
				firstName: {
					type: DataTypes.STRING(10),
					allowNull: false, // 필수
				},
				lastName: {
					type: DataTypes.STRING(10),
					allowNull: false, // 필수
				},
				gender: {
					type: DataTypes.STRING(10),
					allowNull: false, // 필수
				},
				birth: {
					type: DataTypes.DATE,
					allowNull: false, // 필수
				},
				profileImg: {
					type: DataTypes.STRING(200),
					allowNull: true,
				},
				introduction: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
			},
			{
				modelName: 'User',
				tableName: 'users',
				charset: 'utf8mb4',
				collate: 'utf8mb4_unicode_ci', // 한글 저장
				sequelize,
			},
		);
	}
	static associate(db) {
		db.User.hasMany(db.Post);
		db.User.hasMany(db.Comment);

		db.User.hasMany(db.Notice);

		db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
		db.User.belongsToMany(db.Post, { through: 'Save', as: 'Saved' });
		db.User.belongsToMany(db.User, {
			through: 'Follow',
			as: 'Followers',
			foreignKey: 'FollowingId',
		});
		db.User.belongsToMany(db.User, {
			through: 'Follow',
			as: 'Followings',
			foreignKey: 'FollowerId',
		});
	}
};
