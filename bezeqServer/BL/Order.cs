using bezeqServer.DAL;

namespace bezeqServer.BL
{
    public class Order
    {
        int id;
        string firstName;
        string lastName;
        string address;
        string email;
        int totalPrice;
        int totalQuantity;
        List<Product> products;

        public Order(int id, string firstName, string lastName, string address, string email, int totalPrice, int totalQuantity, List<Product> products)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Address = address;
            Email = email;
            TotalPrice = totalPrice;
            TotalQuantity = totalQuantity;
            Products = products;
        }

        public int Id { get => id; set => id = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string Address { get => address; set => address = value; }
        public string Email { get => email; set => email = value; }
        public int TotalPrice { get => totalPrice; set => totalPrice = value; }
        public int TotalQuantity { get => totalQuantity; set => totalQuantity = value; }
        public List<Product> Products { get => products; set => products = value; }


        public int insertOrder()
        {
            DBservice DB = new DBservice();
            int orderId =  DB.InsertOrder(this);
            foreach (Product p in this.Products)
            {
                int res2 = DB.InsertOrderAndProduct(orderId, p.Id);
                if (res2 == 0)
                {
                    return 0;
                }
            }
            return orderId;
        }

        static public int insertOrderProducts(int proId,int OrderId)
        {
            DBservice DB = new DBservice();
            return DB.InsertOrderAndProduct(proId, OrderId);
        }
    }
}
