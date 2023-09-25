package yeon.dubu.couple.exception;

import org.springframework.http.HttpStatus;
import yeon.dubu.exception.CustomException;

public class NoSuchCoupleException extends CustomException {
    public NoSuchCoupleException() {
    }

    public NoSuchCoupleException(String message) {
        super(message);
    }
    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}
