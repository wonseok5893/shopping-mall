package com.project.shoppingmall.service.impl;

import com.project.shoppingmall.controller.requestdto.member.RequestMemberSignUpDto;
import com.project.shoppingmall.exception.DuplicationEmailException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class MemberServiceImplTest {

    @Autowired
    MemberServiceImpl memberService;

    @DisplayName("회원 가입 성공")
    @Test
    void 회원가입() {
        RequestMemberSignUpDto member = sigunUpDto();
        memberService.register(member);
    }

    @DisplayName("이미 존재하는 이메일로 회원 가입 실패")
    @Test
    void 이미존재하는이메일로회원가입() {
        RequestMemberSignUpDto member = sigunUpDto();
        assertThrows(DuplicationEmailException.class, () -> {
            memberService.register(member);
            memberService.register(member);
        });
    }

    @DisplayName("로그인 성공")
    @Test
    void 로그인성공() {
        RequestMemberSignUpDto member = sigunUpDto();
        memberService.register(member);
        assertNotNull(memberService.login("wonseok", "1234").get());
    }

    @DisplayName("로그인 싪패")
    @Test
    void 로그인실패() {
        RequestMemberSignUpDto member = sigunUpDto();
        memberService.register(member);
        assertTrue(memberService.login("wonseok", "1234").isEmpty());
    }

    private RequestMemberSignUpDto sigunUpDto() {
        RequestMemberSignUpDto member = new RequestMemberSignUpDto();
        member.setEmail("wonseok");
        member.setName("최원석");
        member.setPassword("1234");
        member.setPhone("0104123");
        member.setLocation("노원구");
        return member;
    }
}