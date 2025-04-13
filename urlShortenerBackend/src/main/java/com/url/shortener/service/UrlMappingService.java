package com.url.shortener.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.url.shortener.dtos.ClickEventDTO;
import com.url.shortener.dtos.UrlMappingDTO;
import com.url.shortener.models.ClickEvent;
import com.url.shortener.models.UrlMapping;
import com.url.shortener.models.User;
import com.url.shortener.repository.ClickEventRepository;
import com.url.shortener.repository.UrlMappingRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UrlMappingService {

    private UrlMappingRepository urlMappingRepository;
    private ClickEventRepository clickEventRepository;

    public UrlMappingDTO createShortUrl(String originalurl,User user){

        String shortUrl = generateShortUrl(originalurl);
        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(originalurl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());

        UrlMapping savedUrlMapping = urlMappingRepository.save(urlMapping);

        return convertToDto(savedUrlMapping);

        }

    public List<UrlMappingDTO> fetchUsersUrls(User user){
        return urlMappingRepository.findByUser(user)
                .stream()
                .map((e)-> convertToDto(e))
                .collect(Collectors.toList());
    }

    public List<ClickEventDTO> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            return clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping, start, end).stream()
                    .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()))
                    .entrySet().stream()
                    .map(entry -> {
                        ClickEventDTO clickEventDTO = new ClickEventDTO();
                        clickEventDTO.setClickDate(entry.getKey());
                        clickEventDTO.setCount(entry.getValue());
                        return clickEventDTO;
                    })
                    .collect(Collectors.toList());
        }
        return null;
    }

    public Map<LocalDate,Long> getTotalClicksByUser(User user,LocalDate start,LocalDate end){
        List<UrlMapping> urlMappings = urlMappingRepository.findByUser(user);
        if(urlMappings!=null && !urlMappings.isEmpty()){
            List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingInAndClickDateBetween(urlMappings, start.atStartOfDay(), end.plusDays(1).atStartOfDay());
            return clickEvents.stream()
                .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()));
        }
        return null;
    }

    private UrlMappingDTO convertToDto(UrlMapping savedUrlMapping) {
        UrlMappingDTO urlMappingDto = new UrlMappingDTO(savedUrlMapping.getId(),
                                savedUrlMapping.getOriginalUrl(), 
                                savedUrlMapping.getShortUrl(), 
                                savedUrlMapping.getClickCount(), 
                                savedUrlMapping.getCreatedDate(), 
                                savedUrlMapping.getUser().getUsername());

        return urlMappingDto;
    }

    private String generateShortUrl(String originalurl) {
        //cretae a short url of length 8 with random charaters A to Z ,0 to 9,a to z
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder shortUrl = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            int index = (int) (Math.random() * characters.length());
            shortUrl.append(characters.charAt(index));
        }
        //check if the short url already exists in the database
        UrlMapping existingUrlMapping = urlMappingRepository.findByShortUrl(shortUrl.toString());
        if (existingUrlMapping == null) {
            return shortUrl.toString();
        }
        //if it exists, generate a new short url
        return generateShortUrl(originalurl);

    }

    public UrlMapping getOriginalUrl(String shortUrl) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);

        //for every click event hit we have to save the number of click i.e add i to the previous click count
        if(urlMapping!=null){
            urlMapping.setClickCount(urlMapping.getClickCount()+1);
            urlMappingRepository.save(urlMapping);
        }
        //Now we add the clikEvent to the database
        ClickEvent clickEvent = new ClickEvent();
        clickEvent.setClickDate(LocalDateTime.now());
        clickEvent.setUrlMapping(urlMapping);
        clickEventRepository.save(clickEvent);
        return urlMapping;
    }
}
