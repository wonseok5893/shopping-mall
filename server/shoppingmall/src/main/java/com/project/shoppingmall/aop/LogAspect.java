package com.project.shoppingmall.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Component
@Aspect
public class LogAspect {
    Logger logger = LoggerFactory.getLogger(LogAspect.class);

    @Around("@annotation(LogExecutionTime)")
    public Object logExecutionTIme(ProceedingJoinPoint joinPoint) throws Throwable {
        // 메소드 실행 전
        long start = System.currentTimeMillis();

        // 실행할 메소드
        Object proceed = joinPoint.proceed();

        //메소드 실행 후
        long end = System.currentTimeMillis();
        logger.info(end-start+"ms --- ");

        return proceed;
    }
}
