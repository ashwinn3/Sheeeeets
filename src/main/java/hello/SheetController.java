package hello;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Ashwin on 2/15/18.
 */
@CrossOrigin
@RestController
public class SheetController {


    /*
     * add new sheet. For now this only takes in username and sheet name and fills in
     * data column with empty string
     * ex: http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/addSheet?username=<user>&name=<name>
     * TODO: in sprint 3 update this to take in json data and store
     *
     */
    @RequestMapping("/addSheet")
    public Response addSheet(@RequestParam(value="username", defaultValue="na") String username,
                          @RequestParam(value="name", defaultValue="na") String name) {
        Connection con = DBConnect.requestConnection();
        try {
            DBConnect.executeUpdate("INSERT INTO SheetsDB.Sheets (username, title, data) VALUES " +
                    "('" + username + "','" + name + "','" + "" + "');", con);
            con.close();
            return new Response("Success");
        } catch (Exception e) {
            System.out.print(e);
        }
        return new Response("Failure");
    }

    /*
     * returns json with list identified by "names": ...
     * ex: http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/getSheets?username=<user>
     * returns:
     * {
     *   "names": [
     *   "calendar",
     *   "somethingElse"
     *   ]
     * }
     */
    @RequestMapping("/getSheets")
    public SheetNames getSheets(@RequestParam(value="username", defaultValue="na") String username) {
        Connection con = DBConnect.requestConnection();
        List<String> toret = new ArrayList<>();
        try {
            ResultSet set = DBConnect.executeRetrieve("SELECT title FROM SheetsDB.Sheets where " +
                    "username = '" + username + "';", con);
            while (set.next()) {
                toret.add(set.getString("title"));
            }
        } catch (Exception e) {
            System.out.print(e);
        }
        return new SheetNames(toret);
    }

    public class SheetNames {
        private List<String> names;
        public SheetNames(List<String> names) {
            this.names = names;
        }

        public List<String> getNames() {
            return names;
        }
    }

}