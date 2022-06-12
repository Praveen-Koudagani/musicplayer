package com.praveen.musicapp.controller;

import ch.qos.logback.core.boolex.EvaluationException;
import ch.qos.logback.core.net.SyslogOutputStream;
import com.praveen.musicapp.dto.FavouriteSongDto;
import com.praveen.musicapp.dto.UserName;
import com.praveen.musicapp.model.FavouriteSongs;
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
    @PostMapping("/saveFavouriteSong")
    public FavouriteSongs saveFavouriteSong(@RequestBody FavouriteSongDto favouriteSongDto){
        return songService.saveFavouriteSong(favouriteSongDto);
    }
    @DeleteMapping("/UnFavouriteSong")
    public String unFavouriteSong(@RequestBody FavouriteSongDto favouriteSongDto){
        return songService.unFavouriteSong(favouriteSongDto);
    }
    @PostMapping("/getFavouriteSongs")
    public List<String> getFavouriteSongs(@RequestBody UserName username){
        return songService.getAllFavouriteSongs(username.getUsername());
    }
}
