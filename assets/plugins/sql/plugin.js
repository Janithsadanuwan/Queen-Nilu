/*

Copyright (C) 2021 Bππ€ππ²π²π» π‘πΆπΉππ.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const QueenNilu= require('queennilu-public');
const Build = QueenNilu.build
const { DataTypes } = require('sequelize');

const PluginDB = Build.DATABASE.define('Plugin', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

async function installPlugin(adres, file) {
    var Plugin = await PluginDB.findAll({
        where: {url: adres}
    });

    if (Plugin.length >= 1) {
        return false;
    } else {
        return await PluginDB.create({ url: adres, name: file });
    }
}
module.exports = { PluginDB: PluginDB, installPlugin: installPlugin };