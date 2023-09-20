package yeon.dubu.money.exception;

import org.springframework.http.HttpStatus;
import yeon.dubu.exception.CustomException;

public class NoSuchMoneyException extends CustomException{

    public NoSuchMoneyException() {
    }

    public NoSuchMoneyException(String message) {
        super(message);
    }
    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}
