package com.url.shortener.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.url.shortener.models.ClickEvent;
import com.url.shortener.models.UrlMapping;

public interface ClickEventRepository extends JpaRepository<ClickEvent,Long>{
    List<ClickEvent> findByUrlMappingAndClickDateBetween(UrlMapping mapping, LocalDateTime start, LocalDateTime end);
    List<ClickEvent> findByUrlMappingInAndClickDateBetween(List<UrlMapping> mapping, LocalDateTime start, LocalDateTime end);

}
