// SPDX-License-Identifier: GPL-3.0-or-later
/*
    Animal Rights Advocates Discord Bot
    Copyright (C) 2023  Anthony Berg

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { Args, Command, RegisterBehavior } from '@sapphire/framework';
import { User, Guild, Message, MessageFlagsBitField } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { getRank, xpToNextLevel } from '#utils/database/fun/xp';
import { getGuildMember } from '#utils/fetcher';
import { isGuildMember } from '@sapphire/discord.js-utilities';

export class RankCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: 'rank',
      description: 'Gets your current rank on this server',
    });
  }

  // Registers that this is a slash command
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .addUserOption((option) =>
            option.setName('user').setDescription('User to show rank for'),
          ),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
      },
    );
  }

  // Command run
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    let user = interaction.options.getUser('user');
    const { guild } = interaction;

    if (guild === null) {
      await interaction.reply({
        content: 'Could not find the guild!',
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    if (user === null) {
      user = interaction.user;
    }

    await interaction.deferReply();

    const info = await this.rank(user, guild);

    await interaction.editReply({
      content: info.message,
      embeds: info.embeds,
    });
  }

  public async messageRun(message: Message, args: Args) {
    let user: User;
    try {
      user = await args.pick('user');
    } catch {
      user = message.author;
    }

    const { guild } = message;

    if (guild === null) {
      await message.react('❌');
      await message.reply('Could not find the guild!');
      return;
    }

    const info = await this.rank(user, guild);

    await message.reply({
      content: info.message,
      embeds: info.embeds,
    });
    if (!info.success) {
      await message.react('❌');
    }
  }

  private async rank(user: User, guild: Guild) {
    const info = {
      message: '',
      embeds: [] as EmbedBuilder[],
      success: false,
    };

    const member = await getGuildMember(user.id, guild);

    if (!isGuildMember(member)) {
      info.message = 'The user is not on this server!';
      return info;
    }

    const rank = await getRank(user.id);

    const xpNextLevel = xpToNextLevel(rank.level, 0);

    const embed = new EmbedBuilder()
      .setColor('#00ff7d')
      .setAuthor({
        name: `${member.displayName}'s Rank`,
        iconURL: `${user.displayAvatarURL()}`,
      })
      .addFields(
        { name: 'Rank', value: `${rank.rank}` },
        {
          name: 'Level',
          value: `${rank.level} (${rank.xpNextLevel}/${xpNextLevel} XP)`,
          inline: true,
        },
        { name: 'Total XP', value: `${rank.xp}`, inline: true },
        { name: 'Total messages', value: `${rank.messages}` },
      );

    info.success = true;
    info.embeds.push(embed);
    return info;
  }
}
