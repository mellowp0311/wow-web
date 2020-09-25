package com.wow.web.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@Slf4j
@Controller
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RouteController {


    @RequestMapping("/login")
    public String login(){
        return "login";
    }

    @RequestMapping(value= "/main", method = RequestMethod.POST)
    public String main(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("userSeq", request.getParameter("userSeq"));
        log.info("session: {}", session.getAttribute("userSeq"));
        return "redirect:/dashboard";
    }

    @RequestMapping("/dashboard")
    public ModelAndView dashboard(HttpServletRequest request){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("dashboard");
        modelAndView.addObject("userSeq", request.getSession().getAttribute("userSeq"));
        return modelAndView;
    }



}
