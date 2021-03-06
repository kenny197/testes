const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    name:"trabalho",
    category:"economia",
    aliases:['work'],
    run: async (client, message, args) => {
      
      // ---------------------------------------------
      
      let user = message.author;
      
      // ---------------------------------------------
      
      let timeout = 86400000;
      
       const amount = Math.floor(Math.random() * (2000 - 500) + 500);
       
      // ---------------------------------------------
      
      let work = await db.fetch(`work_${user.id}`);
      
      if (work !== null && timeout - (Date.now() - work > 0)) {
        let time = ms(timeout - (Date.now() - work));
      
        
      // ---------------------------------------------
      
      
      message.channel.send(`✋ ** Você já trabalhou hoje. Trabalhe novamente em ${time.hours}h ${time.minutes}m ${time.seconds}s**`);
  } else {
      message.channel.send(`👍** No trabalho de hoje você ganhou: R$ ${amount},00**`);
  
  
      // ---------------------------------------------
     
    db.add(`money_${message.author.id}`, amount);
    db.set(`work_${message.author.id}`, Date.now());

      };
    }
  }
      
