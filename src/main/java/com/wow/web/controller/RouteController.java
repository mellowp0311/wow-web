package com.wow.web.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Slf4j
@Controller
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RouteController {


    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @RequestMapping("/main")
    public String index(){
        return "main";
    }



}
