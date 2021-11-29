@Janithsadanuwan/queennilu-web-api@Janithsadanuwan/queennilu-web-api/*
Copyright (C) 2021 💙𝗤𝘂𝗲𝗲𝗻 𝗡𝗶𝗹𝘂💙.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const QueenNilu = require('queennilu-public');
const QueenNilu = QueenNilu.events
const Build = QueenNilu.build
const Heroku = require('heroku-client');
const {MessageType} = require('@blackamda/queenamdi-web-api');
const got = require('got');
const fs = require('fs');
const Db = require('./sql/plugin');

const Language = require('../language');
const Lang = Language.getString('_plugin');
const NLang = Language.getString('updater');

const heroku = new Heroku({
    token: Build.HEROKU.API_KEY
});

let baseURI = '/apps/' + Build.HEROKU.APP_NAME;

Nilu.operate({pattern: 'install ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false,}, (async (message, match) => {
    await QueenNilu.nilu_setup()
    if (match[1] === '') return await message.sendMessage(Lang.NEED_URL + '.install https://gist.github.com/Janithsadanuwan/49afd28b1932095cc76facbcedef3482')
    try {
        var url = new URL(match[1]);
    } catch {
        return await message.sendMessage(Lang.INVALID_URL);
    }
    
    if (url.host === 'gist.github.com') {
        url.host = 'gist.githubusercontent.com';
        url = url.toString() + '/raw'
    } else {
        url = url.toString()
    }

    var response = await got(url);
    if (response.statusCode == 200) {

        var plugin_name = response.body.match(/operate\({.*pattern: ["'](.*)["'].*}/);
        if (plugin_name.length >= 1) {
            plugin_name = "__" + plugin_name[1];
        } else {
            plugin_name = "__" + Math.random().toString(36).substring(8);
        }

        fs.writeFileSync('./assets/plugins/' + plugin_name + '.js', response.body);
        try {
            require('./' + plugin_name);
        } catch (e) {
            fs.unlinkSync('./' + plugin_name);
            return await message.sendMessage(Lang.INVALID_PLUGIN + ' ```' + e + '```');
        }

        await Db.installPlugin(url, plugin_name);
        await message.client.sendMessage(message.jid, Lang.INSTALLED, MessageType.text);
    }
}));

Nilu.operate({pattern: 'plugin', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    await QueenNilu.nilu_setup()
    var mesaj = Lang.INSTALLED_FROM_REMOTE;
    var plugins = await Db.PluginDB.findAll();
    if (plugins.length < 1) {
        return await message.sendMessage(Lang.NO_PLUGIN);
    } else {
        plugins.map(
            (plugin) => {
                mesaj += plugin.dataValues.name + ': ' + plugin.dataValues.url + '\n';
            }
        );
        return await message.client.sendMessage(message.jid, mesaj, MessageType.text);
    }
}));

Nilu.operate({pattern: 'remove(?: |$)(.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
    await QueenNilu.nilu_setup()
    if (match[1] === '') return await message.sendMessage(Lang.NEED_PLUGIN);
    if (!match[1].startsWith('__')) match[1] = '__' + match[1];
    var plugin = await Db.PluginDB.findAll({ where: {name: match[1]} });
    if (plugin.length < 1) {
        return await message.sendMessage(message.jid, Lang.NOT_FOUND_PLUGIN, MessageType.text);
    } else {
        await plugin[0].destroy();
        delete require.cache[require.resolve('./' + match[1] + '.js')]
        fs.unlinkSync('./assets/plugins/' + match[1] + '.js');
        await message.client.sendMessage(message.jid, Lang.DELETED, MessageType.text);
        
        await new Promise(r => setTimeout(r, 1000));
    
        await message.sendMessage(NLang.AFTER_UPDATE);

        console.log(baseURI);
        await heroku.delete(baseURI + '/dynos').catch(async (error) => {
            await message.sendMessage(error.message);

        });
    }

}));