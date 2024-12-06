package com.cineclubs.app.services;

import com.cineclubs.app.dto.CategoryDTO;
import com.cineclubs.app.exceptions.ResourceNotFoundException;
import com.cineclubs.app.models.Category;
import com.cineclubs.app.repository.CategoryRepository;
import com.cineclubs.app.repository.ClubRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ClubRepository clubRepository;

    public CategoryService(final CategoryRepository categoryRepository, ClubRepository clubRepository) {
        this.categoryRepository = categoryRepository;
        this.clubRepository = clubRepository;
    }



    public CategoryDTO createCategory(Category category) {
        Category savedCategory = categoryRepository.save(category);
        return new CategoryDTO(savedCategory);
    }
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(CategoryDTO::new).toList();
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CLUB", id.toString()));
    }

}
