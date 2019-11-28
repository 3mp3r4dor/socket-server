import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    
    res.json({
        ok: true,
        mensaje: 'todo está bien'
    });
});

router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload );

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const id = req.params.id;
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.in( id ).emit('mensaje-privado', payload );

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

router.get('/usuarios', (req: Request, res: Response) => {

    const server = Server.instance;

    server.io.clients( ( err: any, clientes: string[] ) => {

        if( err ) {
            return res.send({
                ok: false,
                err
            });
        }

        res.send({
            ok: true,
            clientes
        });
    });
});

// Obtener usuarios y sus nombres
router.get( '/usuarios/detalle', ( req: Request, resp: Response ) => {

    
    resp.send({ 
        ok: true,    
        clientes: usuariosConectados.getLista()
    });
});

export default router;