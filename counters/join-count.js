module.exports = {
    1: '1️⃣', 2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣', 6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣', 10: '🔟',
};

module.exports = async (client) =>{
    const guild = client.guilds.cache.get('729873038648279051');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('729873039105458266');
        channel.setTopic(`Membros no CLUBE DO VINHO:wine_glass:: **${memberCount.toLocaleString()}**`);
        console.log('Updating Member Count');
    }, 60000);
}