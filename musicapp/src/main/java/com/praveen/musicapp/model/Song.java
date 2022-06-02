package com.praveen.musicapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Song {
    @Id
    String SongName;
    String Music;
    String Description;
    @NotBlank(message = "Song url required")
    String SongUrl;

}
