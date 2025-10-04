package com.Sidharth.BackendApp.Repository;
import com.Sidharth.BackendApp.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    
}
