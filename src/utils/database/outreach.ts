import { container } from '@sapphire/framework';
import type { Snowflake } from 'discord.js';

// Events
export async function createEvent(
  modId: Snowflake,
) {
  // Add the user to the database
  const event = await container.database.event.create({
    data: {
      leader: {
        connect: {
          id: modId,
        },
      },
      type: {
        connect: {
          type: 'Discord Outreach',
        },
      },
    },
  });

  return event.id;
}

export async function checkActiveEvent() {
  const event = await container.database.event.findFirst({
    where: {
      endTime: null,
    },
  });

  return event !== null;
}

export async function getCurrentEvent() {
  const event = await container.database.event.findFirst({
    where: {
      endTime: null,
    },
  });

  return event;
}

// Stats
export async function addStatUser(statId: number, userId: Snowflake) {
  await container.database.participantStat.create({
    data: {
      stat: {
        connect: {
          id: statId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export async function createStat(eventId: number, leaderId: Snowflake, roleId: Snowflake) {
  await container.database.stat.create({
    data: {
      event: {
        connect: {
          id: eventId,
        },
      },
      leader: {
        connect: {
          id: leaderId,
        },
      },
      participants: {
        create: {
          user: {
            connect: {
              id: leaderId,
            },
          },
        },
      },
      role: {
        create: {
          roleId,
        },
      },
    },
  });
}

export async function getStatGroups(eventId: number) {
  const stats = await container.database.stat.findMany({
    where: {
      eventId,
    },
    orderBy: {
      id: 'asc',
    },
  });

  return stats;
}

export async function getStatFromRole(roleId: Snowflake) {
  const group = await container.database.statRole.findFirst({
    where: {
      roleId,
    },
    include: { stat: true },
  });

  return group;
}

export async function getStatFromLeader(leaderId: Snowflake) {
  const event = await getCurrentEvent();

  if (event === null) {
    return null;
  }

  const group = await container.database.stat.findFirst({
    where: {
      leaderId,
      eventId: event.id,
    },
    include: { role: true },
  });

  return group;
}

export async function userInStats(statId: number, userId: Snowflake) {
  const stat = await container.database.participantStat.findUnique({
    where: {
      statId_userId: {
        statId,
        userId,
      },
    },
  });

  return stat !== null;
}

// Misc
export async function countTypes() {
  const count = await container.database.eventType.count();
  return count;
}

export async function createTypes() {
  await container.database.eventType.create({
    data: {
      type: 'Discord Outreach',
    },
  });
}

export async function setupTypes() {
  const types = [
    'Discord Outreach',
  ];

  if (types.length === await countTypes()) {
    return;
  }

  await createTypes();
}
