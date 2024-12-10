package com.tuniclubs.app.cli;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Profile;
import com.tuniclubs.app.seeder.DatabaseSeeder;
import lombok.RequiredArgsConstructor;

@Component
@Profile("!prod")
@RequiredArgsConstructor
public class DatabaseSeederCommand implements CommandLineRunner {
    private final DatabaseSeeder databaseSeeder;

    @Override
    public void run(String... args) {
        if (args.length == 0)
            return;

        switch (args[0]) {
            case "--seed":
                handleSeed(args);
                break;
            case "--help":
                printHelp();
                break;
        }
    }

    private void handleSeed(String... args) {
        boolean force = Arrays.asList(args).contains("--force");
        try {
            System.out.println("Starting database seeding...");
            databaseSeeder.seed(force);
            System.out.println("Database seeding completed successfully!");
        } catch (Exception e) {
            System.err.println("Error seeding database: " + e.getMessage());
            System.exit(1);
        }
        System.exit(0);
    }

    private void printHelp() {
        System.out.println("Available commands:");
        System.out.println("  --seed        Seed the database");
        System.out.println("  --seed --force Force reseed even if database is not empty");
        System.out.println("  --help        Show this help message");
    }
}