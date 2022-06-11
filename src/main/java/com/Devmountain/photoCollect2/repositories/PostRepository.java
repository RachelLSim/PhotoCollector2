package com.Devmountain.photoCollect2.repositories;

import com.Devmountain.photoCollect2.entities.Post;
import com.Devmountain.photoCollect2.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByUserEquals(User user);
}
