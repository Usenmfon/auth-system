# NODEJS AUTHENTICATION SYSTEM

## To install packages
use: _npm install_

## Protected Routes
Roles are being assigned to users by number;
- _user : role 0_ (default)
- _staff: role  >= 1_ (can access user, staff routes)
- _manager: role >= 3_ (can access user, staff, manager routes)
- _admin: role >= 5_ (can access user, staff, manager, admin routes)

### Register a new user
![register-user](https://user-images.githubusercontent.com/62027724/182945315-5ab2930e-9355-4d5c-8c16-41dd7e5dc065.JPG)

### Login as a user
![user-login](https://user-images.githubusercontent.com/62027724/182945529-efd9a516-6efb-4988-b164-3d5ebf32abfe.JPG)

### User Logout
![user-logout](https://user-images.githubusercontent.com/62027724/182945882-f73cceba-07fd-42c8-8c2f-791bab6934a3.JPG)

### Access denied after logout
![user-logout-result](https://user-images.githubusercontent.com/62027724/182946044-47b94c18-996f-4cd2-a1fe-454bf862e604.JPG)

### User role (All users can access this route)
![user-role](https://user-images.githubusercontent.com/62027724/182947642-5ae8b21b-25c4-4020-8fcb-03478d1bbd11.JPG)

### Staff role (only staff, manager, admin can access)
![staff-role-granted](https://user-images.githubusercontent.com/62027724/182947900-b0b6616c-6859-47aa-a174-008f32438ebc.JPG)

### Manager role (only manager, and admin can access)
![manager-role-granted](https://user-images.githubusercontent.com/62027724/182948086-334dfb4b-abb6-42fb-85a8-6bffb01a9605.JPG)

### Admin role (only admin can access)
![admin-role-granted](https://user-images.githubusercontent.com/62027724/182948215-31f0e477-c8f1-4bca-ab84-2b81de9181d4.JPG)

### Access denied for authorized user
![staff-permission-denied](https://user-images.githubusercontent.com/62027724/182948673-e301bf24-bdbb-4181-bd1a-5f65254fdcd2.JPG)

### Forgot password
![forgot-password](https://user-images.githubusercontent.com/62027724/182948824-f8235fad-a6f0-4557-b982-0961ba7cae6e.JPG)

### Email sent with OTP
![otp-mail](https://user-images.githubusercontent.com/62027724/182948910-128ef8ce-e15e-47fc-81b3-fe5d5b01e5e6.JPG)

### New Passord
![reset-password](https://user-images.githubusercontent.com/62027724/182949047-6f920a2a-5276-40d1-95b3-d544b9df7f49.JPG)
