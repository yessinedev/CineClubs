package com.cineclubs.app.seeder;

import com.cineclubs.app.enums.ClubRole;
import com.cineclubs.app.enums.MemberStatus;
import com.cineclubs.app.utils.SlugGenerator;
import com.github.javafaker.Faker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.cineclubs.app.config.DataSeederConfig;
import com.cineclubs.app.models.*;
import com.cineclubs.app.repository.*;

import java.time.LocalDateTime;
import java.util.*;

@Component
@Profile("!prod")
public class DatabaseSeeder {
    private static final Logger logger = LoggerFactory.getLogger(DatabaseSeeder.class);

    private final UserRepository userRepository;
    private final ClubRepository clubRepository;
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final DataSeederConfig seederConfig;
    private final Faker faker;

    private static final String[] PROFILE_IMAGES = {
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    };

    private static final String[] CLUB_COVER_IMAGES = {
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
            "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
            "https://images.unsplash.com/photo-1440404653325-ab127d49abc1",
            "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
            "https://images.unsplash.com/photo-1478720568477-152d9b164e26"
    };

    public DatabaseSeeder(
            UserRepository userRepository,
            ClubRepository clubRepository,
            PostRepository postRepository,
            CategoryRepository categoryRepository,
            DataSeederConfig seederConfig) {
        this.userRepository = userRepository;
        this.clubRepository = clubRepository;
        this.postRepository = postRepository;
        this.categoryRepository = categoryRepository;
        this.seederConfig = seederConfig;
        this.faker = new Faker();
    }

    @Transactional
    public void seed(boolean force) {
        if (!force && isDatabaseSeeded()) {
            logger.warn("Database is already seeded. Use --force to reseed.");
            return;
        }

        logger.info("Starting database seeding...");
        try {
            List<User> users = seedUsers();
            List<Category> categories = seedCategories();
            List<Club> clubs = seedClubs(users, categories);
            seedPosts(users, clubs);

            logger.info("Database seeding completed successfully!");
        } catch (Exception e) {
            logger.error("Error seeding database: {}", e.getMessage(), e);
            throw new RuntimeException("Database seeding failed", e);
        }
    }

    private boolean isDatabaseSeeded() {
        return userRepository.count() > 0;
    }

    @Transactional
    protected List<User> seedUsers() {
        logger.info("Seeding {} users...", seederConfig.getUserCount());
        List<User> users = createUsers(seederConfig.getUserCount());
        return userRepository.saveAll(users);
    }
    @Transactional
    protected List<Category> seedCategories() {
        logger.info("Seeding {} categories...", seederConfig.getCategoryCount());
        List<Category> categories = createCategories(seederConfig.getCategoryCount());
        return categoryRepository.saveAll(categories);

    }

    @Transactional
    protected List<Club> seedClubs(List<User> users, List<Category> categories) {
        logger.info("Seeding {} clubs...", seederConfig.getClubCount());
        List<Club> clubs = createClubs(seederConfig.getClubCount(), users, categories);
        return clubRepository.saveAll(clubs);
    }

    @Transactional
    protected List<Post> seedPosts(List<User> users, List<Club> clubs) {
        logger.info("Seeding {} posts...", seederConfig.getPostCount());
        List<Post> posts = createPosts(seederConfig.getPostCount(), users, clubs);
        return postRepository.saveAll(posts);
    }

    private List<User> createUsers(int count) {
        List<User> users = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            User user = new User();
            user.setUserId(UUID.randomUUID().toString());
            user.setEmail(faker.internet().emailAddress());
            user.setFirstName(faker.name().firstName());
            user.setLastName(faker.name().lastName());
            user.setImageUrl(PROFILE_IMAGES[i % PROFILE_IMAGES.length] + "?w=150&h=150&fit=crop");
            user.setUsername(faker.name().username());
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            users.add(user);
        }
        return users;
    }

    private List<Category> createCategories(int count) {
        List<Category> categories = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            Category category = new Category();
            category.setName(faker.gameOfThrones().house());
            category.setCreatedAt(LocalDateTime.now());
            category.setUpdatedAt(LocalDateTime.now());
            categories.add(category);
        }
        return categories;
    }

    private List<Club> createClubs(int count, List<User> users, List<Category> categories) {
        List<Club> clubs = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            Club club = new Club();
            club.setName(generateClubName());
            club.setDescription(generateClubDescription());
            club.setSlug(SlugGenerator.generateUniqueSlug(club.getName()));
            club.setPublic(true);
            club.setImageUrl(CLUB_COVER_IMAGES[i % CLUB_COVER_IMAGES.length] + "?w=1200&h=630&fit=crop");
            club.setUser(users.get(faker.random().nextInt(users.size())));
            club.setCategory(categories.get(faker.random().nextInt(categories.size())));

            // Creating ClubMember instances instead of setting the members directly
            Set<ClubMember> clubMembers = new HashSet<>();
            ClubMember owner = new ClubMember();
            owner.setClub(club);
            owner.setUser(club.getUser());
            owner.setStatus(MemberStatus.APPROVED);
            owner.setRole(ClubRole.ADMIN);
            clubMembers.add(owner);
            int memberCount = faker.random().nextInt(2, users.size());  // Adjust number of members
            for (int j = 1; j < memberCount; j++) {
                User memberUser = users.get(faker.random().nextInt(users.size()));
                ClubMember clubMember = new ClubMember();
                clubMember.setClub(club);
                clubMember.setUser(memberUser);
                clubMember.setStatus(MemberStatus.PENDING);  // You can adjust the status or role as needed
                clubMember.setRole(ClubRole.MEMBER);  // Or set different roles if needed
                clubMembers.add(clubMember);
            }

            club.setMembers(clubMembers);  // Setting the ClubMembers for the club
            clubs.add(club);
        }
        return clubs;
    }


    private List<Post> createPosts(int count, List<User> users, List<Club> clubs) {
        List<Post> posts = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            Post post = new Post();
            post.setTitle(faker.book().title());
            post.setContent(faker.lorem().paragraph());
            post.setCreatedAt(LocalDateTime.now());
            post.setAuthor(users.get(faker.random().nextInt(users.size())));
            post.setClub(clubs.get(faker.random().nextInt(clubs.size())));
            post.setLikes(new HashSet<>(users.subList(0, faker.random().nextInt(users.size()))));
            posts.add(post);
        }
        return posts;
    }

    private String generateClubName() {
        String[] prefixes = {
                "JavaScript",
                "Pythonic",
                "Ruby",
                "React",
                "Angular",
                "Spring Boot",
                "Node.js",
                "Flutter",
                "Django",
                "Kubernetes"
        };


        String[] suffixes = {
                "Developers Club",
                "Hackers Collective",
                "Programming Wizards",
                "Tech Innovators",
                "Framework Enthusiasts",
                "Backend Pioneers",
                "Frontend Builders",
                "Cloud Architects",
                "AI Thinkers",
                "Code Innovators"
        };


        return prefixes[faker.random().nextInt(prefixes.length)] + " " +
                suffixes[faker.random().nextInt(suffixes.length)];
    }

    private String generateClubDescription() {
        String[] templates = {
                "A community dedicated to exploring the world of %s and fostering meaningful discussions about technology.",
                "Join us in celebrating the art of %s development through meetups, projects, and events.",
                "A gathering place for enthusiasts of %s to share their knowledge, passion, and insights.",
                "Discover and discuss the best practices of %s with like-minded tech enthusiasts.",
                "A vibrant community for fans of %s to connect, collaborate, and innovate."
        };

        String[] genres = { "classic", "contemporary", "independent", "international", "avant-garde" };

        String template = templates[faker.random().nextInt(templates.length)];
        String[] genre = { "frontend", "backend", "fullstack", "AI/ML", "cybersecurity", "game development", "web development", "mobile development", "cloud computing", "open source" };


        return String.format(template, (Object) genre);
    }
}
