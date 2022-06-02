package com.praveen.musicapp.service;

import com.praveen.musicapp.model.Song;
import com.praveen.musicapp.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.List;

@Service
public class SongService {
    final String SONG_DIR="E:\\music-app-songs\\";
    @Autowired
    private SongRepository songRepo;

    public Song getSongByName(String songName) {
        return songRepo.getById(songName);
    }
    public List<Song> getAllSongs(){
        return songRepo.findAll();
    }

    public String saveSong(InputStream inputStream,String originalFilename) {
        String message="success fully uploaded";
        Song song=new Song();
        song.setSongName(originalFilename);
        song.setSongUrl(SONG_DIR+originalFilename+".mp3");
        File file = new File(SONG_DIR+originalFilename+".mp3");
        try {
            byte[] buffer = new byte[inputStream.available()];
            inputStream.read(buffer);
            OutputStream outStream = new FileOutputStream(file);
            outStream.write(buffer);
        }
        catch(IOException e){
            message=e.getMessage();
        }
        songRepo.save(song);
        return message;
    }
}
