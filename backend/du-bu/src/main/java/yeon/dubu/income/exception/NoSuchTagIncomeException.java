package yeon.dubu.income.exception;

import org.springframework.http.HttpStatus;
import yeon.dubu.exception.CustomException;

public class NoSuchTagIncomeException extends CustomException {
    public NoSuchTagIncomeException() {
    }

    public NoSuchTagIncomeException(String message) {
        super(message);
    }
    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}
