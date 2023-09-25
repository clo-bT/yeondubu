package yeon.dubu.user.exception;

import org.springframework.http.HttpStatus;
import yeon.dubu.exception.CustomException;

public class NoSuchUserRoleException extends CustomException {
    public NoSuchUserRoleException() {
    }

    public NoSuchUserRoleException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}
