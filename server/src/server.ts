import express, { request } from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client'
import { convertMinutesToHours } from './utils/convert-minutes-string-hours';
import { convertHoursToMinutes } from './utils/convert-hours-string-minutes';
import { convertRatingStars, arrayParaObjeto } from './utils/convert-rating-stars';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();


//criar jogo
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

app.post('/games', async(request, response) => {
    const body = request.body;

    const game = await prisma.game.create({
        data:{
            title: body.title,
            imageUrl: body.imageUrl,
        }
    })
    return response.status(201).json(game);
})

app.post('/group/post/create', async(request, response) => {
    const body = request.body;

    const post = await prisma.post.create({
        data:{
            text: body.text,
            ownerId: parseInt(body.ownerId),
            groupId: parseInt(body.groupId)
        }
    })
    return response.status(201).json(post);
})

app.post('/player/create', async(request, response) => {
    const body = request.body;
    const player = await prisma.player.upsert({
        where: { username : body.username },
        update: {},
        create: {
            name : body.name,
            username : body.username,
            password : body.password
        },
      })
    
    return response.status(201).json(player);
})

app.post('/player/logar', async(request, response) => {
    const body = request.body;
    const player = await prisma.player.findMany({
        select:{
            id:true,
            name: true,
            username: true,
        },
        where:{
            AND: [
                {
                    username: {
                    equals: body.username,
                },
                },
                {
                    password: {
                    equals: body.password,
                },
                },
          ],
        },
        
    })


    
    if(player.length == 0)
        return response.status(403).json(player);
    else 
        return response.status(201).json(player);
})

//criar grupo
app.post('/games/:id/groups', async(request, response) => {
    const idGame = parseInt(request.params.id);
    const body = request.body;

    const group = await prisma.group.create({
        data:{
            gameId: idGame,
            name: body.name,
            ownerId: parseInt(body.ownerId),
            discord: body.discord,
            hourInit: convertHoursToMinutes(body.hourInit),
            hourEnd: convertHoursToMinutes(body.hourEnd),
            gameDays: body.gameDays.join(','),
            useMicrophone:  body.useMicrophone,
            ratingStars: "0,0,0,0,0",
            players: body.ownerId.toString(),
            maxPlayers: parseInt(body.maxPlayers)
        }
    })


    return response.status(201).json(group);
})


//listar grupos para jogo especifico
app.get('/groups/list', async (request, response) => {

    const  groups = await prisma.group.findMany({
        select:{
            id: true,
            name: true,
            gameDays: true,
            useMicrophone: true,
            hourInit: true,
            hourEnd: true,
            game: {
                select:{
                    title: true,
                    imageUrl: true,
                }
            },
            owner: {
                select:{
                    name: true,
                    username: true,
                }
            },
            ratingStars: true,
            players: true,
            maxPlayers: true
        },
        orderBy:{
            createdDate: 'desc',
        }
    })
    return response.json(groups.map(group => {
        let ratingStarsArray = group.ratingStars.split(',');
        let playersArray = group.players.split(',');
        let totalRating = ratingStarsArray.reduce((accumulator,value) => accumulator + parseInt(value),0);
        
        let mediaRating = convertRatingStars(arrayParaObjeto(ratingStarsArray));

        return {
            ...group,
            gameDays: group.gameDays.split(','),
            hourInit:convertMinutesToHours(group.hourInit),
            hourEnd: convertMinutesToHours(group.hourEnd),
            ratingStars: ratingStarsArray,
            totalRatingStars: totalRating,
            mediaRatingStars: mediaRating,
            totalPlayersOnline: playersArray.length
        }
    }))
});

//listar grupos para jogo especifico
app.get('/groups/filtro/game/:id', async (request, response) => {
    const idGame = parseInt(request.params.id);

    const  groups = await prisma.group.findMany({
        select:{
            id: true,
            name: true,
            gameDays: true,
            useMicrophone: true,
            hourInit: true,
            hourEnd: true,
            game: {
                select:{
                    title: true,
                    imageUrl: true,
                }
            },
            owner: {
                select:{
                    name: true,
                    username: true,
                }
            },
            ratingStars: true,
            players: true,
            maxPlayers: true
        },
        where: {
            gameId: idGame,
        },
        orderBy:{
            createdDate: 'desc',
        }
    })
    return response.json(groups.map(group => {
        let ratingStarsArray = group.ratingStars.split(',');
        let playersArray = group.players.split(',');
        let totalRating = ratingStarsArray.reduce((accumulator,value) => accumulator + parseInt(value),0);
        
        let mediaRating = convertRatingStars(arrayParaObjeto(ratingStarsArray));

        return {
            ...group,
            gameDays: group.gameDays.split(','),
            hourInit:convertMinutesToHours(group.hourInit),
            hourEnd: convertMinutesToHours(group.hourEnd),
            ratingStars: ratingStarsArray,
            totalRatingStars: totalRating,
            mediaRatingStars: mediaRating,
            totalPlayersOnline: playersArray.length
        }
    }))
});
//listar grupos para jogo especifico
app.get('/games/:id/groups', async (request, response) => {
    const idGame = parseInt(request.params.id);

    const  groups = await prisma.group.findMany({
        select:{
            id: true,
            name: true,
            gameDays: true,
            useMicrophone: true,
            hourInit: true,
            hourEnd: true,
            game: {
                select:{
                    title: true,
                    imageUrl: true,
                }
            },
            ratingStars: true,
            players: true,
            maxPlayers: true
        },
        where:{ 
            gameId: idGame,
        },
        orderBy:{
            createdDate: 'desc',
        }
    })
    return response.json(groups.map(group => {
        let ratingStarsArray = group.ratingStars.split(',');
        let playersArray = group.players.split(',');
        let totalRating = ratingStarsArray.reduce((accumulator,value) => accumulator + parseInt(value),0);
        
        let mediaRating = convertRatingStars(arrayParaObjeto(ratingStarsArray));

        return {
            ...group,
            gameDays: group.gameDays.split(','),
            hourInit:convertMinutesToHours(group.hourInit),
            hourEnd: convertMinutesToHours(group.hourEnd),
            ratingStars: ratingStarsArray,
            totalRatingStars: totalRating,
            mediaRatingStars: mediaRating,
            totalPlayersOnline: playersArray.length
        }
    }))
});
app.get('/games/allgroups', async (request, response) => {
    const  groups = await prisma.group.findMany({
        select:{
            id: true,
            name: true,
            gameDays: true,
            useMicrophone: true,
            hourInit: true,
            hourEnd: true,
            ratingStars: true,
            players: true,
            maxPlayers: true
        },
        orderBy:{
            createdDate: 'desc',
        }
    })
    return response.json(groups.map(group => {

        let ratingStarsArray = group.ratingStars.split(',');
        let playersArray = group.players.split(',');
        let totalRating = ratingStarsArray.reduce((accumulator,value) => accumulator + parseInt(value),0);
        
        let mediaRating = convertRatingStars(arrayParaObjeto(ratingStarsArray));

        return {
            ...group,
            gameDays: group.gameDays.split(','),
            hourInit:convertMinutesToHours(group.hourInit),
            hourEnd: convertMinutesToHours(group.hourEnd),
            ratingStars: ratingStarsArray,
            totalRatingStars: totalRating,
            mediaRatingStars: mediaRating,
            totalPlayersOnline: playersArray.length
        }
    }))
});
  
//listar discord from user
app.get('/groups/:id/discord', async(request, response) => {
    const groupId = parseInt(request.params.id);
    
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