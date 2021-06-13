const Discord = require("discord.js");

exports.run = async (client, message, args) => {
if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('🚨 | Desculpe, mas você não tem permissão para isso.').then(m => m.delete({ timeout: 5000 }));
message.delete();
  var canal = message.guild.channels.cache.find(ch => ch.id === "810967792475439154");
  const msg = await canal.send(
    new Discord.MessageEmbed()
    .setColor("#FF0000")
    .addField("Comandos de Moderação", "ㅤ")
    .addField("+ban", "utilização: **+ban @usuario (motivo)**\nㅤ")
    .addField("+kick", "utilização: **+kick @usuario (motivo)**\nㅤ")
    .addField("+unban", "utilização: **+unban ID (motivo opcional)**\nㅤ")
    .addField("+clear", "utilização: **+clear (1 a 99)** | Mensagens para serem deletadas \nㅤ")
    
    .setFooter("Desenvolvido por: " + "<@737039257709051925>" + "," + " utilize +dev" )
    .setTimestamp()
  );
  await message.channel.send(`${message.author} abra o canal <#810967792475439154>`);
}