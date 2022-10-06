package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NewsRepo extends JpaRepository<News, Long> {
    @Query(value = "select * from news order by rand() limit :size", nativeQuery = true)
    List<News> findRandomNews(@Param("size") int size);
}
