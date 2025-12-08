package com.example.le_mans_hotel.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@Service
public class AiService {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String OLLAMA_URL = "http://localhost:11434/api/generate";
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String askAi(String prompt) {
        try {
            Map<String, Object> body = Map.of(
                    "model", "llama3.1:8b",
                    "prompt", prompt,
                    "stream", false
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            String responseJson = restTemplate.postForObject(OLLAMA_URL, request, String.class);

            JsonNode node = objectMapper.readTree(responseJson);
            return node.get("response").asText();    // CLEAN OUTPUT

        } catch (Exception e) {
            return "AI Error: " + e.getMessage();
        }
    }
}
