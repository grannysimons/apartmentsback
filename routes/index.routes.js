const router = require("express").Router();
const Apartment = require("../models/Apartment.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", (req, res, next) => {
  console.log("req.payload: ", req.payload);
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

router.put("/:idApartment", isAuthenticated, (req, res, next) => {
  //actualitzar un apartment concret 
  Apartment.findByIdAndUpdate(req.params.idApartment, req.body)
  .then(results => {
    res.json(results);
  })
  .catch(err => {
    next(err);
  })
})

router.delete("/:idApartment", isAuthenticated, (req, res, next) => {
  //eliminar un apartment concret
  Apartment.findByIdAndDelete(req.params.idApartment)
  .then(results => {
    res.json(results);
  })
  .catch(err => {
    next(err);
  })
})



router.post("/", isAuthenticated, async (req, res, next) => {
  //publicar un apartment
  try {
    const response = await Apartment.create(req.body)
    res.json(response);
  } catch(err) {
    next(err);
  }
})


module.exports = router;
