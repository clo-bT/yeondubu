package yeon.dubu.money.exception;

import org.springframework.http.HttpStatus;
import yeon.dubu.exception.CustomException;

public class NoSuchTagExpenditureException extends CustomException {
    public NoSuchTagExpenditureException() {
    }

    public NoSuchTagExpenditureException(String message) {
        super(message);
    }
    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}
