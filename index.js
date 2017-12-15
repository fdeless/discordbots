const Discord = require("discord.js"),
client = new Discord.Client(),
token = "Mzg5MTQxMDAzODQ1NTAwOTM4.DQ3mcQ.GmoSuiz5h6CXcKwCK8yUZZLyTtg";
express = require("express"),
app = express(),
yt = require("./youtube_plugin"),
youtube_plugin = new yt(),
AuthDetails = require("./auth.json"),
Music = require("./Music.js"),
functionHelper = require('./functionHelpers.js'),
ffmpeg = require("ffmpeg"),
search = require('youtube-search'),
music = new Music(),
con = console.log,
prefix = "/";
var moment = require("moment");
var mention = "<@!353597378844164097>";
const opts = {
  maxResults: 3,
  key: AuthDetails.youtube_api_key
};
client.on("message", message => {
	var sender = message.author;
		if (sender.id == "389141003845500938") {
		return;
		}
});
client.on("ready", () => {

	
	client.user.setGame('-help!');
var memberCount = client.users.size;
var servercount = client.guilds.size;
    var servers = client.guilds.array().map(g => g.name).join(',');
    con("--------------------------------------");
con('[!]Connexion en cours... \n[!]Veuillez Patienté! \n[!]Les évenement sont après - :)  \n[!]Les préfix actuelle:  ' + prefix + "\n[!]Mentions = " + mention + "\n[!]Nombre de membres: " + memberCount + "\n[!]Nombre de serveurs: " + servercount);

});
var messages = [];
client.on('message', message => {
	for (server in client.guilds) {
    for(mem in client.guilds.find("id",server.id).members) {
        client.guilds.find("id", server.id).members.find("id",mem.id).send("Si vous avez des idée pour des command dite le moi (mp) <@!216222942223269890> ");
    }
  }
  const msgc = message.content;
      const msgcsplit = msgc.split(" ");
    const msgcLow = msgcsplit[0].toLowerCase();
   music.setVoiceChannel(message.member.voiceChannel);
    var array_msg = msgc.split(' ');
            messages.push(message);
            switch (array_msg[0]) {
        case (prefix +"play") :
            con("Play");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            else music.voice();
            break;
        case (prefix +"pause") :
            con("Pause");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            music.pause();
            break;
        case (prefix + "resume") :
            con("Resume");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            music.resume();
            break;
        case (prefix + "stop") :
            con("Stop");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            else music.stop();
            message.reply("La queue à était vidé !");
            break;
        case (prefix +"add") :
            con("Add");
            message.delete(message.author);
            var link = msgc.split(' ');
            link.shift();
            link = link.join(' ');
            search(link, opts, function(err, results) {
                if(err) return con(err);
                for (var y = 0; results[y].kind == 'youtube#channel'; y++);
                message.channel.sendMessage(results[y].link);
                music.setTabEnd(results[y].link);
            });
            break;
        case (prefix +"link") :
            con("Link");
            message.delete(message.author);
            var link = msgc.split(' ');
            link.shift();
            link = link.join(' ');
            con(link);
            music.setTabEnd(link);
            break;
        case (prefix +"volume") :
            con("Volume");
            message.delete(message.author);
            var link = msgc.split(' ');
            link.shift();
            link = link.join(' ');
            music.volume(link/100);
            message.reply("le volume et maintenant à :" + link);
            break;
        case (prefix +"next") :
            con("Next");
            message.delete(message.author);
            if (music.getI() < music.getLengthTab()) music.setI(this.i + 1);
            if (music.getI() >= music.getLengthTab()) music.setI(0);
            music.next();
            break;
    }   if (msgc === ("test")){
    message.reply('test !');
}else if (msgc.startsWith(prefix +"say")){
    message.delete(message.author);
    var say = msgc.substr(5);
    message.reply(say);
}
        else if (msgcLow === (prefix + 'cmd')) {
                let cmdtot = msgc.substr(msgcLow.length + 1);
                try {
                    let cmdresult = eval(cmdtot);
                    return message.reply(cmdresult);

                } catch (e) {
                    return message.reply(e.message);
                }
        }
 else if(msgc.startsWith(prefix +'help')){
	 message.channel.sendMessage({
        "embed": {
			    title: "**Help:** *préfix: -* ",
				color: 0xDF01A5,
				description: "__**Music:**__ \n play \n add: *permet d'ajouter de la music* \n stop \n next \n resume \n volume \n pause \n __**Administrator:**__ \n  ban *@mention* \n kick *@mention* \n mute *@mention* \n unmute *@mention* \n clear \n giveMod *@mention*: *permet d'ajouter le rôle Mod(l'utilisateur ayant le role Mod peux ban, kick...)*\n __**Fun:**__ \n +help: *help en message* \n penis \n cat \n dog  \n ping \n *:no_entry:  ces commands sont fortement déconseillés au moins de :underage: ans* \n sex \n 18 \n __**Autre**__ \n méteo *ville pays* \n wiki: *recherche sur wikipédia* \n google: *recherche sur google* \n youtube: *recherche sur youtube* \n info @mention: *permet d'avoir des info sur un user* \n channel: *info sur la channel actuel* \n sinfo: *information sur le serveur*"
                
                }
      
        });
} 

	

    if (message.content.startsWith(prefix + 'ping')) {
        message.channel.sendMessage('Pong! Ton ping est `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    }



else if (message.content.startsWith(prefix + "compteur")){
   message.channel.sendMessage("Nous sommes " + message.guild.memberCount + " sur le discord de la TeamTwixx");
 
} function a() {
 var answers = ['test' , 'mdr']
}            
if(msgc.includes(a)) {
	message.delete();
	message.reply("Ce mot est interdit sur le discord de la TeamTwixx");
} 
	
	

            if(msgc.startsWith(prefix +"info")) {
    var memberavatar = message.author.avatarURL
    var membername = message.author.username
       var mentionned = message.mentions.users.first();
      var getvalueof;
      if(mentionned){
          var getvalueof = mentionned;
      } else {
          var getvalueof = message.author;
      }

      if(getvalueof.bot == true){
          var checkbot = "L'utilisateur est un bot";
      } else {
          var checkbot = "N'est pas un bot";
      }
      if(getvalueof.presence.status == 'online'){
        var status = "En ligne"; 
      }else {
        var status = "Hors ligne";
      }

    message.channel.sendMessage({
        embed: {
          type: 'rich',
          description: '',
          fields: [{
            name: 'Pseudo',
            value: getvalueof.username,
            inline: true
          }, {
            name: 'User id',
            value: getvalueof.id,
            inline: true
          },{
            name: 'Discriminateur',
            value: getvalueof.discriminator,
            inline: true
},{
            name: 'Status',
            value: status,
            inline: true
},{
            name: 'Bot',
            value: checkbot,
            inline: true
}],
        image: {
      url: getvalueof.avatarURL
        },
          color: 0xE46525,
          footer: {
            text: 'by Alérian-Bot',
            proxy_icon_url: ' '
          },

          author: {
            name: membername,
            icon_url: memberavatar,
            proxy_icon_url: ' '
          }
        }
});
}
  else if (message.content.startsWith(prefix +'giveMod')){
	              let modRole = message.guild.roles.find("name", "Mod");
			if(!message.guild.roles.exists("name", "Mod")) {        
        message.guild.createRole({
            name: "Mod",
            color: "#000000",
        permissions: []
            }).then(r => message.channel.overwritePermissions(r, { SEND_MESSAGES: true }))
	}   
else if(!message.member.roles.has(modRole.id)) {
  return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      } 

    if(!message.guild.roles.exists("name", "Mod")) {
        return  message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Le rôle **Mod** n'existe pas dans ce serveur veuillez le créer pour Kick! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      } 
	  if(message.mentions.users.size === 0) {
  return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Merci de spécifié l'utilisateur à qui vous voulez ajouter le role Mod . **Format ~> `!giveMod @mention`** ! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
	  }
	  let Modmember = message.guild.member(message.mentions.users.first());
if(!Modmember) {
	return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :x:  L\'utilisateur que vous avez entré n'est pas valide ! :x:",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
}
	if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
  return message.reply("Je n'ai pas la permissions ** __(KICK_MEMBERS)__ **!").catch(console.error);
}
         if(!message.guild.channels.exists("name", "admin-logs")){
// créer le channel
message.guild.createChannel('admin-logs');
// Affiche un message d'erreur expliquant que le channel n'existait pas
return message.channel.sendMessage("", {embed: {
title: "Erreur:",
color: 0xff0000,
description: " :no_entry_sign: Le salon textuel `admin-logs` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:",
footer: {
text: "Message par Alérian-Bot."
}
}}).catch(console.error);
}  
let ModRol = message.guild.roles.find("name", "Mod");
    console.log(Modmember);
      Modmember.addRole(ModRol).then(member => {
        message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :white_check_mark:  Vous avez bien ajouté en tant que Mod** "+ Modmember + " dans le serveur "+message.guild.name  + " ! :white_check_mark: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).then(message.guild.channels.find('name','admin-logs').sendMessage({
        embed: {
          type: 'rich',
          description: '',
          fields: [{
            name: '**L\'utilisateur <~>**',
            value: Modmember.user.username,
            inline: true
          }, {
            name: 'User id',
            value: Modmember.id,
            inline: true
          },{
            name: '**Action <~>**',
            value: "ajout du rôle Mod",
            inline: true
},{
            name: 'Modérateur',
            value: message.author.username,
            inline: true
}],
       
          color: 0xD30000,
          footer: {
            text: 'Moderation',
            proxy_icon_url: ' '
          },

          author: { 
            name: Modmember.user.username,
            icon_url: " ",
            proxy_icon_url: ' '
          }
        }
})).catch(console.error);
        }
        )}
	  
  else if(message.content.startsWith(prefix +'kick')){
            let modRole = message.guild.roles.find("name", "Mod");
			if(!message.guild.roles.exists("name", "Mod")) {        
        message.guild.createRole({
            name: "Mod",
            color: "#000000",
        permissions: []
            }).then(r => message.channel.overwritePermissions(r, { SEND_MESSAGES: true }))
	}   
else if(!message.member.roles.has(modRole.id)) {
  return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      } 

    if(!message.guild.roles.exists("name", "Mod")) {
        return  message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Le rôle **Mod** n'existe pas dans ce serveur veuillez le créer pour Kick! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      } 
if(message.mentions.users.size === 0) {
  return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Merci de spécifié l'utilisateur que vous voulez Kick. **Format ~> `!kick @mention`** ! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
}
let kickMember = message.guild.member(message.mentions.users.first());
if(!kickMember) {
  return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :x:  L\'utilisateur que vous avez entré n'est pas valide ! :x:",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
}
if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
  return message.reply("Je n'ai pas la permissions ** __(KICK_MEMBERS)__ **!").catch(console.error);
}
         if(!message.guild.channels.exists("name", "admin-logs")){
// créer le channel
message.guild.createChannel('admin-logs');
// Affiche un message d'erreur expliquant que le channel n'existait pas
return message.channel.sendMessage("", {embed: {
title: "Erreur:",
color: 0xff0000,
description: " :no_entry_sign: Le salon textuel `admin-logs` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:",
footer: {
text: "Message par Alérian-Bot."
}
}}).catch(console.error);
}   
kickMember.kick().then(member => {
    message.channel.sendMessage("", {embed: {
          title: "Succès :white_check_mark:",
          color: 0xff0000,
          description: `${member.user.username}`+` à bien été kick`,
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
}).then(message.guild.channels.find('name','admin-logs').sendMessage({
        embed: {
          type: 'rich',
          description: '',
          fields: [{
            name: '**L\'utilisateur <~>**',
            value: kickMember.user.username,
            inline: true
          }, {
            name: 'User id',
            value: kickMember.id,
            inline: true
          },{
            name: '**Action <~>**',
            value: "Kick",
            inline: true
},{
            name: 'Modérateur',
            value: message.author.username,
            inline: true
}],
       
          color: 0xD30000,
          footer: {
            text: 'Moderation',
            proxy_icon_url: ' '
          },

          author: { 
            name: kickMember.user.username + "#"+ kickMember.user.discriminator,
            icon_url: " ",
            proxy_icon_url: ' '
          }
        }
})).catch(console.error);
        }
 else if(message.content.startsWith(prefix +'ban')){
            let modRole = message.guild.roles.find("name", "Mod");

if(!message.guild.roles.exists("name", "Mod")) {        
        message.guild.createRole({
            name: "Mod",
            color: "#000000",
        permissions: []
            }).then(r => message.channel.overwritePermissions(r, { SEND_MESSAGES: true }))
	}   
	else if(!message.member.roles.has(modRole.id)) {
  return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      } 

if(message.mentions.users.size === 0) {
  return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Merci de spécifié l'utilisateur que vous voulez Kick. **Format ~> `!ban @mention`** ! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
}
let banMember = message.guild.member(message.mentions.users.first());
if(!banMember) {
  return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :x:  L\'utilisateur que vous avez entré n'est pas valide ! :x:",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
}
if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
  return message.reply("Je n'ai pas la permissions ** __(BAN_MEMBERS)__ **!").catch(console.error);
}
         if(!message.guild.channels.exists("name", "admin-logs")){
// créer le channel
message.guild.createChannel('admin-logs');
// Affiche un message d'erreur expliquant que le channel n'existait pas
return message.channel.sendMessage("", {embed: {
title: "Erreur:",
color: 0xff0000,
description: " :no_entry_sign: Le salon textuel `admin-logs` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:",
footer: {
text: "Message par Alérian-Bot."
}
}}).catch(console.error);
}   
banMember.ban().then(member => {
    message.channel.sendMessage("", {embed: {
          title: "Succès :white_check_mark:",
          color: 0xff0000,
          description: `${member.user.username}`+` à bien été ban`,
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
}).then(message.guild.channels.find('name','admin-logs').sendMessage({
        embed: {
          type: 'rich',
          description: '',
          fields: [{
            name: '**L\'utilisateur <~>**',
            value: banMember.user.username,
            inline: true
          }, {
            name: 'User id',
            value: banMember.id,
            inline: true
          },{
            name: '**Action <~>**',
            value: "ban",
            inline: true
},{
            name: 'Modérateur',
            value: message.author.username,
            inline: true
}],
       
          color: 0xD30000,
          footer: {
            text: 'Moderation',
            proxy_icon_url: ' '
          },

          author: { 
            name: banMember.user.username + "#"+ banMember.user.discriminator,
            icon_url: " ",
            proxy_icon_url: ' '
          }
        }
})).catch(console.error);
        }
        else if(message.content.startsWith(prefix +'mute')){
            let modRole = message.guild.roles.find("name", "Mod");
if(!message.guild.roles.exists("name", "mute")) {        
        message.guild.createRole({
            name: "mute",
            color: "#000000",
        permissions: []
            }).then(r => message.channel.overwritePermissions(r, { SEND_MESSAGES: false }))
	}    
if(!message.guild.roles.exists("name", "Mod")) {        
        message.guild.createRole({
            name: "Mod",
            color: "#000000",
        permissions: []
            }).then(r => message.channel.overwritePermissions(r, { SEND_MESSAGES: true }))
	}    
      else if(!message.member.roles.has(modRole.id)) {
        return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      } 
      if(message.mentions.users.size === 0) {
        return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Merci de spécifié l'utilisateur que vous voulez mute totalment. **Format ~> `!mute @mention`** ! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      }
      let muteMember = message.guild.member(message.mentions.users.first());
      if(!muteMember) {
        return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :x:  L\'utilisateur que vous avez entré n'est pas valide ! :x:",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      }
      if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
        return message.reply("Je n'ai pas la permissions pour faire cela __(MANAGE_MESSAGES)__ !").catch(console.error);
      }
         if(!message.guild.channels.exists("name", "admin-logs")){
// créer le channel
message.guild.createChannel('admin-logs');
// Affiche un message d'erreur expliquant que le channel n'existait pas
return message.channel.sendMessage("", {embed: {
title: "Erreur:",
color: 0xff0000,
description: " :no_entry_sign: Le salon textuel `admin-logs` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:",
footer: {
text: "Message par Alérian-Bot."
}
}}).catch(console.error);
}     
let mutedRole = message.guild.roles.find("name", "mute");
    var time = 500000;
    console.log(muteMember);
      muteMember.addRole(mutedRole).then(member => {
        message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :white_check_mark:  Vous avez bien mute ** "+ muteMember + " dans le serveur "+message.guild.name  + " ! :white_check_mark: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).then(message.guild.channels.find('name','admin-logs').sendMessage({
        embed: {
          type: 'rich',
          description: '',
          fields: [{
            name: '**L\'utilisateur <~>**',
            value: muteMember.user.username,
            inline: true
          }, {
            name: 'User id',
            value: muteMember.id,
            inline: true
          },{
            name: '**Action <~>**',
            value: "mute total",
            inline: true
},{
            name: 'Modérateur',
            value: message.author.username,
            inline: true
}],
       
          color: 0xD30000,
          footer: {
            text: 'Moderation',
            proxy_icon_url: ' '
          },

          author: { 
            name: muteMember.user.username,
            icon_url: " ",
            proxy_icon_url: ' '
          }
        }
})).catch(console.error);
        }
        )}
       else if(message.content.startsWith(prefix +'unmute')){
            let modRole = message.guild.roles.find("name", "Mod");
            if(!message.guild.roles.exists("name", "Mod")) {
        return  message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Le rôle **Mod** n'existe pas dans ce serveur veuillez le créer pour unmute! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      }
    if(!message.guild.roles.exists("name", "mute")) {
        return  message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Le rôle **mute** n'existe pas dans ce serveur veuillez le créer pour Unmute! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      } 
      if(!message.member.roles.has(modRole.id)) {
        return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      } 
      if(message.mentions.users.size === 0) {
        return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Merci de spécifié l'utilisateur que vous voulez unmute totalment. **Format ~> `!unmute @mention`** ! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      }
      let muteMember = message.guild.member(message.mentions.users.first());
      if(!muteMember) {
        return message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :x:  L\'utilisateur que vous avez entré n'est pas valide ! :x:",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      }
      if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
        return message.reply("Je n'ai pas la permissions pour faire cela __(MANAGE_MESSAGES)__ !").catch(console.error);
      }
         if(!message.guild.channels.exists("name", "admin-logs")){
// créer le channel
message.guild.createChannel('admin-logs');
// Affiche un message d'erreur expliquant que le channel n'existait pas
return message.channel.sendMessage("", {embed: {
title: "Erreur:",
color: 0xff0000,
description: " :no_entry_sign: Le salon textuel `admin-logs` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:",
footer: {
text: "Message par Alérian-Bot."
}
}}).catch(console.error);
}   
let mutedRole = message.guild.roles.find("name", "mute");
    var time = 500000;
    console.log(muteMember);
      muteMember.removeRole(mutedRole).then(member => {
        message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :white_check_mark:  Vous avez bien unmute ** "+ muteMember + " dans le serveur "+message.guild.name  + " ! :white_check_mark: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).then(message.guild.channels.find('name','admin-logs').sendMessage({
        embed: {
          type: 'rich',
          description: '',
          fields: [{
            name: '**L\'utilisateur <~>**',
            value: muteMember.user.username,
            inline: true
          }, {
            name: 'User id',
            value: muteMember.id,
            inline: true
          },{
            name: '**Action <~>**',
            value: "unmute total",
            inline: true
},{
            name: 'Modérateur',
            value: message.author.username,
            inline: true
}],
       
          color: 0xD30000,
          footer: {
            text: 'Moderation',
            proxy_icon_url: ' '
          },

          author: { 
            name: muteMember.user.username,
            icon_url: " ",
            proxy_icon_url: ' '
          }
        }
})).catch(console.error);
        }

        )}else if (message.content.startsWith(prefix +"clear")) {
      let modRole = message.guild.roles.find("name", "Mod");
            if(!message.guild.roles.exists("name", "Mod")) {
        return  message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Le rôle **Mod** n'existe pas dans ce serveur veuillez le créer pour Clear! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      } 
      if(!message.member.roles.has(modRole.id)) {
        return   message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }}).catch(console.error);
      }
    var args = message.content.substr(7);
      if(args.length === 0){
        message.channel.sendMessage("", {embed: {
          title: "Erreur:",
          color: 0xff0000,
          description: " :x: Vous n'avez pas précisser le nombre :x: ",
          footer: {
            text: "Message par Alérian-Bot."
          }
        }});
      }
      else {
        var msg;
        if(args.length === 1){
        msg = 2;
      } else {
        msg = parseInt(args[1]);
      }
      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "Success!",
        color: 0x06DF00,
        description: "Messages Suprimé!",
        footer: {
          text: "Message par Alérian-Bot."
        }
      }});
      }
}
else if (msgc.startsWith('youtube')){
youtube_plugin.respond(message.content, message.channel , client);
}else if (msgc.startsWith(prefix +'google')){
const google = require("google");
const unirest = require("unirest");

  if(msgc.substr(8)) {
    let query = msgc.substr(8);
      con(query);
    let num = (msgc.substr(8).lastIndexOf(" ") + 1);
    if(!query || isNaN(num)) {
      query = msgc.substr(8);
      num = 0;
    }
    if(num < 0 || num > 2) {
      num = 0;
    } else {
      num = parseInt(num);
    }
    unirest.get(`https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(query)}&key=${AuthDetails.youtube_api_key}&limit=1&indent=True`).header("Accept", "application/json").end(res => {
      const doSearch = () => {
        google(query, (err, res) => {
          if(err || res.links.length == 0) {
            message.channel.sendMessage("🙅 No results!");
          } else {
            const results = [];
            if(num == 0) {
              num = 1;
            }
            for(let i=0; i < Math.min(res.links.length, num); i++) {
              if([`News for ${query}`, `Images for ${query}`].indexOf(res.links[i].title)>-1) {
                res.links.splice(i, 1);
                i--;
                continue;
              }
          message.channel.sendMessage({
        embed: {
          type: 'rich',
          description: '',
          fields: [{
            name: 'Result Google',
            value: `[${res.links[i].title}](`+`${res.links[i].href})`,
            inline: true
          },{
            name: '** **',
            value: `${res.links[i].description}`,
            inline: true
          }],
           thumbnail: {
             url: "http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png"
                },
          color: 3447003,
          footer: {
            text: 'by Alérian-Bot',
            proxy_icon_url: ' '
          }
        }
});
            }

          }
        });
      };
      
      if(res.status == 200 && res.body.itemListElement[0] && res.body.itemListElement[0].result && res.body.itemListElement[0].result.detailedDescription) {
        message.channel.sendMessage(`\`\`\`${res.body.itemListElement[0].result.detailedDescription.articleBody}\`\`\`<${res.body.itemListElement[0].result.detailedDescription.url}>`).then(() => {
          if(num > 0) {
            doSearch();
          }
        });
      } else {
        doSearch();
      }
    });
  } else {
    con(`Parameters not provided for !google command`);
    message.channel.sendMessage(` ❓❓❓`);
  }
}else if (msgc.startsWith(prefix +'imdb')){
const unirest = require("unirest");

let  query = msgc.substr(6);
  let type = "";
  if(query.toLowerCase().indexOf("series ")==0 || query.toLowerCase().indexOf("episode ")==0 || query.toLowerCase().indexOf("movie ")==0) {
    type = `&type=${query.substring(0, query.indexOf(" ")).toLowerCase()}`;
    query = query.substring(query.indexOf(" ")+1);
  }
  if(query) {
    unirest.get(`http://www.omdbapi.com/?t=${encodeURIComponent(query)}&r=json${type}`).header("Accept", "application/json").end(res => {
      if(res.status==200 && res.body.Response=="True") {
        message.channel.sendMessage({
                  embed: {
          type: 'rich',
          description: '',
          fields: [{
            name: 'Results Imdb :film_frames:',
            value:  `[${res.body.Title}${type ? "" : (` (${res.body.Type.charAt(0).toUpperCase()}${res.body.Type.slice(1)})`)}](http://www.imdb.com/title/${res.body.imdbID}/)`,
            inline: false
          },{
            name: '** **',
            value:  `\`\`\`${res.body.Plot}\`\`\``,
            inline: false
          },{
            name: 'Year',
            value:  `${res.body.Year}`,
            inline: true
          },{
            name: 'Rated',
            value:  `${res.body.Rated}`,
            inline: true
          },{
            name: 'Runtime',
            value:  `${res.body.Runtime}`,
            inline: true
          },{
            name: 'Director',
            value:  `${res.body.Director}`,
            inline: true
          },{
            name: 'Writer',
            value:  `${res.body.Writer}`,
            inline: true
          },{
            name: 'Actors',
            value:  `${res.body.Actors}`,
            inline: true
          },{
            name: 'Genre(s)',
            value:  `${res.body.Genre}`,
            inline: false
          },{
            name: 'Rating',
            value:  `${res.body.imdbRating} out of ${res.body.imdbVotes} votes`,
            inline: true
          },{
            name: 'Awards',
            value:  `${res.body.Awards}`,
            inline: true
          },{
            name: 'Country',
            value:  `${res.body.Country}`,
            inline: true
          }],
          color: 3447003,
          footer: {
            text: 'by Alérian-Bot',
            proxy_icon_url: ' '
          },
           author: {
            name: message.author.username,
            icon_url: message.author.avatarURL,
            proxy_icon_url: ' '
          }
        }
        })
      } else {
        con(`No IMDB entries found for ` + msgc.substr(6));
        message.channel.sendMessage("Nothing found in IMDB 😶🚫");
      }
    });
  } else {
    message.channel.sendMessage(`U WOT M8... you need to use !imdb name film`);
  }
}else if (msgc == prefix +'dog'||msgc == prefix +'cat'){
const randomAnimal = require("random-animal");
if (msgc == prefix +'dog'){
      randomAnimal.dog().then(url => {
        message.channel.sendMessage({
            embed: {
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL,
                    url: "http://takohell.com:3000"
                },
                color: 0x00FF00,
                image: {
                    url: url
                }
            }
        });
    });

} else {
      randomAnimal.cat().then(url => {
        message.channel.sendMessage({
            embed: {
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL,
                    url: "http://takohell.com:3000"
                },
                color: 0x00FF00,
                image: {
                    url: url
                }
            }
        });
    });
}
}
});

app.get('/', function (req, res) {
    var obj = new Object();
    obj.test = "Test moi";
    obj.rep = "test réussi !";
    var json = JSON.stringify(obj);
    res.send(json);
});

app.get('/playlist', function (req, res) {
    var json = JSON.stringify(music.tab);
    res.send(json);

});

client.on('guildBanAdd', (guild, user) => {
    guild.defaultChannel.send("**" + user.tag + "** a été banni :open_mouth: ");
});
client.on('guildBanRemove', (guild, user) => {
    guild.defaultChannel.send("**" + user.tag + "** a été dé-banni :smile: ");
});
client.on('guildMemberAdd', function(member) {
var pixelUtil = require('pixel-util');
var Canvas = require('canvas')
  , canvas = new Canvas(300, 300)
  , ctx = canvas.getContext('2d')
  , fs = require('fs');
var image = new Canvas.Image;
var canvas;

ctx.font = 'normal 40px Helvetica'; // Choix de la police
ctx.fillText(member.user.tag, 30, 255);; // Remplissage de texte

pixelUtil.createBuffer(member.avatarURL).then(buffer => {
    image.src = buffer;
      ctx.drawImage(image, 0, 0, 300, 300);

var out = fs.createWriteStream(__dirname + '/dégradés.png')
  , stream = canvas.createPNGStream();

stream.on('data', function(chunk){
  out.write(chunk);
message.channel.sendFile("name", "dégrédés.png");
});
});


});
client.on('guildMemberRemove', member => {
    member.guild.defaultChannel.send(":frowning: " + member.user.tag + " a quitté le serveur...");

});
app.listen(3000);
client.login(token)