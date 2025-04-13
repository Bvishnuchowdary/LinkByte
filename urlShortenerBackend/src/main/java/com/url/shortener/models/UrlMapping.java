package com.url.shortener.models;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class UrlMapping {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String originalUrl;
    private String shortUrl;
    private int clickCount = 0;
    private LocalDateTime createdDate;

    //now we must link it with the other tables many to one mapping with users table and one to many mapping with click events table

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // @OneToMany(mappedBy = "urlMapping")
    @OneToMany
    @JoinColumn(name="url_mapping_id")
    private List<ClickEvent> clickEvents;
}
