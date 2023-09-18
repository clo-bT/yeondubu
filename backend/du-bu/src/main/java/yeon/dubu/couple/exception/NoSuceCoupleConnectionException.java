package yeon.dubu.couple.exception;

import org.springframework.http.HttpStatus;
import yeon.dubu.exception.CustomException;

public class NoSuceCoupleConnectionException extends CustomException{
    public NoSuceCoupleConnectionException() {
    }

    public NoSuceCoupleConnectionException(String message) {
        super(message);
    }
    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}
