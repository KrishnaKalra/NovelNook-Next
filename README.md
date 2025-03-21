# 📖 NovelNook: Assignment Project  

## 📌 Overview  

NovelNook is an interactive platform where book enthusiasts can share, discover, and review their favorite books. Designed to foster a vibrant literary community, it serves as a space where readers can:  

- Express their thoughts on books  
- Recommend must-read books  
- Engage in meaningful discussions  
- Post, edit, and delete detailed book reviews  
- Rate books based on their reading experience  

---

## 🚀 Technologies Used  

### Frontend & UI  
- **Next.js (with TypeScript)** – Server-side rendering, static generation, and better performance  
- **Tailwind CSS & DaisyUI** – Utility-first styling and pre-designed UI components  
- **ShadCN** – Modern and elegant UI components  

### Backend & Database  
- **MongoDB Atlas** – Cloud-based NoSQL database for storing users, books, and reviews  
- **Mongoose** – ORM for MongoDB to handle schemas and database interactions  
- **NextAuth.js (with JWT)** – Secure authentication (Google, GitHub, email, etc.)  
- **REST API / Next.js API Routes** – Backend logic to handle user reviews, authentication, and book data  

### Additional Services  
- **Resend** – Email API service for sending OTPs, account verification, and notifications  
- **Open Library API** – For fetching book data (titles, authors, covers, etc.)  
- **Vercel** – Hosting and deployment platform optimized for Next.js applications  
- **CRUD Operations** – Full Create, Read, Update, and Delete functionality for books, reviews, and user profiles  

---

## 🔗 Links  

- **Live Website**: [NovelNook](https://novel-nook-next.vercel.app/)  
- **GitHub Repository**: [NovelNook-Next](https://github.com/KrishnaKalra/NovelNook-Next)  
- **Video Demo**: [Watch Here](https://drive.google.com/file/d/1S7DUMsm8paxBOvtlMp18DC9k_bBnWa66/view?usp=sharing)  

---

## ⚠️ Important Note  

The free tier of the Resend API allows sending OTPs only to the owner of the account.  
Due to this limitation, I have implemented a workaround where you can enter any random numbers to verify your account, as you won’t be able to receive the actual OTP email.  
This ensures you can still experience the authentication flow while testing the platform.  

---

Happy reading and reviewing! 📚✨  
