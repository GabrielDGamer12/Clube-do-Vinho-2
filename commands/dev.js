module.exports.run = async (client, message, args) => {
  const m = await message.channel.send('');
};
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  const embed = new Discord.MessageEmbed()
    .setTitle("Desenvolvedor")
    .setThumbnail("https://cdn.discordapp.com/attachments/787491838545231902/833738674716803123/Arte_de_Canal.jpg")
    .setColor("#FF0000")
    .setDescription(`**Desenvolvido Por GabrielDGamer.** \n\nInstagram:https://www.instagram.com/gabrieldgamer_/\nYoutube:https://youtube.com/c/gabrieldgamer\nTwitch:https://www.twitch.tv/gabrieldgamer_\n\n Caso encontre algum erro no bot <@798993451793514496>, envie uma mensagem para <@737039257709051925>\n\nCódigo Aberto: **https://repl.it/@GabrielDGamer/Clube-do-Vinho-2**`)

  message.channel.send(embed);
};