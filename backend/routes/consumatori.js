const express = require("express");

const Consumator = require("../models/consumator");
const router = express.Router();
const Utilizator = require("../models/utilizator");
const Configuratie = require("../models/configuratie");

// Endpoint 2: GET - afisam consumatorii unei camere
// router.get(
//   "/camere/:cameraId/consumatori",
//   async (req, res, next) => {
//     try {
//       const camera = await Camera.findByPk(req.params.cameraId, {
//         include: [Consumator],
//       });
//       if (camera) {
//         res.status(200).json(camera.consumators);
//       } else {
//         res.status(404).json({
//           error: `Camera cu id ${req.params.cameraId} nu exista! `,
//         });
//       }
//     } catch (err) {
//       next(err);
//     }
//   }
// );
router.post(
  "/consumatori/predefiniti",
  async (req, res, next) => {
    const data = req.body;
  console.log(data);
  try {
    const bulk = await Consumator.bulkCreate(data);
    res.send(bulk);
  } catch (err) {
    res.send(err.message);
  }
  }
);

router.get(
  "/getpredefiniti",
  async (req, res, next) => {
    try {
     

      const consumatori = await Consumator.findAll({  where :{
        predefinit:true

      }});
      if (consumatori) {
        res.status(200).json(consumatori);
      } else {
        res.status(404).json({
          error: `Eroare `,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);




// Endpoint 3: PUT - modificarea unui consumator dintr-o camera.
// router.put('/camere/:cameraId/consumatori/:consumatorId', async (req, res, next) => {
//   try {
//     const camera = await Camera.findByPk(req.params.cameraId)
//     if (camera) {
//       const consumatori = await camera.getConsumators({ id: req.params.consumatorId })
//       const consumator = consumatori.shift()
//       if (consumator) {
//         consumator.denumire = req.body.denumire
//         consumator.categorie = req.body.categorie
//         consumator.consum = req.body.consum
//         consumator.pret = req.body.pret
//         consumator.frecventaUtilizare = req.body.frecventaUtilizare
//         await consumator.save()
//         res.status(202).json({ message: 'Consumator modificat!'})
//       } else {
//        res.status(404).json({
//          error: `Consumatorul cu id ${req.params.consumatorId} nu exista! `,
//        });
//       }
//     } else {
//      res.status(404).json({
//        error: `Camera cu id ${req.params.cameraId} nu exista! `,
//      });
//     }
//   } catch (err) {
//     next(err);
//   }
//  });

// Endpoint 4: POST - Adauga un consumator intr-o camera
// router.post(
//   "/camere/:cameraId/consumator",
//   async (req, res, next) => {
//     if (!req.body.denumire) {
//       return res.send("Nu exista denumire consumator!");
//     }
//     try {
//       const camera = await Camera.findByPk(req.params.cameraId);
//       if (camera) {
//         const consumator = new Consumator(req.body);
//         consumator.cameraId = camera.id;
//         await consumator.save();
//         res.status(200).json(consumator);
//       } else {
//         res.status(404).json({ message: "Camera nu exista" });
//       }
//     } catch (err) {
//       next(error);
//     }
//   }
// );

// Endpoint 5: DELETE - permite stergerea configuratiei unui utilizator
router.delete(
  "/consumatori/:utilizatorId/configuratie/:configuratieId/id/:consumatorId",
  async (req, res, next) => {
    
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
              configuratieId: req.params.configuratieId,
              id:req.params.consumatorId,
            },
          }).then((final) => {
            if (final) {
              
              
               Consumator.findByPk(final.at(0).id).then((consm)=>{
                if (consm) {
                 consm.destroy().then((r)=>{
                  res.status(202).json({ message: "Consumator stearsa!" });
                 });
                
                } else {
                  res.status(404).json({
                    error: `Consumatorul nu exista `,
                  });
                }
               });
   
            } else {
              res.status(404).json({
                error: `Ultizator cu id ${req.params.configuratieId} nu exista! `,
              });
            }
          })
        )
      );
        }
    catch(e){

    }

    
  }   
);



router.put(
  "/modifica/:utilizatorId/configuratie/:configuratieId/id/:consumatorId",
  async (req, res, next) => {
    
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
              configuratieId: req.params.configuratieId,
              id:req.params.consumatorId,
            },
          }).then((final) => {
            if (final) {
              
              
               Consumator.findByPk(final.at(0).id).then((consm)=>{
                if (consm) {

                  consm.denumire = req.body.denumire
                  consm.categorie = req.body.categorie
                  consm.consum = req.body.consum
                  consm.pret = req.body.pret
                  consm.frecventaUtilizare = req.body.frecventaUtilizare
                 consm.save().then((r)=>{
                 return res.status(202).json({ message: "Consumator modificat!" });
                 });
                
                } else {
                  res.status(404).json({
                    error: `Consumatorul nu exista `,
                  });
                }
               });
   
            } else {
             return res.status(404).json({
                error: `Ultizator cu id ${req.params.configuratieId} nu exista! `,
              });
            }
          })
        )
      );
        }
    catch(e){

    }

    
  }   
);


router.put(
  "/modificaConfiguratie/:configuratieId",
  async (req, res, next) => {
    
    try {
        Configuratie.findByPk(req.params.configuratieId).then((r)=>{
          
            r.denumire = req.body.denumire
            r.furnizorEnergie = req.body.furnizorEnergie
            r.pretEnergie = req.body.pretEnergie
            r.save().then((l)=>{
             return res.status(200).json({ message: "Configuratie modificata!" });
             });
        
        })
        }
    catch(e){
      return res.status(200).json({ message: "Eroare" });

    }

    
  }   
);
module.exports = router;
