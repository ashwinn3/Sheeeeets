package hello;

/**
 * Created by Ashwin on 2/14/18.
 */
public class SheetsUser {
    public String username;
    public String email;
    public String firstName;
    public String lastName;


    public SheetsUser(String username, String email, String firstName, String lastName) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }


}
