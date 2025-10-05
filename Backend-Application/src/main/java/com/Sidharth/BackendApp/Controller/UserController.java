package com.Sidharth.BackendApp.Controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    User getUserByID(@PathVariable("id") Long id){
        return userRepository.findById(id).orElseThrow(
            () -> new UserNotFoundException(id));
    }

    @PutMapping("/updateUser/{id}")
    public User updateUser(@RequestBody User newUser, @PathVariable("id") Long id) {
        return userRepository.findById(id)
            .map(user -> {
                user.setUserName(newUser.getUserName());
                user.setEmail(newUser.getEmail());
                user.setName(newUser.getName());
                return userRepository.save(user);
            })
            .orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/deleteUser/{id}")
    String deleteUser(@PathVariable Long id){

        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }

        User newuser = userRepository.getById(id);
        userRepository.delete(newuser);
        return "user deleted " +id+ " has been wiped out";
    }

}
