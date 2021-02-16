const express = require('express');
const mysql = require('mysql');
const Joi = require('joi');
var jwt = require('jsonwebtoken');

const pool = mysql.createPool({
    connectionLimit: 100, 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kupovinakarataskript'
});

const matchesSchema = Joi.object().keys({
    team1: Joi.string().max(30).required(),
    team2: Joi.string().max(30).required(),
    league: Joi.string().max(30).required()
});

const route = express.Router();

route.use(express.json());

route.get('/matches', (req, res) => {
    pool.query('select * from matches', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});

route.get('/matches/:id', (req, res) => {
    let query = 'select * from matches where idMatch=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
});

route.get('/matches/:team', (req, res) => {
    let query = 'select * from matches where team1=?';
    let formated = mysql.format(query, [req.params.team]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});

route.post('/matches', (req, res) => {
    let { error } = matchesSchema.validate({team1: req.body.team1, team2: req.body.team2, league: req.body.league});

    if (error)
        res.status(400).send(error.details[0].message);
    else {
        let query = "insert into matches (team1, team2, league) values (?, ?, ?, ?)";
        let formated = mysql.format(query, [req.body.team1, req.body.team2, req.body.league]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from matches where idMatch=?';
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }
});

route.put('/matches/:id', (req, res) => {
    let { error } = matchSchema.validate({team1: req.body.team1, team2: req.body.team2, league: req.body.league});

    if (error)
        res.status(400).send(error.details[0].message);
    else {
        let query = "update matches set team1=?, team2=?, league=? where id=?";
        let formated = mysql.format(query, [req.body.team1, req.body.team2, req.body.league, req.params.id]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from matches where idMatch=?';
                formated = mysql.format(query, [req.params.id]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }
});

route.delete('/matches/:id', (req, res) => {
    let query = 'select * from matches where idMatch=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let match = rows[0];

            let query = 'delete from matches where idMatch=?';
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

