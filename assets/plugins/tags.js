/*

Copyright (C) 2021 ππ€ππ²π²π» π‘πΆπΉππ.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const QueenNilu = require('queennilu-public');
const Nilu = QueenNilu.events
const Build = QueenNilu.build
const {MessageType} = require('@blackamda/queenamdi-web-api');

const Language = require('../language');
const Lang = Language.getString('tagall');

if (Build.WORKTYPE == 'private') {
    Nilu.operate({pattern: 'tagadmin$', fromMe: true, desc: Lang.TAGADMΔ°N,  deleteCommand: false}, (async (message, match) => {
        await QueenNilu.nilu_setup()
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += 'β π @' + uye.id.split('@')[0] + '\n';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid, 'βββββββββββββββββ\n' + 'β *π Group Admin List π*\n' + 'β \n' + mesaj + 'β \n' + 'βββββββββββββββββ', MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }));
}
else if (Build.WORKTYPE == 'public') {
    Nilu.operate({pattern: 'tagadmin$', fromMe: false, desc: Lang.TAGADMΔ°N}, (async (message, match) => {
        await QueenNilu.Nilu_setup()
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += 'β π @' + uye.id.split('@')[0] + '\n';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid, 'βββββββββββββββββ\n' + 'β *π Group Admin List π*\n' + 'β \n' + mesaj + 'β \n' + 'βββββββββββββββββ', MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }));
}

Nilu.operate({pattern: 'tagall ?(.*)', fromMe: true,  deleteCommand: false,  desc: Lang.TAGALL_DESC, dontAddCommandList: true}, (async (message, match) => {
    await QueenNilu.nilu_setup()
    if (!message.reply_message) {
        if (match[1] !== '') {
            grup = await message.client.groupMetadata(message.jid);
            var jids = [];
            mesaj = '';
            grup['participants'].map(
                async (uye) => {
                    mesaj += '@' + uye.id.split('@')[0] + ' ';
                    jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
                }
            );
            await message.client.sendMessage(message.jid,`${match[1]}`, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
        }
        else if (match[1] == '') {
            grup = await message.client.groupMetadata(message.jid);
            var jids = [];
            mesaj = '';
            grup['participants'].map(
                async (uye) => {
                    mesaj += 'β π« @' + uye.id.split('@')[0] + '\n';
                    jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
                }
            );
            await message.client.sendMessage(message.jid,'βββββββββββββββββ\n' + 'β *π±π° Group Members List π±π°*\n' + 'β \n' + mesaj + 'β \n' + 'βββββββββββββββββ', MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
        }
    }
    else if (message.reply_message) {
        grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(
            async (uye) => {
                mesaj += '@' + uye.id.split('@')[0] + ' ';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        );
        var tx = message.reply_message.text
        await message.client.sendMessage(message.jid,tx, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }
}));