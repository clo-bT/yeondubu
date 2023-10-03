package yeon.dubu.auth.config;

public class ExpireTime {
    // TODO: refresh token reissue 관련 기능 추가
    public static final long ACCESS_TOKEN_EXPIRE_TIME = 2 * 7 * 24 * 60 * 60 * 1000L;     // 2주
    public static final long REFRESH_TOKEN_EXPIRE_TIME = 2 * 7 * 24 * 60 * 60 * 1000L;     // 2주
}
