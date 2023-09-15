package yeon.dubu.auth.enumeration;

import lombok.Getter;

@Getter
public enum Role {

    ADMIN("ROLE_ADMIN"), USER("ROLE_USER");

    private String description;

    Role(String description) {
        this.description = description;
    }
}
