const { SlashCommandBuilder, userMention } = require("@discordjs/builders")
const { MessageAttachment } = require("discord.js")
const Canvas = require("canvas")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("avatar")	
		.setDescription("Fetch a user's avatar.")
		.addUserOption(option => option.setName("user").setDescription("User to fetch avatar from.").setRequired(true)),

	async execute(interaction) {
		const user = interaction.options.getUser("user")
        
        try {
			const canvas = Canvas.createCanvas(300, 300)
			const context = canvas.getContext('2d')

			var avatarURL = user.displayAvatarURL({ dynamic: true })
			avatarURL = avatarURL.replace("webp", "png")
			const avatar = await Canvas.loadImage(avatarURL)

			context.drawImage(avatar, 0, 0, 300, 300)	

			const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png')

			interaction.reply({ content: "Avatar of `" + user.tag + "`", files: [attachment] })
		} catch {
			interaction.reply({ content: "Error: couldn't get avatar of user `" + user.tag + "`", ephemeral: true })
		}
	}
}	