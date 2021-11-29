/*

Copyright (C) 2021 💙𝗤𝘂𝗲𝗲𝗻 𝗡𝗶𝗹𝘂💙.
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
    Nilu.operate({pattern: 'tagadmin$', fromMe: true, desc: Lang.TAGADMİN,  deleteCommand: false}, (async (message, match) => {
        await QueenNilu.nilu_setup()
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '║ 👑 @' + uye.id.split('@')[0] + '\n';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid, '╔════════════════\n' + '║ *👑 Group Admin List 👑*\n' + '║ \n' + mesaj + '║ \n' + '╚════════════════', MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }));
}
else if (Build.WORKTYPE == 'public') {
    Nilu.operate({pattern: 'tagadmin$', fromMe: false, desc: Lang.TAGADMİN}, (async (message, match) => {
        await QueenNilu.Nilu_setup()
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '║ 👑 @' + uye.id.split('@')[0] + '\n';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid, '╔════════════════\n' + '║ *👑 Group Admin List 👑*\n' + '║ \n' + mesaj + '║ \n' + '╚════════════════', MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
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
                    mesaj += '║ 🎫 @' + uye.id.split('@')[0] + '\n';
                    jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
                }
            );
            await message.client.sendMessage(message.jid,'╔════════════════\n' + '║ *🇱🇰 Group Members List 🇱🇰*\n' + '║ \n' + mesaj + '║ \n' + '╚════════════════', MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
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