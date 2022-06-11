package com.Devmountain.photoCollect2.dtos;


import com.Devmountain.photoCollect2.entities.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Long id;
    private String url;
    private String caption;
    private UserDto userDto;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public UserDto getUserDto() {
        return userDto;
    }

    public void setUserDto(UserDto userDto) {
        this.userDto = userDto;
    }

    public PostDto(Post post){
        if(post.getId() != null){
            this.id = post.getId();
        }
        if(post.getUrl() != null) {
            this.url = post.getUrl();
        }
        if(post.getCaption() != null){
            this.caption = post.getCaption();
        }
    }



}
