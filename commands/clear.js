const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.reply(
      "Você não tem permissão para fazer isso!"
    );
  var canal = message.guild.channels.cache.find(ch => ch.id === "747251842769092729");
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 99)
    return message.reply(
      "forneça um número de até **99 mensagens** a serem excluídas"
    );

  const fetched = await message.channel.messages.fetch({
    limit: deleteCount + 1
  }, true);
  message.channel.bulkDelete(fetched, true);
  const msgsDeleted = await message.channel.bulkDelete(fetched, true);
  message.channel
    .send(msgsDeleted.size + ' mensagens limpas nesse chat! (' + (args[0] - msgsDeleted.size ) + " mensagens não foram apagadas por serem muito antigas.)" ).then(msg => msg.delete({timeout: 10000}))
    .catch(error =>
      console.log(` mensagens não foi possível deletar mensagens devido a: ${error}`)
    );
};