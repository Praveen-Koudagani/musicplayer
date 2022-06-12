package com.praveen.musicapp.service;

import com.praveen.musicapp.dto.FavouriteSongDto;
import com.praveen.musicapp.model.FavouriteSongs;
import com.praveen.musicapp.model.Song;
import com.praveen.musicapp.repository.FavoriteSongsRepository;
import com.praveen.musicapp.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.List;

@Service
public class SongService {
    final String SONG_DIR="E:\\java_files\\eclipse\\music-player\\musicplayer\\music-app-fe\\public\\songs\\";
    @Autowired
    private SongRepository songRepo;
    @Autowired
    private FavoriteSongsRepository favoriteSongsRepo;

    public Song getSongByName(String songName) {
        return songRepo.getById(songName);
    }
    public List<Song> getAllSongs(){
        return songRepo.findAll();
    }
    public FavouriteSongs saveFavouriteSong(FavouriteSongDto song){
        FavouriteSongs favouriteSong=new FavouriteSongs();
        favouriteSong.setSongName(song.getSongName());
        favouriteSong.setUsername(song.getUsername());
        //System.out.println(favouriteSong.getSongName()+" "+favouriteSong.getUsername());
        return favoriteSongsRepo.save(favouriteSong);
    }
    public List<String> getAllFavouriteSongs(String username){
        return favoriteSongsRepo.findByUsername(username);
    }

    public String saveSong(InputStream inputStream,String originalFilename) {
        String message="success fully uploaded";
        Song song=new Song();
        song.setSongName(originalFilename);
        song.setSongUrl(SONG_DIR+originalFilename);
        File file = new File(SONG_DIR+originalFilename);
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

    public String unFavouriteSong(FavouriteSongDto favouriteSongDto) {
        //System.out.println(favouriteSongDto.getSongName()+" "+favouriteSongDto.getUsername());
       List<Long> id= favoriteSongsRepo.findId(favouriteSongDto.getUsername(),favouriteSongDto.getSongName());
       if(id.size()>0) {
           favoriteSongsRepo.deleteById(id.get(0));
       }
        return "marked as un-favourite";
    }
}
