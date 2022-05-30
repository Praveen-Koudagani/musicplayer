package com.praveen.musicapp.controller;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	/*
	 @Autowired
	    private UserService userService;

	    @PostConstruct
	    public void initRoleAndUser() {
	        userService.initRoleAndUser();
	    }

	    @PostMapping({"/registerNewUser"})
	    public User registerNewUser(@RequestBody User user) {
	        return userService.registerNewUser(user);
	    }

	    @GetMapping({"/forAdmin"})
	    @PreAuthorize("hasRole('Admin')")
	    public String forAdmin(){
	        return "This URL is only accessible to the admin";
	    }

	    @GetMapping({"/forUser"})
	    @PreAuthorize("hasRole('User')")
	    public String forUser(){
	        return "This URL is only accessible to the user";
	    }
*/
}
