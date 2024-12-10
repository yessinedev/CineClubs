package com.tuniclubs.app.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "seeder")
public class DataSeederConfig {
    private int userCount = 10;
    private int categoryCount = 8;
    private int clubCount = 5;
    private int postCount = 20;
    private boolean enabled = true;
}