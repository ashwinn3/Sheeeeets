package hello;

/**
 * Created by Ashwin on 1/12/18.
 */
import java.sql.*;

public class DBConnect {

    public static Connection requestConnection() {
        Connection con = null;
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            con = DriverManager.getConnection("jdbc:mysql://finaltry.ckqcrpcfuhgo.us-east-2.rds.amazonaws.com",
                    "ashwinn3",
                    "College2015");
            if(!con.isClosed())
                System.out.println("Connection successfully granted.");
        } catch(Exception e) {
            System.err.println("Exception: " + e);
        }
        return con;
    }

    public static boolean executeUpdate(String sqlStatement, Connection con) {
        try {
            Statement statement = null;
            statement = con.createStatement();
            statement.executeUpdate(sqlStatement);
            return true;
        } catch(Exception e) {
            System.err.println("Exception: " + e);
            return false;
        }
    }

    public static ResultSet executeRetrieve(String sqlStatement, Connection con) {
        try {
            Statement statement = null;
            statement = con.createStatement();
            return statement.executeQuery(sqlStatement);
        } catch(Exception e) {
            System.err.println("Exception: " + e);
        }
        return null;
    }
}
