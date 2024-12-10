package com.tuniclubs.app.repository;

import com.tuniclubs.app.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
