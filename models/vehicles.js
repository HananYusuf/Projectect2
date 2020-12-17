    module.exports = function(sequelize, DataTypes) {
        const Vehicle = sequelize.define("Vehicle", {
        vehicleName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            len: [1]
            }
        },
        milage: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        problemsReorted: DataTypes.STRING,
        needsOilChange: {
            type: DataTypes.BOOLEAN,
            DEFAULT: false
        },
        lastLocation: DataTypes.STRING,
        registrationDate: DataTypes.DATEONLY

        });
    
        Vehicle.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Vehicle.belongsTo(models.Owner, {
            foreignKey: {
            allowNull: false
            }
        });
        };
    
        return Vehicle;
    };
    