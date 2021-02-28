const express = require('express');
const app = express();
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos
const { prefix } = require("./config.json");

// SEARCH-YOUTUBE //
//----------------//
// SEARCH-YOUTUBE //

// UNBAN-COMMAND //



// UNBAN-COMMAND //


// BAN-AND-KICK-COMMAND //
const command = require('./command')

client.on('ready', () => {


  command(client, 'ban', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban() 
        warns_channel = client.channels.cache.get('729889550809432124');
        warns_channel.send(`──── Banimento ────

:boy: Usuario: ${targetMember}
:boy: ID: ${target.id}

👮 Punido por: ${tag} 

──── Banimento ────`)
      } else {
        message.channel.send(`${tag} Especifique alguém para banir.`)
      }
    } else {
      message.channel.send(
        `${tag} Você não tem permissão para usar este comando.`
      )
    }
  })

  command(client, 'kick', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        warns_channel = client.channels.cache.get('729889550809432124');        
        targetMember.kick()
        warns_channel.send(`──── Expulso ────

:boy: Usuario: ${targetMember}
:boy: ID: ${target.id}

👮 Punido por: ${tag}

──── Expulso ────`)
      } else {
        message.channel.send(`${tag} Especifique alguém para expulsar.`)
      }
    } else {
      message.channel.send(
        `${tag} Você não tem permissão para usar este comando.`
      )
    }
  })
})

// BAN-AND-KICK-COMMAND //


//  MUSIC-YOUTUBE //

const queue = new Map();

client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "Você precisa estar em um canal de voz!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "Você precisa de permissão para falar!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url,
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 3,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} foi adicionada a fila!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Você tem que estar em um canal de voz para pular a musica!"
    );
  if (!serverQueue)
    return message.channel.send("Não há musicas para pular!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Você tem que estar em um canal de voz para parar a musica!"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Tocando agora: **${song.title}**`);
}


// MUSIC-YOUTUBE //

// BYE-BYE //

client.on("guildMemberRemove", async (member) => {

  let guild = await client.guilds.cache.get("729873038648279051");
  let channel = await client.channels.cache.get("729874289498521630");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === ":wine_glass:");
  if (guild != member.guild) {
    return console.log("Alguem saiu do servidor. Mas não é nesse, então tá tudo bem :)");
  } else {
    let embed = await new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`Adeus!`)
      .setDescription(`**${member.user.username}** saiu do Clube do Vinho :wine_glass:! Agora estamos com **${member.guild.memberCount} membros**`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter(`Clube do Vinho`)
      .setTimestamp();

    channel.send(embed);
  }
});

// BYE-BYE //

// WELCOME //

client.on("guildMemberAdd", async (member) => {

  let guild = await client.guilds.cache.get("729873038648279051");
  let channel = await client.channels.cache.get("729873039105458266");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "nomedoemoji");
  if (guild != member.guild) {
    return console.log("Sem boas-vindas pra você!");
  } else {
    let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`Bem-vindo`)
      .setDescription(`**${member.user}**, bem-vindo(a) ao **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Clube do Vinho")
      .setTimestamp();

    channel.send(embed);
  }
});

//  WELCOME

//  HANDLER //

client.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;
  if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
  if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

  const args = message.content
    .trim().slice(config.prefix.length)
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`)
    commandFile.run(client, message, args);
  } catch (err) {
    console.error('Erro:' + err);
  }
});

//  HANDLER //




client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token