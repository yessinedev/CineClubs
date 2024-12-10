package com.tuniclubs.app.controllers;

import com.tuniclubs.app.dto.MessageDTO;
import com.tuniclubs.app.services.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/club/{clubId}")
    public ResponseEntity<List<MessageDTO>> getClubMessages(@PathVariable Long clubId) {
        return ResponseEntity.ok(messageService.getClubMessages(clubId));
    }

    @PostMapping("/club/{clubId}")
    public ResponseEntity<MessageDTO> sendMessage(
            @PathVariable Long clubId,
            @RequestBody Map<String, String> payload,
            @RequestParam String userId) {
        String content = payload.get("content");
        return ResponseEntity.ok(messageService.sendMessage(content, clubId, userId));
    }
} 