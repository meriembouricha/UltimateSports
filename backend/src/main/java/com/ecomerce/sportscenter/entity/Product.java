package com.ecomerce.sportscenter.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Product")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Id")
    private Integer id;
    @Column(name="Name")
    private String name;
    @Column(name="Description", columnDefinition = "TEXT")
    private String description;
    @Column(name="Price")
    private Long price;
    @Column(name="PictureUrl")
    private String pictureUrl;

    @Column(name="Qunatity", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer qunatity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="ProductBrandId", referencedColumnName = "Id")
    @JsonIgnore
    private Brand brand;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name="ProductTypeId", referencedColumnName = "Id")
    private Type type;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<ProductVariant> variants = new ArrayList<>();

}