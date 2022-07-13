const express = require("express");
// const Camera = require("../models/camera");
const Configuratie = require("../models/configuratie");
const Consumator = require("../models/consumator");
const Utilizator = require("../models/utilizator");
const router = express.Router();

// Endpoint  1: GET - afiseaza toate camerele
router.get("/camere/:utilizatorId/:configuratieId", async (req, res, next) => {
  Utilizator.findByPk(req.params.utilizatorId, {
    include: [Configuratie],
  }).then((utilizator) =>
    Configuratie.findAll({
      where: {
        utilizatorId: utilizator.id,
        id: req.params.configuratieId,
      },
      include: [Consumator],
    }).then((configuratii) =>
      Consumator.findAll({
        where: {
          configuratieId: configuratii.map((configuratie) => configuratie.id),
        },
      }).then((final) => {
        if (final) {
          var dict = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
          };
          final.forEach((consumator) => {
            
            dict[consumator.camera] =
              dict[consumator.camera] +
              consumator.frecventaUtilizare * consumator.consum;
          });
          res.status(200).json({ total: dict });
        } else {
          res.status(404).json({
            error: `Configuratia cu id ${req.params.utilizatorId} nu exista! `,
          });
        }
      })
    )
  );
});

// Endpoint 2: GET - afisam camerele unei configuratii
router.get("/configuratii/:configuratieId", async (req, res, next) => {
  try {
    const configuratie = await Configuratie.findByPk(
      req.params.configuratieId,
      {
        include: [Consumator],
      }
    );
    if (configuratie) {
      res.status(200).json(configuratie);
    } else {
      res.status(404).json({
        error: `Configuratia cu id ${req.params.configuratieId} nu exista! `,
      });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint 3: PUT - modificarea unei configuratii a unui utilizator.
router.put(
  "/configuratii/:configuratieId/camere/:cameraId",
  async (req, res, next) => {
    try {
      const configuratie = await Configuratie.findByPk(
        req.params.configuratieId
      );
      if (configuratie) {
        const camere = await configuratie.getCameras({
          id: req.params.cameraId,
        });
        const camera = camere.shift();
        if (camera) {
          camera.denumire = req.body.denumire;
          await camera.save();
          res.status(202).json({ message: "Camera modificata!" });
        } else {
          res.status(404).json({
            error: `Camera cu id ${req.params.cameraId} nu exista! `,
          });
        }
      } else {
        res.status(404).json({
          error: `Configuratia cu id ${req.params.configuratieId} nu exista! `,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

// Endpoint 4: POST - Adauga o camera in configuratie

// Endpoint 5: DELETE - permite stergerea unei camere din configuratie
router.delete(
  "/configuratii/:configuratieId/camera/:cameraId",
  async (req, res, next) => {
    try {
      const configuratie = await Configuratie.findByPk(
        req.params.configuratieId
      );
      if (configuratie) {
        const camere = await configuratie.getCameras({
          id: req.params.cameraId,
        });
        const camera = camere.shift();

        if (camera) {
          await camera.destroy();
          res.status(202).json({ message: "Camera stearsa!" });
        } else {
          res.status(404).json({
            error: `Camera cu id ${req.params.cameraId} nu exista! `,
          });
        }
      } else {
        res.status(404).json({
          error: `Configuratia cu id ${req.params.configuratieId} nu exista! `,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
