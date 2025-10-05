package com.Sidharth.BackendApp.Controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.Sidharth.BackendApp.Model.User;
import com.Sidharth.BackendApp.Repository.UserRepository;
import com.Sidharth.BackendApp.Exception.UserNotFoundException;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/addUser")
    User newUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

    @GetMapping("/getUser")
    List<User> getUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/getUser/{id}")
    User getUserByID(long id){
        return userRepository.findById(id).orElseThrow(
            () -> new UserNotFoundException(id));
    }
}
