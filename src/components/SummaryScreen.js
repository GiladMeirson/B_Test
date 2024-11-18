import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Alert,
  Snackbar
} from '@mui/material';
import { clearCart } from '../store/cartSlice';

export default function SummaryScreen() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // בניית אובייקט ההזמנה בפורמט הנדרש
    const orderData = {
      id: 0, // ערך התחלתי, יתעדכן בשרת
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      email: formData.email,
      totalPrice: cart.totalPrice,
      totalQuantity: cart.totalItems,
      products: Object.values(cart.items).map(item => ({
        id: item.id,
        name: item.name,
        category_Id: item.category_Id || 0, // אם אין קטגוריה, נשלח 0
        unit_Price: item.price
      }))
    };

    try {
      const response = await fetch('https://localhost:7128/api/Orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      // הזמנה הצליחה
      setShowSuccess(true);
      dispatch(clearCart()); // ניקוי העגלה
      
      // אחרי 3 שניות, נחזור לדף הראשי
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (error) {
      console.error('Error submitting order:', error);
      alert('אירעה שגיאה בשליחת ההזמנה. אנא נסה שוב.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>סיכום הזמנה</Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">פרטי ההזמנה</Typography>
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
          סה"כ לתשלום: ₪{cart.totalPrice.toFixed(2)}
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="שם פרטי"
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="שם משפחה"
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="כתובת"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="אימייל"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <Button 
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          שלח הזמנה
        </Button>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          ההזמנה בוצעה בהצלחה! מעביר אותך לדף הראשי...
        </Alert>
      </Snackbar>
    </Container>
  );
}