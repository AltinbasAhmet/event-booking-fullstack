const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  await prisma.booking.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

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
      dateTime: new Date("2026-04-15T14:00:00.000Z"),
      capacity: 3,
      organiserId: organiser1.id,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: "Prisma Bootcamp",
      description: "Introduction to Prisma ORM and relational modelling.",
      dateTime: new Date("2026-04-20T10:00:00.000Z"),
      capacity: 5,
      organiserId: organiser1.id,
    },
  });

  const event3 = await prisma.event.create({
    data: {
      title: "JWT Security Seminar",
      description: "Understanding authentication and authorization.",
      dateTime: new Date("2026-04-25T16:30:00.000Z"),
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

  console.log("Seed completed successfully");
  console.log("Test organiser login: organiser1@example.com / 123456");
  console.log("Test attendee login: attendee1@example.com / 123456");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });