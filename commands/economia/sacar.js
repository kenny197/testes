const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name:"sacar",
    category:"economia",
    aliases:['sac'],
    run: async (client, message, args) => {
      // --------------------------------------------
      
      let a = args[0];
      
      // --------------------------------------------
      
      let bank = db.get(`bank_${message.author.id}`);
       if (bank < a) return message.channel.send(`Você não tem ${a} para sacar!`);
      
      // --------------------------------------------
      
      message.channel.send(`Você sacou R$ ${a},00 do banco!`);
      
      // --------------------------------------------
      
      db.subtract(`bank_${message.author.id}`, a);
      db.add(`money_${message.author.id}`, a);
    }}
      