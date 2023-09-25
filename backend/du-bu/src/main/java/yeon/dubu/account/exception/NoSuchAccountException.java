package yeon.dubu.account.exception;

import org.springframework.http.HttpStatus;
import yeon.dubu.exception.CustomException;

public class NoSuchAccountException extends CustomException {
    public NoSuchAccountException() {
    }

    public NoSuchAccountException(String message) {
        super(message);
    }
    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}
