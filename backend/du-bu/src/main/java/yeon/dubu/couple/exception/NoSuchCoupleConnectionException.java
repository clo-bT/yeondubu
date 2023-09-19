package yeon.dubu.couple.exception;

import org.springframework.http.HttpStatus;
import yeon.dubu.exception.CustomException;

public class NoSuchCoupleConnectionException extends CustomException{
    public NoSuchCoupleConnectionException() {
    }

    public NoSuchCoupleConnectionException(String message) {
        super(message);
    }
    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}
