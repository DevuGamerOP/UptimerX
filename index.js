const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <html>
      <head>
        <title>Your Web View</title>
      </head>
      <body style="margin: 0; padding: 0;">
        <iframe width="100%" height="100%" src="https://scriptsquad.vercel.app/" frameborder="0" allowfullscreen></iframe>
      </body>
    </html>`);
});

server.listen(3000, () => {
  console.log('Server Online because of z7yu.zip ✅!!');
});

const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const set = require(`${process.cwd()}/Assets/Config/settings`);
require(`colors`)
const client = new Client({
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});


[`variables`, `extraEvents`, `checker`, `mongo_db`, `server`, 'slashCommand', 'events', `antiCrash`].forEach((handler) => {
  const file = require(`./src/handlers/${handler}`)
  if (file.execute) file.execute(client);
  else file(client);
});

client.login(process.env.TOKEN).catch((error) => { console.log((error.message).bold.red) });


module.exports = client;

// auto kill 
setInterval(() => {
  if (set.REPL_SETTINGS.AUTO_KILL && set.REPL_USER) {
    if (!client) {
      client.logger("Rate limit assumed, restarting")
      process.kill(1)
    }
  }
}, 5000)
