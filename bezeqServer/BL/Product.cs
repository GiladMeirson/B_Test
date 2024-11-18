using bezeqServer.DAL;

namespace bezeqServer.BL
{
    public class Product
    {
        int id;
        string name;
        int category_Id;
        int unit_Price;

        public Product()
        {
        }

        public Product(int id, string name, int category_Id, int unit_Price)
        {
            Id = id;
            Name = name;
            Category_Id = category_Id;
            Unit_Price = unit_Price;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public int Category_Id { get => category_Id; set => category_Id = value; }
        public int Unit_Price { get => unit_Price; set => unit_Price = value; }


        static public List<Product> GetAllproducts()
        {
            DBservice DB = new DBservice();
            return DB.GetAllproducts();
        }

        static public List<Product> GetProductsByCategory(int categoryId)
        {
            DBservice DB = new DBservice();
            return DB.GetproductsByCategoryId(categoryId);
        }
    }
}
//CREATE Table Products(
//Id int Identity(1,1) Primary Key,
//name Nvarchar(55),
//category_Id INT,
//unit_Price INT
//)