const { SlashCommandBuilder, userMention } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("nickname")	
		.setDescription("Nickname a user.")
		.addUserOption(option => option.setName("user").setDescription("User that will be nicknamed.").setRequired(true))
        .addStringOption(option => option.setName("nickname").setDescription("The new nickname of the user. (leave blank for unnick)")),

	async execute(interaction) {
		if (!interaction.member.permissions.has([Permissions.FLAGS.MODERATE_MEMBERS])) return

		const user = interaction.options.getMember("user")
        
        try {
            if (!user.manageable) throw("cant be nicknamed")
            user.setNickname(interaction.options.getString("nickname"))
            interaction.reply("Changed nickname of `" + (user.user.tag).toString() + "`")
		} catch {
			interaction.reply({ content: "Error: couldn't nickname user `" + user.user.tag + "`", ephemeral: true })
		}
	}
}	