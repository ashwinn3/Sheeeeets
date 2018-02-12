package hello;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;

/**
 * Created by Ashwin on 2/12/18.
 */
@RestController
public class AccountController {


    /*
     * pass in username of user and new email address to update user account
     * ex: http://localhost:8080/changeEmail?username=<user>&newEmail=<email>
     * returns response: success even if passed in user does not exist
     */
    @RequestMapping("/changeEmail")
    public Response changeEmail(@RequestParam(value="username", defaultValue="na") String username,
                          @RequestParam(value="newEmail", defaultValue="na") String newEmail) {
        Connection con = DBConnect.requestConnection();
        try {
            DBConnect.executeUpdate("UPDATE SheetsDB.User SET email = '" + newEmail + "' WHERE username = '" + username + "';", con);
            con.close();
            return new Response("Success");
        } catch (Exception e) {
            System.out.print(e);
            return new Response("Error");
        }
    }

    /*
     * pass in username of user and new hashed password to update user account
     * ex: http://localhost:8080/changePassword?username=<user>&newPassword=<hash(password)>
     * returns response: success even if passed in user does not exist
     */
    @RequestMapping("/changePassword")
    public Response changePassword(@RequestParam(value="username", defaultValue="na") String username,
                          @RequestParam(value="newPassword", defaultValue="na") String newPassword) {
        Connection con = DBConnect.requestConnection();
        try {
            DBConnect.executeUpdate("UPDATE SheetsDB.User SET password = '" + newPassword + "' WHERE username = '" + username + "';", con);
            con.close();
            return new Response("Success");
        } catch (Exception e) {
            System.out.print(e);
            return new Response("Error");
        }
    }

}

