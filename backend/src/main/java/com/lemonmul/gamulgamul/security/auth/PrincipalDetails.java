package com.lemonmul.gamulgamul.security.auth;

import com.lemonmul.gamulgamul.entity.user.Role;
import com.lemonmul.gamulgamul.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public class PrincipalDetails implements UserDetails {

    private String email;

    private String pwd;

    private Role role;

    public PrincipalDetails(User user) {
        this.email = user.getEmail();
        this.pwd = user.getPwd();
        this.role = user.getRole();
    }

    public PrincipalDetails(Role role) {
        this.email = null;
        this.pwd = null;
        this.role = role;
    }

    @Override
    public String getPassword() {
        return pwd;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<String> list = new ArrayList<>();
        list.add("ROLE_" + this.getRole().name());

        return list.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
