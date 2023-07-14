import express, { request } from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client'
import { convertMinutesToHours } from './utils/convert-minutes-string-hours';
import { convertHoursToMinutes } from './utils/convert-hours-string-minutes';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();


//listar jogos
app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        orderBy: {
            title: 'asc',
          },
          include:{
            _count:{
                select: {
                    groups: true,
                }
            }
          }
    })

    return response.json(games);
})

//criar grupo
app.post('/games/:id/groups', async(request, response) => {
    const gameId = request.params.id;
    const body = request.body;

    const group = await prisma.group.create({
        data:{
            gameId,
            name: body.name,
            discord: body.discord,
            hourInit: convertHoursToMinutes(body.hourInit),
            hourEnd: convertHoursToMinutes(body.hourEnd),
            gameDays: body.gameDays.join(','),
            useMicrophone:  body.useMicrophone,
        }
    })


    return response.status(201).json(group);
})

//listar grupos para jogo especifico
app.get('/games/:id/groups', async (request, response) => {
    const gameId = request.params.id;

    const  groups = await prisma.group.findMany({
        select:{
            id: true,
            name: true,
            gameDays: true,
            useMicrophone: true,
            hourInit: true,
            hourEnd: true,
        },
        where:{ 
            gameId,
        },
        orderBy:{
            createdDate: 'desc',
        }
    })
    return response.json(groups.map(group => {
        return {
            ...group,
            gameDays: group.gameDays.split(','),
            hourInit:convertMinutesToHours(group.hourInit),
            hourEnd: convertMinutesToHours(group.hourEnd),
        }
    }))
});
  
//listar discord from user
app.get('/groups/:id/discord', async(request, response) => {
    const groupId = request.params.id;
    
    const group = await prisma.group.findUniqueOrThrow({
        select:{
            discord:true,
        },
        where:{
            id: groupId,
        }
    })

    return response.json({
        discord: group.discord,
    });
   });


app.listen(3333);