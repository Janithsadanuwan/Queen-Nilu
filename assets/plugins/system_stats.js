/*

Copyright (C) 2021 ππ€ππ²π²π» π‘πΆπΉππ.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const QueenNilu = require('queennilu-public');
const Nilu = QueenNilu.events
const Build = QueenNilu.build
const {MessageType, MessageOptions, Mimetype} = require('@blackamda/queenamdi-web-api');
const {spawnSync} = require('child_process');
const chalk = require('chalk');
const axios = require('axios');
const fs = require('fs');
let LOL = Build.WORKTYPE == 'public' ? false : true

const Language = require('../language');
const Lang = Language.getString('system_stats');

var SYSDTXT = ''
if (Build.LANG == 'SI') SYSDTXT = 'π» ΰΆ΄ΰΆ―ΰ·ΰΆ°ΰΆ­ΰ· ΰΆ­ΰΆ­ΰ·ΰΆ­ΰ·ΰ·ΰΆΊ'
if (Build.LANG == 'EN') SYSDTXT = 'π» System status'

var VER = ''
if (Build.LANG == 'SI') VER = 'π Version'
if (Build.LANG == 'EN') VER = 'π Version'

var MSG = ''
if (Build.ALIVEMSG == 'default') MSG = '```Hey There!ππ€ππ²π²π» π‘πΆπΉππ Bot Online now. ```\n\n*Developer:* ```Janith Sadanuwan```\n\n*Youtube channel :* https://www.youtube.com/c/janithsadanuwan\n\n```Thank You For Using ππ€ππ²π²π» π‘πΆπΉππ```'
else MSG = Build.ALIVEMSG


Nilu.operate({pattern: 'alive', fromMe: LOL, desc: Lang.ALIVE_DESC,  deleteCommand: false}, (async (message, match) => {
    await QueenNilu.nilu_setup()
    var logo = await axios.get (Build.ALIVE_LOGO, {responseType: 'arraybuffer'})
    var PIC = Buffer.from(logo.data)

    const media = await message.client.prepareMessage(message.jid, PIC, MessageType.image, { thumbnail: PIC })

    var BUTTHANDLE = '';
    if (/\[(\W*)\]/.test(Build.HANDLERS)) {
        BUTTHANDLE = Build.HANDLERS.match(/\[(\W*)\]/)[1][0];
    } else {
        BUTTHANDLE = '.';
    }
        
    const buttons = [
        {buttonId: BUTTHANDLE + 'qaversion', buttonText: {displayText: VER }, type: 1},
        {buttonId: BUTTHANDLE + 'qasysstats', buttonText: {displayText: SYSDTXT }, type: 1}
    ]
    const buttonMessage = {
        contentText: MSG,
        footerText: 'Η«α΄α΄α΄Ι΄ Ι΄ΙͺΚα΄ Β© α΄α΄ΚΚΙͺα΄ α΄α΄Ιͺα΄Ιͺα΄Ι΄',
        buttons: buttons,
        headerType: 4,
        imageMessage: media.message.imageMessage    
    }
    await message.client.sendMessage(message.jid, buttonMessage, MessageType.buttonsMessage);
}))

Nilu.operate({pattern: 'qasysstats', fromMe: LOL, desc: Lang.SYSD_DESC, dontAddCommandList: true,  deleteCommand: false}, (async (message, match) => {
    await QueenNilu.nilu_setup()
    const child = spawnSync('neofetch', ['--stdout']).stdout.toString('utf-8')
    await message.sendMessage(
        '```' + child + '```', MessageType.text, {quoted: message.data}
    );
}));

Nilu.operate({pattern: 'qaversion', fromMe: LOL, desc: Lang.BOT_V, dontAddCommandList: true,  deleteCommand: false}, (async (message, match) => {
    await QueenNilu.nilu_setup()
    await message.client.sendMessage(message.jid, 
        `*π Η«α΄α΄α΄Ι΄ Ι΄ΙͺΚα΄ Version π*\n\n` + 
        '```Installed version :```\n' +
        Lang.version + 
        `\n\nCheck official youtube chanel : www.youtube.com/c/janithsadanuwan`
   , MessageType.text, {quoted: message.data});
    
}));
