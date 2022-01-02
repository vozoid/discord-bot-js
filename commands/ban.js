const { SlashCommandBuilder, userMention } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ban")	
		.setDescription("Ban a user from the guild.")
		.addUserOption(option => option.setName("user").setDescription("User that will be banned.").setRequired(true))
		.addStringOption(option => option.setName("reason").setDescription("Reason for the ban.")),

	async execute(interaction) {
		if (!interaction.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) return

		const user = interaction.options.getMember("user")

		try {
			if (interaction.options.getString("reason")) {
				if (!user.bannable) throw("cant be banned")
				user.ban(interaction.options.getString("reason"))
				interaction.reply("`" + (user.user.tag).toString() + "` was banned for reason `" + interaction.options.getString("reason") + "`")
			} else {
				if (!user.bannable) throw("cant be banned")
				user.ban()
				interaction.reply("`" + (user.user.tag).toString() + "` was banned")
			} 
		} catch {
			interaction.reply({ content: "Error: couldn't ban user `" + user.user.tag + "`", ephemeral: true })
		}
	}
}	