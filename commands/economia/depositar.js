const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name:"depositar",
    category:"economia",
    aliases:['dep'],
    run: async (client, message, args) => {
      
      // --------------------------------------------
      
      let a = args[0];
      
      // --------------------------------------------
      
      let money = db.get(`money_${message.author.id}`);
       if (money < a) return message.channel.send(`Você não tem ${a} para depositar!`);
      
      // --------------------------------------------
      
      message.channel.send(`Você depositou R$ ${a},00 no banco!`);
      
      // --------------------------------------------
      
      db.subtract(`money_${message.author.id}`, a);
      db.add(`bank_${message.author.id}`, a);
      
    }
}