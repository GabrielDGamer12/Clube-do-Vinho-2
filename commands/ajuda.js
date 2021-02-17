const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  const embed = new Discord.MessageEmbed()
    .setTitle('S️empre utilize o prefixo !')
    .setColor("#970044")
    .setSubtitle('Comandos')
    .setDescription('ajuda, avatar, ideia, uptime')

  message.channel.send(embed);
};