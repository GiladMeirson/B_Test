###דאטה בייס 
השתמשתי בMS SQL
יצרתי את הטבלאות Category Product Order Order_Product

###צד שרת 
השתמשתי בASP.net core בארכיטקטורה של Web API בשיטת השכבות
controller -> BL (business logic) -> DAL (data access layer)

###צד לקוח 
השתמשתי בReact עם ספריות כמו MUI וREDUX 



###הוראות הרצה: 
לא העליתי את תיקיית node_modules לכן יש להתקין את הספריות הבאות דרך הטרמינל : 
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @reduxjs/toolkit react-redux
npm install react-router-dom

לאחר התקנה של ספריות אלו אפשר להריץ את הצד לקוח באמצעות פקודה npm start הפרויקט ירוץ על פורט 3000 בכתובת : http://localhost:3000

את הצד שרת יש לפתוח בסביבת עבודה Visual Studio ולהריץ את הפרויקט על ידי לחיצת כפתור הפליי (F5) (ללא הרצה של הצד שרת קריאות הAPI לא יעבדו) קריאות הAPI של הצד לקוח פונות לשרת בפורט 7128 יכול להיות שזה ישתנה בזמן הבדיקה יש לשים לב.

הצד של מאגר הנתונים רץ בצורה לוקאלית לכן יש להריץ את הסקריפטים שיש בגיט כדי שיהיה אותו מבנה נתונים.


תודה רבה על ההזדמנות ועל מטלת הבית.

מגיש גלעד מאירסון.
