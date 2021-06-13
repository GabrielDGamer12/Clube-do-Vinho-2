const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let uptime = `🗓️ ${days.toFixed()} dias\n🗓️ ${hours.toFixed()} horas\n🗓️ ${minutes.toFixed()} minutos\n🗓️ ${seconds.toFixed()} segundos`;

  const embed = new Discord.MessageEmbed()
    .setTitle(`Ajuda`)
    .setColor("#FF0000")
    .setDescription(`**───────────── Clube do Vinho🍷 ─────────────**\n\n	                                 **Comandos de Musica**\n\n+play(link)	**|** Inicia qualquer video do youtube em formato de audio em um canal de voz!\n+skip          	**|** Pula a Musica Atual!\n+stop	     	**|** Para a musica e o bot sai do canal de voz!\n\n	                                   **Comandos Extras**\n\n+uptime		**|** Mostra quanto tempo o bot não é reiniciado!\n+avatar	 	**|** Envia seu avatar no chat(ou de quem for menciona)!\n+ideia   	 	**|** Envie uma sugestão!\n\n**───────────── Clube do Vinho🍷 ─────────────**`)

  message.channel.send(embed);
};