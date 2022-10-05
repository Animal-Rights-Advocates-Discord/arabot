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

const devIDs = {
  roles: {
    trusted: '999431675081666599',
    nonvegan: {
      nonvegan: '999431675081666598',
      vegCurious: '999431675098447932',
      convinced: '999431675098447933',
    },
    vegan: {
      vegan: '999431675098447937',
      activist: '999431675098447934',
      plus: '999431675010359460',
    },
    restrictions: {
      sus: '999431674997788673',
      muted: '999431675123597402',
      restricted1: '999431674997788677',
      restricted2: '999431674997788676',
      restricted3: '999431674997788675',
      restricted4: '999431674997788674',
    },
    staff: {
      coordinator: '999431675165556822',
      devCoordinator: '999431675165556818',
      diversityCoordinator: '999431675140382808',
      mentorCoordinator: '999431675140382809',
      verifierCoordinator: '999431675140382810',
      eventCoordinator: '999431675165556817',
      restricted: '999431675123597407',
      moderator: '999431675123597408',
      trialModerator: '999431675123597404',
      verifier: '999431675123597406',
      trialVerifier: '999431675123597405',
    },
    stageHost: '999431675123597411',
    patron: '999431675098447935',
    patreon: '999431675098447936',
    verifyingAsVegan: '999431675081666597',
    verifyBlock: '1007477161835372574',
  },
  channels: {
    information: {
      news: '999431676058927247',
    },
    staff: {
      coordinators: '999431676058927254',
      standup: '999431676289622183',
      verifiers: '999431677006860411',
    },
    nonVegan: {
      general: '999431677325615189',
    },
    diversity: {
      women: '999431679053660187',
      lgbtqia: '999431679053660188',
      potgm: '999431679053660189',
      disabilities: '999431679527628810',
    },
    activism: {
      twitter: '999431678214807608',
    }
  },
  categories: {
    verification: '999431677006860409',
    diversity: '999431679053660185',
  },
};

export default devIDs;
