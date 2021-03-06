const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name:"balance",
    category:"economia",
    aliases:['bal', "atm"],
    run: async (client, message, args) => {
      
      // -----------------------------------------------
      
      const member = message.mentions.users.first() || message.author 
      
      // -----------------------------------------------
      
      let money = db.get(`money_${member.id}`);
      
       if(money === null) money = '0';
       
      let bank = db.get(`bank_${member.id}`);
      
       if(bank === null) bank = '0';
       
      // -----------------------------------------------
      
      let emoji_balance = '💲';
      
      // -----------------------------------------------
      
      const embed = new MessageEmbed()
      
        .setColor("00000")
        .setTitle(`Balance`)
        .addField("Dinheiro na Carteira: ", money)
        .addField("Dinheiro no Banco: ", bank)
        .setThumbnail(client.users.cache.get(member.id).avatarURL({ dynamic : true}))
        .setTimestamp()
        
      message.channel.send(embed)
      
    }}
