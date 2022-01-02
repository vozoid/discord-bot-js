const { SlashCommandBuilder, userMention } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("unmute")	
		.setDescription("Remove a timeout from a user.")
		.addUserOption(option => option.setName("user").setDescription("User that will be unmuted.").setRequired(true)),

	async execute(interaction) {
		if (!interaction.member.permissions.has([Permissions.FLAGS.MODERATE_MEMBERS])) return

		const user = interaction.options.getMember("user")
        
        try {
            if (!user.moderatable) throw("cant be moderated")
            user.timeout(null)
            interaction.reply("`" + (user.user.tag).toString() + "` was unmuted")
		} catch {
			interaction.reply({ content: "Error: couldn't remove timeout from user `" + user.user.tag + "`", ephemeral: true })
		}
	}
}	