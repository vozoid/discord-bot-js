const { SlashCommandBuilder, userMention } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("unban")	
		.setDescription("Unban a user from the guild.")
		.addStringOption(option => option.setName("user").setDescription("User that will be banned.").setRequired(true)),

	async execute(interaction) {
		if (!interaction.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) return

        try {
            if (isNaN(interaction.options.getString("user"))) {
                interaction.guild.bans.fetch().then(async bans => {
                    bans.forEach(async user => {
                        if (user.user.username + "#" + user.user.discriminator == interaction.options.getString("user")) {
                            interaction.guild.bans.remove(user.user.id.toString())
                            interaction.reply("`" + user.user.id + "` was unbanned")
                        }
                    })
                })
            } else {
                console.log("hi")
                interaction.guild.bans.remove(interaction.options.getString("user"))
                interaction.reply("`" + interaction.options.getString("user") + "` was unbanned")
            }
        } catch {
            interaction.reply({ content: "Error: couldn't unban user `" + interaction.options.getString("user") + "`", ephemeral: true })
        }
	}
}	