const express = require("express");
const Utilizator = require("../models/utilizator");
const Email = require("../models/email");
const router = express.Router();
const nodemailer = require("nodemailer");
// Endpoint  utilizator.1: GET - toti utilizatorii

router.put("/cerere", async (req, res) => {
  if (!req.body.cod) {
    return res.send("Nu exista cod!");
  }
  if (!req.body.email) {
    return res.send("Nu exista email!");
  }
 
  req.body.isValid = false
 
 
  try {
    const email = await Email.create(req.body);
    return res.status(200).json(email);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.get("/getVerifica", async (req, res, next) => {
  try {
    const utilizatori = await Email.findAll();
    if (utilizatori.length > 0) {
      res.status(200).json(utilizatori);
    } else {
      res.status(404).send("Nu exista utilizatori!");
    }
  } catch (error) {
    next(error);
  }
});

router.put("/verifica", async (req, res, next) => {
  if (!req.body.cod) {
    return res.status(200).json({ mes: "Nu exista cod introdus" });
  }

 
 
  try {
     Email.findOne({
      where: {cod:req.body.cod},
    }).then((email)=>{
      if (email.isValid == false){
        return  res.status(200).json({ mes: "Link ul nu mai este valid" });
      }
       Utilizator.findOne({
        where: {email:email.email},
      }).then((utilizator)=>{
        if (utilizator)
        {
            utilizator.parola = req.body.parola
            utilizator.save().then((x)=>{
              email.isValid = false;
              email.save().then((r)=>{
                return res.status(200).json({ mes: "Parola a fost schimbata cu succes" });
              })
            })
        }
        else{
         return res.status(200).json({ mes: "Nu exista utilizatorul cu aceasta adresa de email" });
        }

      });

    });
   
  
   
 
    
   
    
   
  } catch (err) {
    return res.status(200).json({ mes: err.message });
  }
 



})
router.post("/mail", async (req, res, next) => {
  if (!req.body.cod) {
    return res.send("Nu exista cod!");
  }
  if (!req.body.email) {
    return res.send("Nu exista email!");
  }

 
 
  try {
    const email = await Email.create(req.body);
   
  } catch (err) {
    return res.send("Eroare creere");
  }
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'teo.gaitanaru@gmail.com',
      pass: 'sbtvcdjfrckfsqsz'
    }
  });
  
  var mailOptions = {
    from: 'teo.gaitanaru@gmail.com',
    to: req.body.email,
    subject: 'Resetare parola',
    text: req.body.mesaj
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.status(200).json({ mes: "Email invalid" });
    } else {
      res.status(200).json({ mes: "Mail-ul a fost trimis" });
    }
  });

})
router.get("/utilizatori", async (req, res, next) => {
  try {
    const utilizatori = await Utilizator.findAll();
    if (utilizatori.length > 0) {
      res.status(200).json(utilizatori);
    } else {
      res.status(404).send("Nu exista utilizatori!");
    }
  } catch (error) {
    next(error);
  }
});

// Endpoint 2: GET - cautare utilizator dupa id specificat
router.get("/utilizatori/:utilizatorId", async (req, res) => {
  const utilizator = await Utilizator.findOne({
    where: { id: req.params.utilizatorId },
  });
  if (utilizator) {
    return res.status(200).json(utilizator);
  } else {
  }
  return res
    .status(404)
    .json({ error: `Utilizatorul cu id ${req.params.utilizatorId} nu exista!` });
});

// Endpoint 3: GET - cautare utilizator dupa id specificat
router.get("/utilizatori/:email/:parola", async (req, res, next) => {
  try {
      const utilizator = await Utilizator.findOne({
          where: {email: req.params.email, parola:req.params.parola},
        });
        if (utilizator)
        {
          res.status(200).json(utilizator);
        }
  } catch (error) {
    next(error)
  
  }
});

router.get("/login/:email/:parola", async (req, res, next) => {
  try {
      const utilizator = await Utilizator.findOne({
          where: {email: req.params.email, parola:req.params.parola},
        });
        const utilizatorParola = await Utilizator.findOne({
          where: {email: req.params.email},
        });
        if (utilizator)
        {
          res.status(200).json(utilizator);
        } 
        else if (utilizatorParola){
          res.status(200).json({
            "response":"Parola nu corespunde!"
          });
        }
        else{
          res.status(200).json({
            "response":"Email-ul nu corespunde!"
          });
        }
  } catch (error) {
    next(error)
  }
});

//Endpoint 3: POST - adauga un utilizator nou
router.post("/addUtilizator", async (req, res) => {
  if (!req.body.nume) {
    return res.send("Nu exista nume!");
  }
  if (!req.body.prenume) {
    return res.send("Nu exista prenume!");
  }
  if (!req.body.parola) {
    return res.send("Nu exista parola!");
  }
  if (!req.body.email) {
    return res.send("Nu exista email!");
  }
 
  try {
    const utilizator = await Utilizator.create(req.body);
    return res.status(200).json(utilizator);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Endpoint 4: PUT - modifica campurile unui utilizator
router.put('/modifUtilizator/:utilizatorId', (req, res) => {
    Utilizator.findByPk(req.params.utilizatorId).then((result) => {
      if(result) {
          result.update(req.body).then((result) => {
              res.status(201).json(result);
          }).catch((err) => {
              console.log(err);
              resizeBy.status(500).send('Database error');
          })
      } else {
          res.status(404).send('Utilizatorul nu a fost gasit!');
      }
  }).catch((err) => {
      console.log(err);
      response.status(500).send('Database error');
  });

});

// Endpoint 5: DELETE - permite stergerea unui utilizator
router.delete("/deleteUtilizator/:utilizatorId", async (req, res) => {
    const utilizator = await Utilizator.findByPk(req.params.utilizatorId);
    if (utilizator) {
      return res.status(200).json(await utilizator.destroy());
    } else {
      return res
        .status(404)
        .json({ error: `Utilizatorul cu id ${req.params.utilizatorId} nu exista! ` });
    }
  });


router.get('/verificaEmail/:email', async (req, res) => {
  try {
    const email = await Utilizator.findOne({
        where: {email: req.params.email},
      });
    
      if (email)
      {
        return res.json({ msg:"Email-ul a fost deja folosit!" })
      
      } 
      else{
        return res.json({ msg:"Email-ul nu corespunde" })
      }
} catch (error) {
  next(error)
}
})

module.exports = router;
