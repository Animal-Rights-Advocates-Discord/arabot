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

import devIDs from './devIDs';

// eslint-disable-next-line import/no-mutable-exports
let IDs = {
  roles: {
    trusted: '731563158011117590',
    nonvegan: {
      nonvegan: '774763753308815400',
      vegCurious: '832656046572961803',
      convinced: '797132019166871612',
    },
    vegan: {
      vegan: '788114978020392982',
      activist: '730915638746546257',
      plus: '798682625619132428',
    },
    restrictions: {
      sus: '859145930640457729',
      muted: '730924813681688596',
      restricted1: '809769217477050369',
      restricted2: '872482843304001566',
      restricted3: '856582673258774538',
      restricted4: '872472182888992858',
    },
    staff: {
      coordinator: '993636242019323904',
      devCoordinator: '966031741099855973',
      diversityCoordinator: '948284375827640321',
      mentorCoordinator: '947905630939807785',
      verifierCoordinator: '940721280376778822',
      eventCoordinator: '944732860554817586',
      restricted: '851624392928264222',
      moderator: '826157475815489598',
      trialModerator: '982074555596152904',
      verifier: '871802735031373856',
    },
    stageHost: '854893757593419786',
    patron: '765370219207852055',
    patreon: '993848684640997406',
    verifyingAsVegan: '854725899576279060',
  },
  channels: {
    information: {
      news: '866000393259319306',
    },
    staff: {
      coordinators: '1006240682505142354',
      standup: '996009201237233684',
    },
    nonVegan: {
      general: '798967615636504657',
    },
    diversity: {
      women: '938808963544285324',
      lgbtqia: '956224226556272670',
      potgm: '956224095509442600',
      disabilities: '933078769365823518',
    },
    activism: {
      twitter: '774477001741434920',
    }
  },
  categories: {
    diversity: '933078380394459146',
  },
};

require('dotenv').config();

// Check if the bot is in development mode
if (process.env.DEVELOPMENT === 'true') {
  IDs = devIDs;
}

export default IDs;
