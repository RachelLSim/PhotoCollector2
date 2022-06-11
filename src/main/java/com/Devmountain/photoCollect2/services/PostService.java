package com.Devmountain.photoCollect2.services;

import com.Devmountain.photoCollect2.dtos.PostDto;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface PostService {
    @Transactional
    void addPost(PostDto postDto, Long userId);

    @Transactional
    void deletePostById(Long postId);

    @Transactional
    void updatePostById(PostDto postDto);

    List<PostDto> getAllPostsByUserId(Long userId);

    Optional<PostDto> getPostById(Long postId);
}
