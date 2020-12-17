    module.exports = function(sequelize, DataTypes) {
        const Owner = sequelize.define("Owner", {
        // Giving the Author model a name of type STRING
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        companyName: DataTypes.STRING
        });
    
        Owner.associate = function(models) {
        // Associating Owner with Vehicle
        // When an Owner is deleted, also delete any associated Vehicles
        Owner.hasMany(models.Vehicle, {
            onDelete: "cascade"
        });
        };
    
        return Owner;
    };
    