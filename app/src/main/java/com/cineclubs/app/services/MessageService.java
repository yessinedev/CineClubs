package com.cineclubs.app.services;

import com.cineclubs.app.dto.MessageDTO;
import com.cineclubs.app.exceptions.UnauthorizedActionException;
import com.cineclubs.app.models.Club;
import com.cineclubs.app.models.Message;
import com.cineclubs.app.models.User;
import com.cineclubs.app.repository.MessageRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final ClubService clubService;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    public MessageService(MessageRepository messageRepository,
            ClubService clubService,
            UserService userService,
            SimpMessagingTemplate messagingTemplate) {
        this.messageRepository = messageRepository;
        this.clubService = clubService;
        this.userService = userService;
        this.messagingTemplate = messagingTemplate;
    }

    public List<MessageDTO> getClubMessages(Long clubId) {
        return messageRepository.findByClubIdOrderByCreatedAt(clubId)
                .stream()
                .map(MessageDTO::new)
                .toList();
    }

    public MessageDTO sendMessage(String content, Long clubId, String userId) {
        User sender = userService.getUserByUserId(userId);
        Club club = clubService.getClubById(clubId);

        // Check if user is a member of the club
        if (!clubService.isUserJoined(club, sender)) {
            throw new UnauthorizedActionException("MESSAGE", "send");
        }

        Message message = new Message();
        message.setContent(content);
        message.setSender(sender);
        message.setClub(club);

        Message savedMessage = messageRepository.save(message);
        MessageDTO messageDTO = new MessageDTO(savedMessage);

        // Send the message to all subscribers of this club's messages
        messagingTemplate.convertAndSend("/topic/clubs/" + clubId + "/messages", messageDTO);

        return messageDTO;
    }
}