package yeon.dubu.oauth.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import yeon.dubu.oauth.enumeration.Role;
import yeon.dubu.oauth.jwt.JwtAuthenticationFilter;
import yeon.dubu.oauth.jwt.JwtTokenProvider;
import yeon.dubu.oauth.oauth2.OAuth2AuthenticationFailureHandler;
import yeon.dubu.oauth.oauth2.OAuth2AuthenticationSuccessHandler;
import yeon.dubu.oauth.repository.CookieAuthorizationRequestRepository;
import yeon.dubu.oauth.service.CustomOAuth2UserService;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class WebSecurityConfigure {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtTokenProvider jwtTokenProvider;
    private final CookieAuthorizationRequestRepository cookieAuthorizationRequestRepository;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //httpBasic, csrf, formLogin, rememberMe, logout, session disable
        http
                .csrf(AbstractHttpConfigurer::disable
                )
                .headers((headerConfig) ->
                        headerConfig.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable
                        )
                )
                .formLogin(AbstractHttpConfigurer::disable);

        //요청에 대한 권한 설정
        http.authorizeHttpRequests((authorizeRequests) ->
                authorizeRequests
//                        .requestMatchers(PathRequest.toH2Console()).permitAll()
                        .requestMatchers("/", "/login/**").permitAll()
                        .requestMatchers("/posts/**", "/api/v1/posts/**").hasRole(Role.USER.name())
                        .requestMatchers("/admins/**", "/api/v1/admin/**").hasRole(Role.ADMIN.name())
                        .anyRequest().authenticated()
        );

        //oauth2Login
        http.oauth2Login(oauth2Login -> oauth2Login
                .authorizationEndpoint(authorization -> authorization
                        .baseUri("/oauth2/authorize")
                        .authorizationRequestRepository(this.cookieAuthorizationRequestRepository)
                )
                .redirectionEndpoint(redirection -> redirection
                        .baseUri("/oauth2/callback/*") // 소셜 인증 후 redirect url
                )
                //userService()는 OAuth2 인증 과정에서 Authentication 생성에 필요한 OAuth2User 를 반환하는 클래스를 지정한다.
                .userInfoEndpoint(userInfo -> userInfo
                        .userService(this.customOAuth2UserService)  // 회원 정보 처리
                )
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .failureHandler(oAuth2AuthenticationFailureHandler));

        http.logout(logout -> logout
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID")
                );

        //jwt filter 설정
        http.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
