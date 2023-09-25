package yeon.dubu.user.enumeration;

public enum UserRole {
    GROOM("신랑"),
    BRIDE("신부"),
    UNDEFINED("미정");

    private String description;

    UserRole(String description) {
        this.description = description;
    }
}
