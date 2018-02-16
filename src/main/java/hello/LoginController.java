package hello;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.ResultSet;

/**
 * Created by Ashwin on 1/12/18.
 */
@CrossOrigin
@RestController
public class LoginController {


    /*
     * When passing in a password to this login request, use hashcode of password String for security
     */
    @RequestMapping("/login")
    public Response login(@RequestParam(value="username", defaultValue="na") String username,
                          @RequestParam(value="password", defaultValue="na") String password) {
        Connection con = DBConnect.requestConnection();
        ResultSet set = DBConnect.executeRetrieve("SELECT * FROM SheetsDB.User where " +
                "username = '" + username + "' and password = '" + password + "';", con);
        try {
            if (set != null) {
                while (set.next()) {
                    con.close();
                    return new Response("Login Success");
                }
            }
            con.close();
        } catch (Exception e) {
            System.out.print(e);
        }
        return new Response("Login Failure");
    }

}
