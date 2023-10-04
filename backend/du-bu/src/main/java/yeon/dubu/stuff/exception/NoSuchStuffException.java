package yeon.dubu.stuff.exception;

import org.springframework.http.HttpStatus;
import yeon.dubu.exception.CustomException;

public class NoSuchStuffException extends CustomException {
    public NoSuchStuffException() {
    }

    public NoSuchStuffException(String message) {
        super(message);
    }
    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}