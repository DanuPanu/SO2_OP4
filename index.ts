import express from 'express';
import path from 'path';
import virhekasittelija from './errors/virhekasittelija';
import apiAjeluRouter from './routes/apiAjelu';

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3104;

app.use(express.static(path.resolve(__dirname, "public")));

app.use("/api/ajelut", apiAjeluRouter);

app.use(virhekasittelija);

app.use((req : express.Request, res : express.Response, next : express.NextFunction) => {

    if (!res.headersSent) {
        res.status(404).json({ viesti : "Virheellinen reitti"});
    }

    next();
});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi porttiin : ${portti}`);    

});