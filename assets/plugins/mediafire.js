/*

Copyright (C) 2021 ππ€ππ²π²π» π‘πΆπΉππ.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const QueenNilu = require('queennilu-public');
const Nilu = QueenNilu.events
const Build = QueenNilu.build
const download = QueenNilu.mediafire
const axios = require('axios')
const {MessageType, Mimetype} = require('@blackamda/queenamdi-web-api');
let LOL = Build.WORKTYPE == 'public' ? false : true

const Language = require('../language');
const Lang = Language.getString('mediafire');

Nilu.operate({ pattern: 'mediafire ?(.*)', fromMe: LOL, desc: Lang.MF_DESC,  deleteCommand: false}, (async (message, match) => {
    await QueenNilu.nilu_setup()
    const mflink = match[1]
    if (mflink === '') return await message.client.sendMessage(message.jid,Lang.NEEDURL, {quoted: message.data});

    try {
        var downloading = await message.client.sendMessage(message.jid,Lang.DOWNLOAD,MessageType.text, {quoted: message.data});
        const dl = await download.mediafireDl(mflink)
        const file = await axios.get(dl[0].link, {responseType: 'arraybuffer'})
        await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true});
        var uploading = await message.client.sendMessage(message.jid,Lang.UPLOAD,MessageType.text, {quoted: message.data});
        await message.client.sendMessage(message.jid, Buffer.from(file.data), MessageType.document, {filename: dl[0].nama, mimetype: dl[0].mime, quoted: message.data});
        return await message.client.deleteMessage(message.jid, {id: uploading.key.id, remoteJid: message.jid, fromMe: true})
    } catch {
        return await message.client.sendMessage(message.jid,Lang.INVALID,MessageType.text, {quoted: message.data});
    }
}));