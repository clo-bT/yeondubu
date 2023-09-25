package yeon.dubu.expenditure.exception;

import org.springframework.http.HttpStatus;
import yeon.dubu.exception.CustomException;

public class NoSuchExpenditureException extends CustomException {
    public NoSuchExpenditureException() {
    }

    public NoSuchExpenditureException(String message) {
        super(message);
    }
    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}
