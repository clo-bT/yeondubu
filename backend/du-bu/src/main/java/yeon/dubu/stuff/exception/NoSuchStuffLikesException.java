package yeon.dubu.stuff.exception;

import org.springframework.http.HttpStatus;
import yeon.dubu.exception.CustomException;

public class NoSuchStuffLikesException extends CustomException {
    public NoSuchStuffLikesException() {
    }

    public NoSuchStuffLikesException(String message) {
        super(message);
    }
    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}