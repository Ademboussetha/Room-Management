
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const url = require('url');
global.fetch = require("node-fetch");


// const cheerio=require('cheerio');

var sess;
var title;


exports.home = function (req, res) {
    res.render('home');

}
exports.log = function (req, res) {
    res.render('login');
    const a = req.query.type;
    // console.log(a)
    // req.session.who=a;
    // req.session.save();
    // console.log (req.session);
    //console.log(a);
    global.a = a;
}
exports.profil = function (req, res) {
    // console.log(req.session);
    // db.query("SELECT * from etudiant",function(error,results,fields){
    //     // console.log(results);
    // });
    if (!req.session.username) {
        res.render('login');
    }
    else if (req.session.who == "admin") {
        // console.log(req.query.niveau);
        db.query("SELECT enseignant.nom_ens, salle.nom_salle, module.nom_module,etudier.validation, etudier.type,etudier.heure, etudier.date_etudier FROM (((etudier INNER JOIN Enseignant ON etudier.num_ens= enseignant.num_ens) INNER JOIN Salle ON etudier.num_salle = salle.num_salle) INNER JOIN Module ON etudier.num_module = module.num_module) WHERE  etudier.num_niveau=?", [req.query.niveau], function (error, results, fields) {
            if (error) {
                throw error
            }
            else {

                data = JSON.parse(JSON.stringify(results));
                // console.log(req.session.niveau)
                // res.render({data});
                console.log(data)
                res.render('planning', {
                    title: req.session.who,
                    seance: data,
                    nv: req.session.niveau,
                    who: req.session.who
                });
                // res.json({
                //     status:'success',
                //     heure:data[0].heure,
                //     date:data[0].date_etudier
                //     });


            }
        });
    }
    else {
        // console.log(req.query.niveau);
        db.query("SELECT enseignant.nom_ens, salle.nom_salle, module.nom_module, etudier.validation,etudier.type,etudier.heure, etudier.date_etudier FROM (((etudier INNER JOIN Enseignant ON etudier.num_ens= enseignant.num_ens) INNER JOIN Salle ON etudier.num_salle = salle.num_salle) INNER JOIN Module ON etudier.num_module = module.num_module) WHERE  etudier.num_niveau=?", [req.query.niveau], function (error, results, fields) {
            if (error) {
                throw error
            }
            else {
                data = JSON.parse(JSON.stringify(results));
                console.log(data);
                // res.render({data});

                res.render('planning', { title: req.session.who, seance: data, who: req.session.who });
                // res.json({
                //     status:'success',
                //     heure:data[0].heure,
                //     date:data[0].date_etudier
                //     });

            }
        });
    }
}
exports.attente = function (req, res) {
    if (req.session.username) {
        db.query('SELECT * FROM etudiant where validation=?', "enattente", function (error, results, fields) {
            // console.log(results)
            var obj = JSON.parse(JSON.stringify(results));

            res.render('attente', { data: results });
        });
    }
    else {
        res.render('index')
    }
}

exports.logi = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        /*console.log(req.url);
        var param = req.url.searchParams;
        console.log(param);
        //const type = param.get('type');
        req.url= req.url+`?type=a`
        console.log (req.url)
        const a=req.query.type;
        console.log(type);*/
        // console.log(a);
        if (a == "student") {
            console.log("hi")
            db.query('SELECT * FROM etudiant where username= ? AND password= ? ', [username, password], function (error, results, fields) {

                if (results.length > 0) {
                    var obj = JSON.parse(JSON.stringify(results));
                    req.session.who = "student";
                    // console.log(results);
                    // var profile = obj[0].prenom_etudiant;
                    req.session.username = obj[0].username;
                    req.session.nom = obj[0].nom_etudiant;
                    req.session.prenom = obj[0].prenom_etudiant;
                    req.session.niveau = obj[0].num_niveau;
                    req.session.num = obj[0].number;
                    req.session.address = obj[0].address;
                    var obj = JSON.parse(JSON.stringify(results));
                    var profile = obj[0].nom_etudiant;
                    res.redirect('/profil?id=' + req.session.who + '&niveau=' + req.session.niveau);
                }
                else {
                    res.render('login', {
                        error: "failed username or password"
                    });
                }
                res.end();
            });
        }
        else if (a == "teacher") {
            db.query('SELECT * FROM enseignant where username=? AND password= ?', [username, password], function (error, results, fields) {
                if (results.length > 0) {
                    var obj = JSON.parse(JSON.stringify(results));
                    req.session.username = obj[0].username;
                    req.session.nom = obj[0].nom_etudiant;
                    req.session.prenom = obj[0].prenom_etudiant;
                    req.session.num = obj[0].number;
                    req.session.address = obj[0].address;
                    sess = req.session;
                    req.session.who = "teacher";
                    var obj = JSON.parse(JSON.stringify(results));
                    var profile = obj[0].nom_etudiant;
                    console.log(req.session.username)
                    res.redirect('/profil?id=' + req.session.who + '&niveau=1');
                }
                else {
                    res.render('login', {
                        error: "failed username or password"
                    });
                }
                res.end();
            });
        }
        else if (a == "admin") {
            db.query('SELECT * FROM admin where username= ? AND password= ? ', [username, password], function (error, results, fields) {
                if (results.length > 0) {
                    var obj = JSON.parse(JSON.stringify(results));
                    req.session.username = obj[0].username;
                    req.session.nom = obj[0].nom_etudiant;
                    req.session.prenom = obj[0].prenom_etudiant;
                    sess = req.session;
                    global.sess = sess;
                    var obj = JSON.parse(JSON.stringify(results));
                    var profile = obj[0].nom_etudiant;
                    req.session.who = obj[0].type;
                    res.redirect('/profil?id=admin&niveau=1');
                }

                else {
                    res.render('login', {
                        error: "failed username or password"
                    });
                }
                res.end();
            });
        }
        else {
            res.render('error');
        }

    }
    else {
        res.render('index');
        res.end();

    }
}

exports.workspace = function (req, res) {
    res.render('workspace', {
        title: req.session.who,
        nom: req.session.nom,
        prenom: req.session.prenom,
        niveau: req.session.niveau,
        email: req.session.username,
        num: req.session.num,
        adr: req.session.address
    });
}
exports.logout = function (req, res) {
    var user = req.session.username;
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Session of " + user + " deleted")
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
}

exports.signup = function (req, res) {
    res.render('signup')
}
exports.signuped = function (req, res) {
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var num = req.body.num;
    var username = req.body.username;
    var password = req.body.password;
    var address = req.body.address;
    var num_niveau = req.body.niveau;
    var number = req.body.number;
    var validation = "enattente";
    if (nom && prenom && num && username && password) {
        db.query("INSERT into etudiant values('" + num + "','" + nom + "','" + prenom + "','" + address + "','" + number + "','" + num_niveau + "','" + username + "','" + password + "','" + validation + "')", (err, rows, fields) => {
            if (err) {
                throw err;
                return;
            }
            else {
                res.redirect('/waiting');
            }
        });
    }
    else {
        res.render('signup', {
            error: "missing one of the fields",
        });
    }
}
exports.wait = function (req, res) {
    res.render('waiting')
}
exports.submitseance = function (req, res) {
    var rIndex = req.body.rIndex;
    var cIndex = req.body.cIndex;
    var nom_module = req.body.nom_module;
    var nom_salle = req.body.nom_salle;
    var nom_ens = req.body.nom_ens;
    var niveau = req.body.niveau;
    var who = req.session.who;
    var type = req.body.type;
    if (rIndex && cIndex && nom_module && nom_salle && nom_ens) {
        if ((type == "tp") && (who == "responsable")) {
            var validation = "accepter";
            db.query("INSERT IGNORE INTO etudier VALUES ('" + niveau + "',(SELECT num_salle FROM salle WHERE nom_salle ='" + nom_salle + "'),(SELECT num_module FROM module WHERE nom_module = '" + nom_module + "'),(SELECT num_ens FROM enseignant WHERE nom_ens = '" + nom_ens + "'),'" + cIndex + "','" + rIndex + "','" + validation + "','" + type + "')", (error, results, fields) => {
                // db.query("INSERT INTO etudier VALUES ('"+niveau+"',(SELECT num_salle FROM salle WHERE nom_salle = '"+nom_salle+"'),(SELECT num_ensigner FROM enseigner WHERE num_module=(SELECT num_module FROM module WHERE nom_module = '"+nom_module+"') AND num_ens=(SELECT num_ens FROM enseignant WHERE nom_ens='"+nom_ens+"') ),'"+cIndex+"','"+rIndex+"')", (error, results, fields) => {
                // db.query("INSERT into etudier values ('" + niveau + "','" + num + "','" + num_ens + "','" + cIndex + "','" + rIndex + "')", (error, results, fields) => {
                // console.log(results)
                if (error) {
                    throw error;
                }
                else {
                    console.log("séance insérée")
                }
            });
        }
        else if (((type == "td") || (type == "cours")) && (who == "admin")) {
            var validation = "valider";
            db.query("INSERT IGNORE INTO etudier VALUES ('" + niveau + "',(SELECT num_salle FROM salle WHERE nom_salle ='" + nom_salle + "'),(SELECT num_module FROM module WHERE nom_module = '" + nom_module + "'),(SELECT num_ens FROM enseignant WHERE nom_ens = '" + nom_ens + "'),'" + cIndex + "','" + rIndex + "','" + validation + "','" + type + "')", (error, results, fields) => {
                // db.query("INSERT INTO etudier VALUES ('"+niveau+"',(SELECT num_salle FROM salle WHERE nom_salle = '"+nom_salle+"'),(SELECT num_ensigner FROM enseigner WHERE num_module=(SELECT num_module FROM module WHERE nom_module = '"+nom_module+"') AND num_ens=(SELECT num_ens FROM enseignant WHERE nom_ens='"+nom_ens+"') ),'"+cIndex+"','"+rIndex+"')", (error, results, fields) => {
                // db.query("INSERT into etudier values ('" + niveau + "','" + num + "','" + num_ens + "','" + cIndex + "','" + rIndex + "')", (error, results, fields) => {
                // console.log(results)
                if (error) {
                    throw error;
                }
                else {
                    console.log("séance insérée")
                }
            });
        }
        else if (who == "teacher") {
            var validation = "enattente"
            db.query("INSERT IGNORE INTO etudier VALUES ('" + niveau + "',(SELECT num_salle FROM salle WHERE nom_salle ='" + nom_salle + "'),(SELECT num_module FROM module WHERE nom_module = '" + nom_module + "'),(SELECT num_ens FROM enseignant WHERE nom_ens = '" + nom_ens + "'),'" + cIndex + "','" + rIndex + "','" + validation + "','" + type + "')", (error, results, fields) => {
                // db.query("INSERT INTO etudier VALUES ('"+niveau+"',(SELECT num_salle FROM salle WHERE nom_salle = '"+nom_salle+"'),(SELECT num_ensigner FROM enseigner WHERE num_module=(SELECT num_module FROM module WHERE nom_module = '"+nom_module+"') AND num_ens=(SELECT num_ens FROM enseignant WHERE nom_ens='"+nom_ens+"') ),'"+cIndex+"','"+rIndex+"')", (error, results, fields) => {
                // db.query("INSERT into etudier values ('" + niveau + "','" + num + "','" + num_ens + "','" + cIndex + "','" + rIndex + "')", (error, results, fields) => {
                // console.log(results)
                if (error) {
                    throw error;
                }
                else {
                    console.log("séance insérée")
                }
            });
        }
        else {
            res.redirect('planning?id=responsable');
            console.log("u have no rights to this")
        }

    }
    else {
        console.log("missing 1 argument")
    }


}
exports.submitattente = function (req, res) {
    res.end();
}
exports.validerseance = function (req, res) {
    db.query("UPDATE etudier SET validation = 'valider' WHERE num_niveau = ? and date_etudier = ? and heure = ?", [req.body.niveau, req.body.cIndex, req.body.rIndex], function (err, result) {
        if (err) throw err;
        console.log(" record(s) updated");
    });
    res.end();

}