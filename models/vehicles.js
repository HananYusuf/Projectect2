module.exports = function(sequelize, DataTypes) {
    const Vehicle = sequelize.define("Vehicle", {
        vehicle_make: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            len: [1]
            }
        },
        last_mileage: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        current_driver: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        current_location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        reg_exp: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        last_oilchange: {
            type: DataTypes.CHAR,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        reported_problems:{
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1,250]
            }
        }

    });

    Vehicle.associate = function(models) {
    // We're saying that a vehicle should belong to a user
    // A vehicle can't be created without a user due to the foreign key constraint
    Vehicle.belongsTo(models.User, {
        foreignKey: {
        allowNull: false
        }
    });
    };

    return Vehicle;
};
