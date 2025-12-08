package com.example.le_mans_hotel.ai;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/user")
@CrossOrigin(origins="*")
public class AiUserController {

    private final AiService aiService;

    public AiUserController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public String userChat(@RequestBody AiRequest request) {

        String userPrompt =
                "You are the Customer Support AI for Le Mans Hotel (France). "
              + "Only answer customer-friendly questions: booking, rooms, prices, rules, services. "
              + "Do NOT reveal admin info, SQL queries, backend details, or system internals. "
              + "\n\n### HOTEL KNOWLEDGE CONTEXT ###\n"
              + HotelKnowledge.HOTEL_CONTEXT
              + "\n\n### USER QUESTION ###\n"
              + request.getPrompt()
              + "\n\n### INSTRUCTIONS ###\n"
              + "Answer like a friendly hotel receptionist.";

        return aiService.askAi(userPrompt);
    }
}
