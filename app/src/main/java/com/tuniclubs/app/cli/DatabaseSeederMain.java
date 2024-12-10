package com.tuniclubs.app.cli;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.tuniclubs.app")
@EntityScan("com.tuniclubs.app.models")
@EnableJpaRepositories("com.tuniclubs.app.repository")
public class DatabaseSeederMain {
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(DatabaseSeederMain.class);
        app.setWebApplicationType(WebApplicationType.NONE);
        app.run(args);
    }
}