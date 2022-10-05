// SPDX-License-Identifier: GPL-3.0-or-later
/*
    Animal Rights Advocates Discord Bot
    Copyright (C) 2022  Anthony Berg

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

    import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks';
    import { container } from '@sapphire/framework';
    import type { TextChannel } from 'discord.js';
    import IDs from '../utils/ids';
    
    export class TweetTask extends ScheduledTask {
        // add twitter ids here in the format of "twitter handle": "twitter id"
        // in order to scrape the last hours of tweets from someone
        // and post them to the twitter channel
      twitterIds = {
        '5m5v_en': '1160265980947443721', // 5-minutes-5-vegans
      }
      public constructor(context: ScheduledTask.Context, options: ScheduledTask.Options) {
        super(context, {
          ...options,
          interval: 3_600_000,
        });
        
    }
    
      public async run() {
        const { client } = container;
    
        const channel = client.channels.cache.get(IDs.channels.activism.twitter) as TextChannel;
        const startTime = new Date(Date.now() - 3_600_000).toISOString();

        for (const id in this.twitterIds) {
            // @ts-ignore
            const tweets = await (await fetch(`https://api.twitter.com/2/users/${this.twitterIds[id]}/tweets?start_time=${startTime}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.TWITTER_API}`,
                },
            })).json();
            for (let tweet of tweets.data) {
                await channel.send(`https://fxtwitter.com/${id}/status/${tweet.id}`);
            }    
        };

      }
    }
    
    declare module '@sapphire/plugin-scheduled-tasks' {
      interface ScheduledTasks {
        interval: never;
      }
    }
    