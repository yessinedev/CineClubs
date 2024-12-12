// ClubMapper.java
package com.tuniclubs.app.mapper;

import com.tuniclubs.app.dto.CategoryDTO;
import com.tuniclubs.app.dto.ClubDTO;
import com.tuniclubs.app.dto.ClubMemberDTO;
import com.tuniclubs.app.dto.PostDTO;
import com.tuniclubs.app.enums.MemberStatus;
import com.tuniclubs.app.models.Club;
import com.tuniclubs.app.models.ClubMember;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
@Component
public class ClubMapper {
    public static ClubDTO toClubDTO(Club club) {
        return toClubDTO(club, false, false);
    }

    public static ClubDTO toClubDTO(Club club, boolean includePosts, boolean includeMembers) {
        ClubDTO clubDTO = new ClubDTO();

        clubDTO.setId(club.getId());
        clubDTO.setName(club.getName());
        clubDTO.setDescription(club.getDescription());
        clubDTO.setImageUrl(club.getImageUrl());
        clubDTO.setOwnerId(club.getUser().getUserId());
        clubDTO.setOwnerUsername(club.getUser().getUsername());
        clubDTO.setOwnerImageUrl(club.getUser().getImageUrl());
        clubDTO.setMembersCount(club.getMembers() != null ? (int) club.getMembers().stream()
                .filter(member -> member.getStatus() == MemberStatus.APPROVED).count() : 0);
        clubDTO.setPostsCount(club.getPosts() != null ? club.getPosts().size() : 0);
        clubDTO.setSlug(club.getSlug());
        clubDTO.setPublic(club.isPublic());
        clubDTO.setCategory(new CategoryDTO(club.getCategory()));
        clubDTO.setCreatedAt(club.getCreatedAt());
        clubDTO.setUpdatedAt(club.getUpdatedAt());

        if (includePosts && club.getPosts() != null) {
            clubDTO.setPosts(club.getPosts().stream()
                    .map(PostDTO::new)
                    .collect(Collectors.toList()));
        }

        if (includeMembers && club.getMembers() != null) {
            clubDTO.setMembers(club.getMembers().stream()
                    .map(member -> toClubMemberDTO(member, club))
                    .sorted(Comparator.comparing(ClubMemberDTO::getJoinedAt, Comparator.nullsLast(Comparator.naturalOrder())))
                    .collect(Collectors.toList()));
        }

        return clubDTO;
    }

    private static ClubMemberDTO toClubMemberDTO(ClubMember member, Club club) {
        return new ClubMemberDTO(
                member.getId(),
                member.getUser().getUserId(),
                club.getId(),
                createUserName(member),
                member.getUser().getImageUrl(),
                member.getStatus(),
                member.getRole(),
                club.getPosts() != null ? (int) club.getPosts().stream()
                        .filter(post -> post.getAuthor().getUserId().equals(member.getUser().getUserId()))
                        .count() : 0,
                member.getJoinedAt(),
                member.getCreatedAt(),
                member.getUpdatedAt()
        );
    }

    private static String createUserName(ClubMember member) {
        String firstName = member.getUser().getFirstName();
        String lastName = member.getUser().getLastName();

        if (firstName != null && lastName != null) {
            return firstName + " " + lastName;
        } else if (firstName != null) {
            return firstName;
        } else if (lastName != null) {
            return lastName;
        }

        return "";
    }
}