package hello;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.ResultSet;

/**
 * Created by Ashwin on 2/12/18.
 */
@CrossOrigin
@RestController
public class AccountController {


    /*
     * pass in username of user and new email address to update user account
     * ex: http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/changeEmail?username=<user>&newEmail=<email>
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
     * ex: http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/changePassword?username=<user>&newPassword=<hash(password)>
     * returns response: Success even if passed in user does not exist
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

    /*
     * returns username and email (we can add first and last name later)
     * ex: http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/getUser?username=user1
     * returns:
     * {
     *    "username": "user1",
     *    "email": "allgood@yahoo.com"
     * }
     */

    @RequestMapping("/getUser")
    public SheetsUser getUser(@RequestParam(value="username", defaultValue="na") String username) {
        Connection con = DBConnect.requestConnection();
        String email = "";
        try {
            ResultSet set = DBConnect.executeRetrieve("SELECT email FROM SheetsDB.User WHERE " +
                    "username = '" + username + "';", con);
            while (set.next()) {
                System.out.println("here");
                email = set.getString("email");
            }
            con.close();
        } catch (Exception e) {
            System.out.print(e);
        }

        return new SheetsUser(username, email);
    }

}

