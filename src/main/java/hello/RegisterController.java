package hello;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.ResultSet;

/**
 * Created by Ashwin on 1/12/18.
 */
@RestController
public class RegisterController {

    /*
     * When passing in a password to this register request, use hashcode of password String for security
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Response register(@RequestParam(value = "username", defaultValue="UserError") String username,
                             @RequestParam(value = "password", defaultValue = "PassError") String password,
                             @RequestParam(value = "email", defaultValue = "EmailError") String email) {
        try {
            Connection con = DBConnect.requestConnection();
            ResultSet set = DBConnect.executeRetrieve("SELECT * FROM SheetsDB.User where " +
                    "username = '" + username + "';", con);
            if (set != null) {
                while (set.next()) {
                    con.close();
                    return new Response("Error: username already exists");
                }
            }
            DBConnect.executeUpdate("INSERT INTO SheetsDB.User (username, password, email) VALUES " +
                    "('" + username + "','" + password + "','" + email + "');", con);
            con.close();
            return new Response("Success: User registered");
        } catch (Exception e) {
            return new Response("Error");
        }
    }
}
