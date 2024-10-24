import express from 'express';
import { Virhe } from '../errors/virhekasittelija';
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

const apiAjeluRouter : express.Router = express.Router();

apiAjeluRouter.use(express.json());

let uusipaiva = new Date().toLocaleDateString('de-DE');

apiAjeluRouter.delete("/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

     if (await prisma.ajelu.count({
           where : {
                id : Number(req.params.id)
            }
        }))  {
        try {

            res.json(await prisma.ajelu.delete({
                where : {
                    id : Number(req.params.id)
                }
            }));

        } catch (e : any) {
            next(new Virhe())
        }
    } else {
        next(new Virhe(404, "Virheellinen id"));
    }

});


apiAjeluRouter.put("/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    if (await prisma.ajelu.count({
        where : {
            id : Number(req.params.id)
        }
        })) {
        if (req.body.reitti.length > 0 && req.body.kilometrit > 0) {

            try {

                await prisma.ajelu.update({
                    where : {
                        id : Number(req.params.id)
                    },
                    data : {
                        reitti : req.body.reitti,
                        kilometrit : req.body.kilometrit,
                        paiva : req.body.paiva
                    }
                });
        
                res.json(await prisma.ajelu.findUnique({
                    where : {
                        id : Number(req.params.id)
                    }
                }));
        
            } catch (e : any) {
                next(new Virhe())
            }

        } else {
            next(new Virhe(400, "Virheellinen pyynnön body"));
        }
    } else {
        next(new Virhe(404, "Virheellinen id"));
    }

});

apiAjeluRouter.post("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
 
      if (req.body.reitti.length > 0 && req.body.kilometrit > 0 && req.body.kuskiID > 0 && req.body.paiva === "") {

        try {

            res.json(await prisma.ajelu.create({
                data : {
                    reitti : req.body.reitti,
                    kilometrit : req.body.kilometrit,
                    kuskiID : req.body.kuskiID,
                    paiva : String(uusipaiva)
                }
            }));
    
        } catch (e : any) {
            next(new Virhe())
        }

    } else if (req.body.reitti.length > 0 && req.body.kilometrit > 0 && req.body.kuskiID > 0) {

        try {

            res.json(await prisma.ajelu.create({
                data : {
                    reitti : req.body.reitti,
                    kilometrit : req.body.kilometrit,
                    kuskiID : req.body.kuskiID,
                    paiva : req.body.paiva
                }
            }));
    
        } catch (e : any) {
            next(new Virhe())
        }
    } 
    else {
        next(new Virhe(400, "Virheellinen pyynnön body"));
    } 

});

apiAjeluRouter.get("/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

     try {

        if (await prisma.ajelu.count({
            where : {
                id : Number(req.params.id)
            }
        }) === 1) {
            res.json(await prisma.ajelu.findUnique({
                where : {
                    id : Number(req.params.id)
                }
            }))
        } else {
            next(new Virhe(400, "Virheelinen id"));
        }
        
    } catch (e: any) {
        next(new Virhe());
    }
    

});

apiAjeluRouter.get("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    try {
        res.json(await prisma.ajelu.findMany());
    } catch (e : any) {
        next(new Virhe());
    }

});

export default apiAjeluRouter;
