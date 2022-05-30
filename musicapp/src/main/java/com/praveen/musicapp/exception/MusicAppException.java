package com.praveen.musicapp.exception;

public class MusicAppException extends RuntimeException {
    public MusicAppException(String exMessage, Exception exception) {
        super(exMessage, exception);
    }

    public MusicAppException(String exMessage) {
        super(exMessage);
    }
}