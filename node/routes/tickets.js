const express = require('express');
const mysql = require('mysql');
const Joi = require('joi');

const pool = mysql.createPool({
    connectionLimit: 100, 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kupovinakarataskript'
});

const route = express.Router();

route.use(express.json());

route.get('/tickets', (req, res) => {
    pool.query('select * from tickets', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});

route.get('/tickets/:id', (req, res) => {
    let query = 'select * from tickets where idUser=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
});

route.post('/tickets', (req, res) => {
    let query = "insert into tickets (price, idUser, idMatch) values (?, ?, ?, ?)";
    let formated = mysql.format(query, [req.body.price, req.body.idUser, req.body.idMatch]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            query = 'select * from tickets where idTicket=?';
            formated = mysql.format(query, [response.insertId]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(rows[0]);
            });
        }
    });
});

route.put('/tickets/:id', (req, res) => {
    let query = "update tickets set price=?, idUser=?, idMatch=? where idTicket=?";
    let formated = mysql.format(query, [req.body.price, req.body.idUser, req.body.idMatch, req.params.id]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            query = 'select * from tickets where idTicket=?';
            formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(rows[0]);
            });
        }
    });
});

route.delete('/tickets/:id', (req, res) => {
    let query = 'select * from tickets where idTicket=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let match = rows[0];

            let query = 'delete from tickets where idTicket=?';
            let formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(match);
            });
        }
    });
});

module.exports = route;