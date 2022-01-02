const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with the bot latency"),

	async execute(interaction) {
        interaction.channel.send("** **").then(async msg =>{
            interaction.reply("Pong! `" + (msg.createdTimestamp - interaction.createdTimestamp).toString() + "ms`")
            msg.delete()
        }) 
	}
}