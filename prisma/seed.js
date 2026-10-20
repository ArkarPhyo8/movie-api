import { prisma } from "../src/config/db";
async function main() {
    console.log("Seeding database...");
    let testUser = await prisma.user.findFirst({
        where: { email: "ethan@gmail.com" },
    });
    if (!testUser) {
        testUser = await prisma.user.create({
            data: {
                name: "Ethan",
                email: "ethan@gmail.com",
                password: "ethan123",
            },
        });
        console.log(`Created test user with id: ${testUser.id}`);
    }
    else {
        console.log(`Using existing user with id: ${testUser.id}`);
    }
    const moviesData = [
        {
            title: "Inception",
            overview: "A thief who steals corporate secrets through the use of dream-sharing technology.",
            releaseYear: 2010,
            genres: ["Action", "Sci-Fi", "Thriller"],
            runtime: 148,
            posterUrl: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
            createdBy: testUser.id,
        },
        {
            title: "Interstellar",
            overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            releaseYear: 2014,
            genres: ["Adventure", "Drama", "Sci-Fi"],
            runtime: 169,
            posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            createdBy: testUser.id,
        },
        {
            title: "The Dark Knight",
            overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
            releaseYear: 2008,
            genres: ["Action", "Crime", "Drama"],
            runtime: 152,
            posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            createdBy: testUser.id,
        },
        {
            title: "Avatar",
            overview: "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
            releaseYear: 2009,
            genres: ["Action", "Adventure", "Fantasy"],
            runtime: 162,
            posterUrl: "https://image.tmdb.org/t/p/w500/kyeOwRvylWRn48AIQKXwOzXpL1.jpg",
            createdBy: testUser.id,
        },
        {
            title: "The Matrix",
            overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
            releaseYear: 1999,
            genres: ["Action", "Sci-Fi"],
            runtime: 136,
            posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
            createdBy: testUser.id,
        },
        {
            title: "Avengers: Endgame",
            overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.",
            releaseYear: 2019,
            genres: ["Action", "Adventure", "Sci-Fi"],
            runtime: 181,
            posterUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
            createdBy: testUser.id,
        },
        {
            title: "Parasite",
            overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
            releaseYear: 2019,
            genres: ["Comedy", "Drama", "Thriller"],
            runtime: 132,
            posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
            createdBy: testUser.id,
        },
        {
            title: "Spider-Man: Into the Spider-Verse",
            overview: "Teenager Miles Morales becomes the Spider-Man of his universe, and must cross paths with five counterpart dimensions to stop a threat for all realities.",
            releaseYear: 2018,
            genres: ["Animation", "Action", "Adventure", "Sci-Fi"],
            runtime: 117,
            posterUrl: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
            createdBy: testUser.id,
        },
        {
            title: "Gladiator",
            overview: "A former Roman general sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
            releaseYear: 2000,
            genres: ["Action", "Adventure", "Drama"],
            runtime: 155,
            posterUrl: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
            createdBy: testUser.id,
        },
        {
            title: "The Lord of the Rings: The Fellowship of the Ring",
            overview: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
            releaseYear: 2001,
            genres: ["Adventure", "Fantasy", "Drama"],
            runtime: 178,
            posterUrl: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
            createdBy: testUser.id,
        },
    ];
    console.log("Inserting movies...");
    for (const movie of moviesData) {
        await prisma.movie.create({ data: movie });
        console.log(`Create movie: ${movie.title}`);
    }
    console.log("Seeding completed successfully! 🎬");
}
main()
    .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map