const { SlashCommandBuilder, userMention } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mute")	
		.setDescription("Timeout a user for a certain amount of time.")
		.addUserOption(option => option.setName("user").setDescription("User that will be muted.").setRequired(true))
		.addIntegerOption(option => option.setName("seconds").setDescription("Seconds for the timeout.").setMinValue(1).setMaxValue(604800))
        .addIntegerOption(option => option.setName("minutes").setDescription("Minutes for the timeout.").setMinValue(1).setMaxValue(10080))
        .addIntegerOption(option => option.setName("hours").setDescription("Hours for the timeout.").setMinValue(1).setMaxValue(168))
        .addIntegerOption(option => option.setName("days").setDescription("Days for the timeout.").setMinValue(1).setMaxValue(7))
        .addStringOption(option => option.setName("reason").setDescription("Reason for the timeout.")),

	async execute(interaction) {
		if (!interaction.member.permissions.has([Permissions.FLAGS.MODERATE_MEMBERS])) return

		const user = interaction.options.getMember("user")

        function getTime() {
            let num = 0

            if (interaction.options.getInteger("seconds") != null) num = num + interaction.options.getInteger("seconds") * 1000
            if (interaction.options.getInteger("minutes") != null) num = num + interaction.options.getInteger("minutes") * 60000
            if (interaction.options.getInteger("hours") != null) num = num + interaction.options.getInteger("hours") * 3600000
            if (interaction.options.getInteger("days") != null) num = num + interaction.options.getInteger("days") * 86400000

            return Math.max(1, Math.min(num, 604800000))
        }
        
        try {
			if (interaction.options.getString("reason")) {
				if (!user.moderatable) throw("cant be moderated")
				user.timeout(getTime(), interaction.options.getString("reason"))
				interaction.reply("`" + (user.user.tag).toString() + "` was muted for `" + (getTime() / 1000).toString() + "` seconds for reason `" + interaction.options.getString("reason") + "`")
			} else {
				if (!user.moderatable) throw("cant be moderated")
				user.timeout(getTime())
				interaction.reply("`" + (user.user.tag).toString() + "` was muted for `" + (getTime() / 1000).toString() + "` seconds")
			} 
		} catch {
			interaction.reply({ content: "Error: couldn't time out user `" + user.user.tag + "`", ephemeral: true })
		}
	}
}	