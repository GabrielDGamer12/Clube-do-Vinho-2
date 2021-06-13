module.exports = async (client) =>{
    const guild = client.guilds.cache.get('', '729873038648279051');
    setInterval(() =>{
        const memberCountleave = guild.memberCount;
        const channel = guild.channels.cache.get('729874289498521630');
        channel.setTopic(`Membros no CLUBE DO VINHO:wine_glass:: ${memberCountleave.toLocaleString()}`);
        console.log('Updating Member Count');
    }, 5000);
}