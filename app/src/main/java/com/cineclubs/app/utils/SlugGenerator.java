package com.cineclubs.app.utils;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.UUID;

public class SlugGenerator {
    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public static String toSlug(String input) {
        if (input == null) {
            return "";
        }

        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

    public static String generateUniqueSlug(String name) {
        String baseSlug = toSlug(name);
        String uniqueSuffix = UUID.randomUUID().toString().substring(0, 6);
        return baseSlug + "-" + uniqueSuffix;
    }
}