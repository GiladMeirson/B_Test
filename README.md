# פרויקט Full Stack - מערכת ניהול מוצרים

## ארכיטקטורה ומבנה המערכת

### מסד נתונים
- **פלטפורמה**: MS SQL
- **טבלאות**:
  - Category
  - Product
  - Order
  - Order_Product

### שכבת שרת (Backend)
- **טכנולוגיה**: ASP.NET Core Web API
- **ארכיטקטורה**: ארכיטקטורת שכבות
  1. Controller
  2. Business Logic (BL)
  3. Data Access Layer (DAL)

### שכבת לקוח (Frontend)
- **טכנולוגיה**: React
- **ספריות עיקריות**:
  - Material-UI (MUI)
  - Redux
  - React Router

## הוראות הרצה

### התקנת צד לקוח
1. התקנת ספריות נדרשות:
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @reduxjs/toolkit react-redux
npm install react-router-dom
```

2. הרצת הפרויקט:
```bash
npm start
```
הפרויקט יעלה בכתובת: `http://localhost:3000`

### הרצת שרת
1. פתיחת הפרויקט ב-Visual Studio
2. הרצה באמצעות כפתור Play או F5
- **שים לב**: השרת רץ על פורט 7128 (עשוי להשתנות)
- **חשוב**: הרצת השרת הכרחית לפעולת קריאות ה-API

### הגדרת מסד נתונים
- יש להריץ את הסקריפטים המצורפים ב-Git ליצירת מבנה הנתונים
- מסד הנתונים רץ באופן מקומי (Locally)

---
בהצלחה!

מגיש: גלעד מאירסון
