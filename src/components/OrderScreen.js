import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Container, FormControl, InputLabel, Select, MenuItem, 
  Box, Typography, Button, List, ListItem, ListItemText, Badge,
  CircularProgress 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addItem } from '../store/cartSlice';

const categories = [
  { id: 1, name: 'כלי בית' },
  { id: 2, name: 'גבינות' },
  { id: 3, name: 'ירקות ופירות' },
  { id: 4, name: 'בשר ודגים' },
  { id: 5, name: 'מאפים' },
  { id: 6, name: 'קוסמטיקה' }
];

export default function OrderScreen() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchProducts = async (categoryId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://localhost:7128/api/Products/GetByCatID?catId=${categoryId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleProductSelect = (product) => {
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.unit_Price,
      category_Id: product.category_Id
    }));
  };

  return (
    <Container sx={{ pt: 2 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4,
          mt: 1,
          position: 'relative'
        }}
      >
        <Typography variant="h4">הזמנת מוצרים</Typography>
        <Badge 
          badgeContent={cart.totalItems} 
          color="primary"
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '1rem',
              height: '24px',
              minWidth: '24px',
              padding: '0 6px'
            }
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 30 }} />
        </Badge>
      </Box>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>קטגוריה</InputLabel>
        <Select value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCategory && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">מוצרים</Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {products.map((product) => (
                <ListItem 
                  key={product.id}
                  button
                  onClick={() => handleProductSelect(product)}
                >
                  <ListItemText 
                    primary={product.name}
                    secondary={`₪${product.unit_Price.toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">עגלת קניות</Typography>
        <List>
          {Object.values(cart.items).map((item) => (
            <ListItem key={item.name}>
              <ListItemText 
                primary={`${item.name} (${item.quantity})`}
                secondary={`₪${(item.price * item.quantity).toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">
          סה"כ: ₪{cart.totalPrice.toFixed(2)}
        </Typography>
      </Box>

      <Button 
        variant="contained" 
        fullWidth
        onClick={() => navigate('/summary')}
        disabled={cart.totalItems === 0}
      >
        סיים הזמנה
      </Button>
    </Container>
  );
}