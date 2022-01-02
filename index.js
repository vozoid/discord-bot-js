const fs = require("fs");
const { Client , Collection , Intents } = require("discord.js")
const { BOT_TOKEN } = require("./config.json")

const client = new Client({intents: [Intents.FLAGS.GUILDS]})

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.data.name, command)
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})
  
client.on("interactionCreate", async interaction => {
	if (!interaction.isCommand()) return

	const command = client.commands.get(interaction.commandName)

	if (!command) return

	try {

		await command.execute(interaction)

	} catch (error) {

		console.error(error);
		await interaction.reply({ content: "error", ephemeral: true })

	}
})

client.on("interactionCreate", interaction => {
	if (!interaction.isButton()) return
	console.log(interaction)
})


  
client.login(BOT_TOKEN)