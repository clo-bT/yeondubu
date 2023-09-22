package yeon.dubu.income.exception;

import org.springframework.http.HttpStatus;
import yeon.dubu.exception.CustomException;

public class NoSuchMoneyIncomeException extends CustomException {
    public NoSuchMoneyIncomeException() {
    }

    public NoSuchMoneyIncomeException(String message) {
        super(message);
    }
    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}
