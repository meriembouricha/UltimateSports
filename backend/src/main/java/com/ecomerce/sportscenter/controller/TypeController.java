package com.ecomerce.sportscenter.controller;

import com.ecomerce.sportscenter.model.TypeResponse;
import com.ecomerce.sportscenter.service.TypeService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/types")
public class TypeController {

    private final TypeService typeService;

    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @GetMapping
    public List<TypeResponse> getAllTypes() {
        return typeService.getAllTypes();
    }
}
    