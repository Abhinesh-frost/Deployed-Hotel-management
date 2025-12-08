package com.example.le_mans_hotel.ai;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/admin")
@CrossOrigin(origins="*")
public class AiAdminController {

    private final AiService aiService;

    public AiAdminController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public String adminChat(@RequestBody AiRequest request) {

        // RAG-like prompt
        String adminPrompt =
                "You are the ADMIN AI Assistant for Le Mans Hotel (France). "
              + "Only answer hotel management, technical, analytics, admin tasks. "
              + "NEVER answer normal customer questions. "
              + "\n\n### HOTEL KNOWLEDGE CONTEXT ###\n"
              + HotelKnowledge.HOTEL_CONTEXT
              + "\n\n### ADMIN QUESTION ###\n"
              + request.getPrompt()
              + "\n\n### INSTRUCTIONS ###\n"
              + "Use the context above to generate accurate admin-level responses.";

        return aiService.askAi(adminPrompt);
    }
}
