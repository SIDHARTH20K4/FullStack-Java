package com.Sidharth.BackendApp.Exception;
import java.util.Map;
import java.util.HashMap;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class UserNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(org.springframework.http.HttpStatus.NOT_FOUND)

    public Map<String, String> ExceptionHandler(UserNotFoundException ex){
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("errorMessage", ex.getMessage());
        return errorMap;
    }

}
