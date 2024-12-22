package com.isthackathon.takimyildiz.core.configs;


import com.isthackathon.takimyildiz.business.abstracts.UserService;
import com.isthackathon.takimyildiz.core.exceptionHandlers.CustomAccessDeniedHandler;
import com.isthackathon.takimyildiz.core.exceptionHandlers.CustomAuthenticationEntryPointHandler;
import com.isthackathon.takimyildiz.core.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    private final CustomAuthenticationEntryPointHandler customAuthenticationEntryPointHandler;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserService userService, PasswordEncoder passwordEncoder, CustomAccessDeniedHandler customAccessDeniedHandler, CustomAuthenticationEntryPointHandler customAuthenticationEntryPointHandler) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.customAccessDeniedHandler = customAccessDeniedHandler;
        this.customAuthenticationEntryPointHandler = customAuthenticationEntryPointHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(x ->
                        x

                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                                .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll()

                                .requestMatchers(HttpMethod.POST, "/api/users/assignIstanbulCardToAuthenticatedUser").hasAnyRole("USER", "ADMIN")

                                .requestMatchers(HttpMethod.GET, "/api/shareds/getAllSharedsOfAuthenticatedUser").hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/shareds/addShared").hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/shareds/acceptShared/").hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/shareds/getAllPublishedSharedsOfAuthenticatedUser").hasAnyRole("USER", "ADMIN")

                                .requestMatchers(HttpMethod.GET, "/api/turnstiles/getTurnstilesOfAuthenticatedUser").hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/turnstiles/passCard").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/turnstiles/leaveVehicle/**").hasAnyRole("USER", "ADMIN")

                                .requestMatchers(HttpMethod.POST, "/api/schedules/addSchedule").hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/schedules/getSchedulesOfAuthenticatedParent").hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/schedules/getSchedulesOfAuthenticatdChild").hasAnyRole("USER", "ADMIN")

                                .requestMatchers(HttpMethod.GET, "/api/lines/getAllLines").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/lines/getLineByCode/**").permitAll()



                                .anyRequest().permitAll()
                )
                .exceptionHandling(x ->
                        x
                                .accessDeniedHandler(customAccessDeniedHandler)
                                .authenticationEntryPoint(customAuthenticationEntryPointHandler)
                )
                .sessionManagement(x -> x.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}
