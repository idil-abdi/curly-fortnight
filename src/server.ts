import Hapi from '@hapi/hapi';
import { todoRoutes } from './routes/todoRoutes.js';

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(todoRoutes)

    await server.start();
    console.log("Server running on %s", server.info.uri);
    
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();