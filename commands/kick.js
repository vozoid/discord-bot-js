const { SlashCommandBuilder, userMention } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kick")	
		.setDescription("Kick a user from the guild.")
		.addUserOption(option => option.setName("user").setDescription("User that will be kicked.").setRequired(true))
		.addStringOption(option => option.setName("reason").setDescription("Reason for the kick.")),

	async execute(interaction) {
		if (!interaction.member.permissions.has([Permissions.FLAGS.KICK_MEMBERS])) return

		const user = interaction.options.getMember("user")

		try {
			if (interaction.options.getString("reason")) {
				if (!user.kickable) throw("cant be kicked")
				user.kick(interaction.options.getString("reason"))
				interaction.reply("`" + (user.user.tag).toString() + "` was kicked for reason `" + interaction.options.getString("reason") + "`")
			} else {
				if (!user.kickable) throw("cant be kicked")
				user.kick()
				interaction.reply("`" + (user.user.tag).toString() + "` was kicked")
			}
		} catch {
			interaction.reply({ content: "Error: couldn't kick user `" + user.user.tag + "`", ephemeral: true })
		}
	}
}	