import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.playlist.deleteMany();
    await prisma.review.deleteMany();
    await prisma.song.deleteMany();
    await prisma.user.deleteMany();

    const Despacito = await prisma.song.create({
        data: {
            title: 'Despacito',
            artist: 'Luis Fonsi',
            duration: 4.5,
        },
    });

    const LaCintura = await prisma.song.create({
        data: {
            title: 'La Cintura',
            artist: 'Alvaro Soler',
            duration: 3.5,
        },
    });

    const LetItSnow = await prisma.song.create({
        data: {
            title: 'Let it Snow',
            artist: 'Dean Martin',
            duration: 2.5,
        },
    });

    const JingleBells = await prisma.song.create({
        data: {
            title: 'Jingle Bells',
            artist: 'Frank Sinatra',
            duration: 3.0,
        },
    });

    const summerPlaylist = await prisma.playlist.create({
        data: {
            name: 'Summer Hits',
            description: 'The best songs for your summer holiday',
            songs: {
                connect: [Despacito, LaCintura],
            },
            user: {
                create: {
                    name: 'Alice',
                    email: 'alice@gmail.com',
                    password: await bcrypt.hash('alice123',12),
                    role: 'ADMIN',
                },
            },
        },
    });

    const winterPlaylist = await prisma.playlist.create({
        data: {
            name: 'Winter Hits',
            description: 'The best songs for the cold winter days',
            songs: {
                connect: [LetItSnow, JingleBells],
            },
            user: {
                create: {
                    name: 'Bob',
                    email: 'bob@gmail.com',
                    password: await bcrypt.hash('bob123',12),
                    role: 'USER',
                },
            },
        },
    });

    const DespacitoReview = await prisma.review.create({
        data: {
            rating: 5,
            content: 'I love this song!',
            song: {
                connect: {
                    id: Despacito.id,
                },
            },
        },
    });

    const LaCinturaReview = await prisma.review.create({
        data: {
            rating: 4,
            content: 'Great song!',
            song: {
                connect: {
                    id: LaCintura.id,
                },
            },
        },
    });

    const LetItSnowReview = await prisma.review.create({
        data: {
            rating: 3,
            content: 'Nice song!',
            song: {
                connect: {
                    id: LetItSnow.id,
                },
            },
        },
    });

    const JingleBellsReview = await prisma.review.create({
        data: {
            rating: 4,
            content: 'Great song!',
            song: {
                connect: {
                    id: JingleBells.id,
                },
            },
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();