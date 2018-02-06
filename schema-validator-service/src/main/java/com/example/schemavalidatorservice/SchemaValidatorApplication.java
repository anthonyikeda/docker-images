package com.example.schemavalidatorservice;

import com.example.schemavalidatorservice.receiver.OntologyListener;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SchemaValidatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(SchemaValidatorApplication.class, args);
	}

	private static final String queueName = "ontologies";

	@Bean
	Queue queue() {
        return new Queue(queueName, true);
	}

    @Bean
    FanoutExchange exchange() {
        return new FanoutExchange("bucketevents", false, false);
    }

    @Bean
    Binding binding(Queue queue, FanoutExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange);
    }

    @Bean
    SimpleMessageListenerContainer container(ConnectionFactory connectionFactory,
                                             MessageListenerAdapter listenerAdapter) {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.setQueueNames(queueName);
        container.setMessageListener(listenerAdapter);
        return container;
    }

    @Bean
    MessageListenerAdapter listenerAdapter(OntologyListener receiver) {
        return new MessageListenerAdapter(receiver, "receiveMessage");
    }
}
