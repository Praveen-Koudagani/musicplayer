package com.praveen.musicapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.praveen.musicapp.model.Role;
import com.praveen.musicapp.repository.RoleRepository;

@Service
public class RoleService {
	@Autowired
    private RoleRepository roleDao;

    public Role createNewRole(Role role) {
        return roleDao.save(role);
    }

}
