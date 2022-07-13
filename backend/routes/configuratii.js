const { Console } = require("console");
const express = require("express");

const { spawn } = require("child_process");
// const  db = require("../sqlite/Database.db")
const Consumator = require("../models/consumator");
const Utilizator = require("../models/utilizator");
const Configuratie = require("../models/configuratie");
const sequelize = require("../sequelize");
const router = express.Router();

// Endpoint  1: GET - afiseaza toate configuratiile de consum
router.get("/configuratii", async (req, res, next) => {
  try {
    const configuratii = await Configuratie.findAll();
    if (configuratii.length > 0) {
      res.status(200).json(configuratii);
    } else {
      res.status(404).send("Nu exista configuratii!");
    }
  } catch (error) {
    next(error);
  }
});

// Calculeaza totalul pe configuratiile unui utilizator
router.get("/configuratii/total/:utilizatorId", async (req, res, next) => {
  try {
    Utilizator.findByPk(req.params.utilizatorId, {
      include: [Configuratie],
    }).then((utilizator) =>
      Configuratie.findAll({
        where: {
          utilizatorId: utilizator.id,
        },
        include: [Consumator],
      }).then((configuratii) =>
       {
        var total = 0;
        configuratii.forEach((conf)=>
        {
           conf.consumators.forEach((rez)=>{
            total = total + conf.pretEnergie*rez.consum * rez.frecventaUtilizare;
           })
        })

        res.status(200).json({ total: total });


        }))
      

  } catch (err) {
    next(err);
  }
});

router.get("/configuratii/perconfiguratie/:utilizatorId/:configuratieId", async (req, res, next) => {
    try {
      Utilizator.findByPk(req.params.utilizatorId, {
        include: [Configuratie],}).then((utilizator) =>
        Configuratie.findAll({
          where: {
            utilizatorId: utilizator.id,
          },
          include: [Consumator],}).then((configuratii) =>
          Consumator.findAll({
            where: {
              configuratieId: req.params.configuratieId,
            },
          }).then((final) => {
            if (final) {
              let initialValue = 0;
              let total = final.reduce( (previousValue, currentValue) => previousValue + currentValue.consum * currentValue.frecventaUtilizare,
                initialValue
              );
              res.status(200).json({ total: total });
            } else {
              res.status(404).json({
                error: `Configuratia cu id ${req.params.configuratieId} nu exista! `,
              });
            }
          })
        )
      );
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/configuratii/addConsumator/:idConfiguratie",
  async (req, res, next) => {
    if (!req.body.denumire) {
      return res.send("Nu exista denumire camera!");
    }
    console.log(req.body);

    try {
      const configuratie = await Configuratie.findByPk(
        req.params.idConfiguratie
      );

      if (configuratie) {
        const consumator = new Consumator(req.body);
        consumator.configuratieId = configuratie.id;
        await consumator.save();
        res.status(200).json(consumator);
      } else {
        res.status(404).json({ message: "Configuratia nu exista" });
      }
    } catch (err) {
      next(error);
    }
  }
);

// Endpoint 2: GET - afisam configuratiile unui anumit utilizator
router.get("/configuratii/:utilizatorId", async (req, res, next) => {
  try {
    const utilizator = await await Utilizator.findByPk(
      req.params.utilizatorId,
      {
        include: [Configuratie],
      }
    );
    console.log(utilizator);
    if (utilizator) {
      res.status(200).json(utilizator);
    } else {
      res.status(404).json({
        error: `Utilizatorul cu id ${req.params.utilizatorId} nu exista! `,
      });
    }
  } catch (err) {
    next(err);
  }
});
router.get(
  "/configuratii/:utilizatorId/:idConfiguratie",
  async (req, res, next) => {
    try {
      const utilizator = await await Utilizator.findByPk(
        req.params.utilizatorId,
        {
          include: [Configuratie],
        }
      );
      const configuratii = utilizator.configuraties.find(
        (element) => element.id == req.params.idConfiguratie
      );
      if (configuratii) {
        res.status(200).json(configuratii);
      } else {
        res.status(404).json({
          error: `Configuratia cu id ${req.params.idConfiguratie} nu exista! `,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);
router.get("/consumatori/:utilizatorId", async (req, res, next) => {
  try {
    Utilizator.findByPk(req.params.utilizatorId, {
      include: [Configuratie],
    }).then((utilizator) =>
      Configuratie.findAll({
        where: {
          utilizatorId: utilizator.id,
        },
        include: [Consumator],
      }).then((configuratii) =>
        Consumator.findAll({
          where: {
            configuratieId: configuratii.map((configuratie) => configuratie.id),
          },
        }).then((final) => {
          if (final) {
            res.status(200).json({ consumatori: final });
          } else {
            res.status(404).json({
              error: `Ultizator cu id ${req.params.configuratieId} nu exista! `,
            });
          }
        })
      )
    );
  } catch (err) {
    next(err);
  }
});

router.get(
  "/consumatori/:utilizatorId/:idConfiguratie",
  async (req, res, next) => {
    try {
      const configuratie = await Configuratie.findByPk(
        req.params.idConfiguratie,
        {
          include: [Consumator],
        }
      );
      if (configuratie) {
        res.status(200).json(configuratie.consumators);
      } else {
        res.status(404).json({
          error: `Configuratia cu id ${req.params.idConfiguratie} nu exista! `,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

// Endpoint 3: PUT - modificarea unei configuratii a unui utilizator.
router.put(
  "/utilizatori/:utilizatorId/configuratii/:configuratieId",
  async (req, res, next) => {
    try {
      const utilizator = await Utilizator.findByPk(req.params.utilizatorId);
      if (utilizator) {
        const configuratii = await utilizator.getConfiguraties({
          id: req.params.configuratieId,
        });
        const configuratie = configuratii.shift();
        if (configuratie) {
          configuratie.denumire = req.body.denumire;
          configuratie.furnizorEnergie = req.body.furnizorEnergie;
          configuratie.pretEenrgie = req.body.pretEnergie;
          await configuratie.save();
          res.status(202).json({ message: "Configuratie modificata!" });
        } else {
          res.status(404).json({
            error: `Configuratia cu id ${req.params.configuratieId} nu exista! `,
          });
        }
      } else {
        res.status(404).json({
          error: `Utilizatorul cu id ${req.params.utilizatorId} nu exista! `,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

// Endpoint 4: POST - Adauga o configuratie de consum unui utilizator
router.post(
  "/utilizatori/:utilizatorId/configuratie",
  async (req, res, next) => {
    if (!req.body.denumire) {
      return res.send("Nu exista denumire configuratie!");
    }

    try {
      const utilizator = await Utilizator.findByPk(req.params.utilizatorId);
      if (utilizator) {
        const configuratie = new Configuratie(req.body);
        configuratie.utilizatorId = utilizator.id;
        await configuratie.save();
        res.status(200).json(configuratie);
      } else {
        res.status(404).json({ message: "Utilizatorul nu exista" });
      }
    } catch (err) {
      next(error);
    }
  }
);

// Endpoint 5: DELETE - permite stergerea configuratiei unui utilizator
router.delete(
  "/utilizatori/:utilizatorId/configuratie/:configuratieId",
  async (req, res, next) => {
    try {
      const utilizator = await Utilizator.findByPk(req.params.utilizatorId);
      if (utilizator) {
        const configuratii = await utilizator.getConfiguraties({
          id: req.params.configuratieId,
        });
        const configuratie = configuratii.shift();

        if (configuratie) {
          await configuratie.destroy();
          res.status(202).json({ message: "Configuratie stearsa!" });
        } else {
          res.status(404).json({
            error: `Configuratia cu id ${req.params.configuratieId} nu exista! `,
          });
        }
      } else {
        res.status(404).json({
          error: `Utilizatorul cu id ${req.params.utilizatorId} nu exista! `,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

/// STERGE O CONFIGURATIE SI TOTI CONSUMATORII ACESTEIA
router.delete(
  "/configuratii/:utilizatorId/stergeConfiguratie/:configuratieId",
  async (req, res, next) => {
    try {
      const utilizator = await Utilizator.findByPk(req.params.utilizatorId);
      if (utilizator) {
        const configuratie = await Configuratie.findByPk(
          req.params.configuratieId,
          {
            include: [Consumator],
          }
        );
        // const configuratie = configuratii.shift();

        if (configuratie) {
          await configuratie.destroy();
          res.status(202).json({ message: "Configuratie stearsa!" });
        } else {
          res.status(404).json({
            error: `Configuratia cu id ${req.params.configuratieId} nu exista! `,
          });
        }
      } else {
        res.status(404).json({
          error: `Utilizatorul cu id ${req.params.utilizatorId} nu exista! `,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

let { PythonShell } = require("python-shell");

router.post("/python", async (req, res, next) => {
  try {
    return new Promise(async function (resolve, reject) {
      let options = {
        mode: "text",
        pythonOptions: ["-u"],
        scriptPath: "./", 
        args: [req.body.denumire],
      };

      await PythonShell.run("train3.py", options, function (err, results) {
        if (err) throw err;
        console.log("results: ");
        for (let i of results) {
        }
        res.status(202).json({ out: results }); 
      });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
