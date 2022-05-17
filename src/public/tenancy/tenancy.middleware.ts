// import { BadRequestException } from '@nestjs/common'
// import { NextFunction, Request } from 'express'
// import { User } from 'src/tenanted/user/user.entity'
// import { Connection, createConnection, getConnection } from 'typeorm'
// import { Tenancy } from './tenancy.entity'

// export async function tenancyMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<any> {
//   // const tenancyHost: string = req.params['0'].split('/')[0]
//   const tenancyHost: string = this.getTenancyHost(req.hostname)
//   console.log('tenancyHost: ' + tenancyHost)
//   if (tenancyHost === null) {
//     throw new BadRequestException('Invalid Hostname, more than one subdomain')
//   }

//   if (tenancyHost) {
//     const tenancy: Tenancy = await this.tenancyService.findOne(tenancyHost)

//     if (!tenancy) {
//       throw new BadRequestException(
//         'Database Connection Error',
//         'This tenancy does not exists',
//       )
//     }

//     try {
//       getConnection(tenancy.name)
//       console.log('connection exists')
//       next()
//     } catch (e) {
//       await this.connection.query(
//         `CREATE DATABASE IF NOT EXISTS ${tenancy.name}`,
//       )

//       const createdConnection: Connection = await createConnection({
//         name: tenancy.name,
//         type: 'mysql',
//         host: this.configService.get('DB_HOST'),
//         port: +this.configService.get('DB_PORT'),
//         username: this.configService.get('DB_USER'),
//         password: this.configService.get('DB_PASSWORD'),
//         database: tenancy.name,
//         entities: [User],
//         // entities: [__dirname + '/**/*.entity{.ts,.js}'],
//         synchronize: true,
//       })

//       if (createdConnection) {
//         next()
//       } else {
//         throw new BadRequestException(
//           'Database Connection Error',
//           'There is a Error with the Database!',
//         )
//       }
//     }
//   } else {
//     next()
//   }
// }
