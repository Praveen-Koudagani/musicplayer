package com.praveen.musicapp.controller;

import com.praveen.musicapp.model.Song;
import com.praveen.musicapp.service.SongService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/music")
@AllArgsConstructor
public class MusicController {

    @Autowired
    private SongService songService;

    @GetMapping("/getSongs")
    public List<Song> getSongs() {
        return songService.getAllSongs();
    }

    @PostMapping("/uploadSong")
    public String upload(@RequestParam("file") MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        return songService.saveSong(file.getInputStream(), originalFilename);
    }
}
