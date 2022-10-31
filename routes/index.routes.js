const router = require("express").Router();
const Apartment = require("../models/Apartment.model");

router.get("/", (req, res, next) => {
  //obtenir llista d'aparments
  Apartment.find()
  .then(results => {
    console.log("results /", results);
    res.json(results);
  }) 
  .catch(err => {
    next(err);
  })
});

router.get("/:idApartment", (req, res, next) => {
  //obatenir un apartment concret
  Apartment.findById(req.params.idApartment)
  .then(results => {
    console.log(req.params.idApartment);
    res.json(results);
  })
  .catch(err => {
    next(err);
  })
})

router.put("/:idApartment", (req, res, next) => {
  //actualitzar un apartment concret 
  Apartment.findByIdAndUpdate(req.params.idApartment, req.body)
  .then(results => {
    res.json(results);
  })
  .catch(err => {
    next(err);
  })
})

router.delete("/:idApartment", (req, res, next) => {
  //eliminar un apartment concret
  Apartment.findByIdAndDelete(req.params.idApartment)
  .then(results => {
    res.json(results);
  })
  .catch(err => {
    next(err);
  })
})



router.post("/", async (req, res, next) => {
  //publicar un apartment
  try {
    const response = await Apartment.create(req.body)
    res.json(response);
  } catch(err) {
    next(err);
  }
})


module.exports = router;
