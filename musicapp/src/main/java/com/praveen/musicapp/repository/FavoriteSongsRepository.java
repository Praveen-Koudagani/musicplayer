package com.praveen.musicapp.repository;

import com.praveen.musicapp.model.FavouriteSongs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FavoriteSongsRepository extends JpaRepository<FavouriteSongs,Long> {
    @Query("SELECT s.songName FROM FavouriteSongs s WHERE username = ?1")
    List<String> findByUsername(String username);
    @Query("SELECT s.songName FROM FavouriteSongs s WHERE username = ?1 AND songName=?2 ")
    List<String> findByUsernameAndSongName(String username,String songName);
    @Query("SELECT s.id FROM FavouriteSongs s WHERE username = ?1 AND songName=?2 ")
    List<Long> findId(String username,String songName);

}
