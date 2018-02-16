package hello;

/**
 * Created by Ashwin on 2/14/18.
 */
public class SheetsUser {
    public String username;
    public String email;

    public SheetsUser(String username, String email) {
        this.username = username;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }
}
