import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            username: 'admin',
            email: 'erin9901@gmail.com',
            password: bcrypt.hashSync('1!2@3#4$5%'),
            isAdmin: true,
        },
        {
            username: 'john',
            email: 'user@email.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
    ]
};

export default data;