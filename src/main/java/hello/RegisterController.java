package hello;

import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.sql.ResultSet;

/**
 * Created by Ashwin on 1/12/18.
 */
@CrossOrigin
@RestController
public class RegisterController {

    /*
     * TYPE: POST
     * url: http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/register?username=<username>&password=<pass>&email=<email>&firstName=<firstName>&lastName=<lastName>
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Response register(@RequestParam(value = "username", defaultValue="UserError") String username,
                             @RequestParam(value = "password", defaultValue = "PassError") String password,
                             @RequestParam(value = "email", defaultValue = "EmailError") String email,
                             @RequestParam(value = "firstName", defaultValue="UserError") String firstName,
                             @RequestParam(value = "lastName", defaultValue="UserError") String lastName) {
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
            DBConnect.executeUpdate("INSERT INTO SheetsDB.User (username, password, email, firstName, lastName) VALUES " +
                    "('" + username + "','" + password + "','" + email + "','" + firstName + "','" + lastName + "');", con);
            con.close();
            return new Response("Success: User registered");
        } catch (Exception e) {
            return new Response("Error");
        }
    }
}
