import server from './server';
import colors from 'colors';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(colors.cyan.bold('Server is running on http://localhost:' + port) );
});

