package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepo extends JpaRepository<News, Long> {

}
