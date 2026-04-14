package expense_tracker.controller;

import expense_tracker.model.User;
import expense_tracker.repository.UserRepository;
import expense_tracker.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ REGISTER
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        userRepository.save(user);
        return "User registered successfully";
    }

    // ✅ LOGIN (Returns JWT Token)
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent() &&
            existingUser.get().getPassword().equals(user.getPassword())) {

            return jwtUtil.generateToken(user.getEmail()); // 🔥 TOKEN
        }

        return "Invalid credentials";
    }
}