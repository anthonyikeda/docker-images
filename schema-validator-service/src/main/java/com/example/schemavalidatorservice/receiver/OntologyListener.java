package com.example.schemavalidatorservice.receiver;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.CountDownLatch;

@Component
public class OntologyListener {

    private Logger log = LoggerFactory.getLogger(OntologyListener.class);

    private CountDownLatch latch = new CountDownLatch(1);

    public void receiveMessage(byte[] message) {
        String resolvedMessage = new String(message);
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode node = mapper.readTree(message);
            String eventType = node.path("EventType").asText("Not event");
            String key = node.path("Key").asText("Not set");
            log.info("Event Type: {}, Key: {}", eventType, key);
        } catch (IOException ioe) {
            log.error(ioe.getMessage(), ioe);
        }

        log.debug(resolvedMessage);

        latch.countDown();
    }

    public CountDownLatch getLatch() {
        return latch;
    }
}
