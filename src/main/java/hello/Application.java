package hello;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        System.out.println("\nDocumentation: ");
        System.out.println("\nPOST request example for register: " + "localhost:8080/register?username=test1&password=324823");
        System.out.println("\nGET request example for login (return success/error): " + "localhost:8080/login?username=test1&password=2384u23\n");
    }
}
