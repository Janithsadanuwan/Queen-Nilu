/*

Copyright (C) 2021 ππ€ππ²π²π» π‘πΆπΉππ.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const QueenNilu = require('queennilu-public');
const Nilu = QueenNilu.events
const Build = QueenNilu.build
const {MessageType} = require('@blackamda/queenamdi-web-api');
const got = require('got');

const Language = require('../language');
const Lang = Language.getString('weather');

if (Build.WORKTYPE == 'private') {

    Nilu.operate({pattern: 'weather ?(.*)', desc: Lang.WEATHER_DESC, fromMe: true,  deleteCommand: false}, async (message, match) => {

    	if (match[1] === '') return await message.reply(Lang.NEED_LOCATION);
	    const url = `http://api.openweathermap.org/data/2.5/weather?q=${match[1]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=tr`;
	    try {
		    const response = await got(url);
		    const json = JSON.parse(response.body);
		    if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*π ' + Lang.LOCATION +':* ```' + match[1] + '```\n\n' +
		    '*β ' + Lang.TEMP +':* ```' + json.main.temp_max + 'Β°```\n' + 
		    '*βΉ ' + Lang.DESC +':* ```' + json.weather[0].description + '```\n' +
		    '*β ' + Lang.HUMI +':* ```%' + json.main.humidity + '```\n' + 
		    '*π¨ ' + Lang.WIND +':* ```' + json.wind.speed + 'm/s```\n' + 
		    '*β ' + Lang.CLOUD +':* ```%' + json.clouds.all + '```\n', MessageType.text, {quoted: message.data});
	    } catch {
		    return await message.client.sendMessage(message.jid, Lang.NOT_FOUND, MessageType.text, {quoted: message.data});
	    }
    });
}
if (Build.WORKTYPE == 'public') {

    Nilu.operate({pattern: 'weather ?(.*)', desc: Lang.WEATHER_DESC, fromMe: false}, async (message, match) => {

        if (match[1] === '') return await message.reply(Lang.NEED_LOCATION);
	    const url = `http://api.openweathermap.org/data/2.5/weather?q=${match[1]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=tr`;
	    try {
		    const response = await got(url);
		    const json = JSON.parse(response.body);
		    if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*π ' + Lang.LOCATION +':* ```' + match[1] + '```\n\n' +
		    '*β ' + Lang.TEMP +':* ```' + json.main.temp_max + 'Β°```\n' + 
		    '*βΉ ' + Lang.DESC +':* ```' + json.weather[0].description + '```\n' +
		    '*β ' + Lang.HUMI +':* ```%' + json.main.humidity + '```\n' + 
		    '*π¨ ' + Lang.WIND +':* ```' + json.wind.speed + 'm/s```\n' + 
		    '*β ' + Lang.CLOUD +':* ```%' + json.clouds.all + '```\n', MessageType.text, {quoted: message.data});
	    } catch {
		    return await message.client.sendMessage(message.jid, Lang.NOT_FOUND, MessageType.text, {quoted: message.data});
	    }
    });
}
