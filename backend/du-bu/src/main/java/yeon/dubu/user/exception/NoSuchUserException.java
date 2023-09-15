package yeon.dubu.user.exception;

import org.springframework.http.HttpStatus;
import yeon.dubu.exception.CustomException;

public class NoSuchUserException extends CustomException {

    public NoSuchUserException() {
    }

    public NoSuchUserException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}
