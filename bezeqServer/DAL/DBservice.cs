using bezeqServer.BL;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Data.Common;

namespace bezeqServer.DAL
{
    public class DBservice
    {
        //--------------------------------------------------------------------------------------------------
        // This method creates a connection to the database according to the connectionString name in the appsettings.json file
        //--------------------------------------------------------------------------------------------------
        public SqlConnection connect(String conString)
        {

            // read the connection string from the configuration file
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json").Build();
            string cStr = configuration.GetConnectionString("myProjDB");
            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }





        public List<Product> GetAllproducts()
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            //Dictionary<string, object> paramDic = new Dictionary<string, object>();
           



            cmd = CreateCommandWithStoredProcedureGeneral("sp_getProductsAndCat", con, null); // create the command

            try
            {

                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                List <Product> productsList = new List<Product>();
                while (dataReader.Read())
                {
                  int Id = (int)dataReader["Id"];
                  string name = dataReader["name"].ToString();
                  int catgoryId = (int)dataReader["category_Id"];
                  int unitPrice = (int)dataReader["unit_Price"];
                  Product product = new Product(Id, name, catgoryId, unitPrice);
                  productsList.Add(product);
                        
                        

                   
                 


                }
                return productsList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }





        public List<Product> GetproductsByCategoryId(int catId)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            Dictionary<string, object> paramDic = new Dictionary<string, object>();

            paramDic.Add("@categoryId", catId);


            cmd = CreateCommandWithStoredProcedureGeneral("sp_getProductsBycategoryId", con, paramDic); // create the command

            try
            {

                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                List<Product> productsList = new List<Product>();
                while (dataReader.Read())
                {
                    int Id = (int)dataReader["Id"];
                    string name = dataReader["name"].ToString();
                    int catgoryId = (int)dataReader["category_Id"];
                    int unitPrice = (int)dataReader["unit_Price"];
                    Product product = new Product(Id, name, catgoryId, unitPrice);
                    productsList.Add(product);







                }
                return productsList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }


        public int InsertOrder(Order o)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            Dictionary<string, object> paramDic = new Dictionary<string, object>();
            paramDic.Add("@FirstName", o.FirstName);
            paramDic.Add("@LastName",o.LastName );
            paramDic.Add("@Address", o.Address);
            paramDic.Add("@Email",o.Email );
            paramDic.Add("@TotalPrice", o.TotalPrice);
            paramDic.Add("@TotalQuantity",o.TotalQuantity);


            cmd = CreateCommandWithStoredProcedureGeneral("sp_InsertOrder", con, paramDic); // create the command

            try
            {

                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                int orderId = -1;
                while (dataReader.Read())
                {
                    orderId = Convert.ToInt32(dataReader["Id"].ToString());
                   

                }

                return orderId;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }   
        }

        public int InsertOrderAndProduct(int orderId,int productId)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            Dictionary<string, object> paramDic = new Dictionary<string, object>();
            paramDic.Add("@orderId", orderId);
            paramDic.Add("@productId", productId);
            cmd = CreateCommandWithStoredProcedureGeneral("sp_InsertOrderAndProduct", con, paramDic); // create the command

            try
            {

                int orderIdAndProductId = -1;
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dataReader.Read())
                {
                    orderIdAndProductId = Convert.ToInt32(dataReader["Id"].ToString());


                }
                return orderIdAndProductId;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }



        // --------------------------------------------------------------------------------------------------
        // This method is a General method which create command with sp 
        // --------------------------------------------------------------------------------------------------

        private SqlCommand CreateCommandWithStoredProcedureGeneral(String spName, SqlConnection con, Dictionary<string, object> paramDic)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            if (paramDic != null)
                foreach (KeyValuePair<string, object> param in paramDic)
                {
                    cmd.Parameters.AddWithValue(param.Key, param.Value);

                }


            return cmd;
        }
    }
}
