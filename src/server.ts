import Hapi from '@hapi/hapi'
import prismaPlugin from './plugins/prisma';
import categoryPlugin from './plugins/category';

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    })

    await server.register([prismaPlugin, categoryPlugin]);

    await server.start()
    console.log(`Server running on ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1)
})

init()