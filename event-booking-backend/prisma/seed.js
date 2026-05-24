const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const bcrypt = require("bcryptjs");

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Check if database already has data — if so, skip seeding
  const existingUsers = await prisma.user.count();
  if (existingUsers > 0) {
    console.log("Database already has data. Skipping seed.");
    return;
  }

  console.log("Database is empty. Seeding sample data...");

  const hashedPassword = await bcrypt.hash("123456", 10);

  const organiser1 = await prisma.user.create({
    data: {
      name: "Organiser One",
      email: "organiser1@example.com",
      password: hashedPassword,
      role: "ORGANISER",
    },
  });

  const organiser2 = await prisma.user.create({
    data: {
      name: "Organiser Two",
      email: "organiser2@example.com",
      password: hashedPassword,
      role: "ORGANISER",
    },
  });

  const attendee1 = await prisma.user.create({
    data: {
      name: "Attendee One",
      email: "attendee1@example.com",
      password: hashedPassword,
      role: "ATTENDEE",
    },
  });

  const attendee2 = await prisma.user.create({
    data: {
      name: "Attendee Two",
      email: "attendee2@example.com",
      password: hashedPassword,
      role: "ATTENDEE",
    },
  });

  const attendee3 = await prisma.user.create({
    data: {
      name: "Attendee Three",
      email: "attendee3@example.com",
      password: hashedPassword,
      role: "ATTENDEE",
    },
  });

  const event1 = await prisma.event.create({
    data: {
      title: "Node.js Workshop",
      description: "Learn backend development with Node.js and Express.",
      dateTime: new Date("2026-07-15T14:00:00.000Z"),
      capacity: 3,
      organiserId: organiser1.id,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: "Prisma Bootcamp",
      description: "Introduction to Prisma ORM and relational modelling.",
      dateTime: new Date("2026-07-20T10:00:00.000Z"),
      capacity: 5,
      organiserId: organiser1.id,
    },
  });

  const event3 = await prisma.event.create({
    data: {
      title: "JWT Security Seminar",
      description: "Understanding authentication and authorization.",
      dateTime: new Date("2026-07-25T16:30:00.000Z"),
      capacity: 4,
      organiserId: organiser2.id,
    },
  });

  await prisma.booking.create({
    data: {
      userId: attendee1.id,
      eventId: event1.id,
    },
  });

  await prisma.booking.create({
    data: {
      userId: attendee2.id,
      eventId: event1.id,
    },
  });

  await prisma.booking.create({
    data: {
      userId: attendee3.id,
      eventId: event3.id,
    },
  });

  console.log("Seed completed successfully.");
  console.log("Test organiser login: organiser1@example.com / 123456");
  console.log("Test attendee login:   attendee1@example.com / 123456");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });