import { useEffect, useState } from "react";

// mui
import Grid from "@mui/material/Grid";
import { Icon } from "@mui/material";

// Components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

import selectData from "layouts/configuratie/BasicInfo/data/selectData";
import TextField from "layouts/configuratii/components/TextField";


// actions
import { useDispatch, useSelector } from "react-redux";
import { addConsumator } from "actions/configurationAction";
import { listConsumatori } from "actions/configurationAction";
import axios from "axios";

// Validation
import * as Yup from "yup";
import { Formik, Form } from "formik";


function BasicInfo({ camera, idConfiguratie, load, setLoad, adauga }) {
  const [denumire, setDenumire] = useState("");
  const [denumireAutomat, setDenumireAutomat] = useState("");
  const [categorie, setCategorie] = useState("Televizoare");
  const [selectDenumireAutomat, setSelectDenumireAutomat] = useState([]);
  const [categorieAutomat, setCategorieAutomat] = useState("Televizoare");

  const [consum, setConsum] = useState("");
  const [unitate, setUnitate] = useState("KWH");
  const [frecventa, setFrecventa] = useState(1);
  const [frecventaAutomat, setFrecventaAutomat] = useState(1);
  const [pret, setPret] = useState("");
  const [formular, setFormular] = useState(true);
  const [interval, setInterval] = useState("zi");
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const dispatch = useDispatch();

  const cat = [
    {
      value: "Televizoare",
      url: "https://images.samsung.com/is/image/samsung/ro-hd-t4000400240034005-ue32t4002akxxh-front-292446655?$1300_1038_PNG$",
    },
    {
      value: "Aragazuri",
      url: "https://lcdn.altex.ro/resize/media/catalog/product/a/r/2bd48d28d1c32adea0e55139a4e6434a/aragaz_beko_fsgt62110dxo_2.jpg",
    },
    {
      value: "Aparate frigorifice",
      url: "https://lcdn.altex.ro/resize/media/catalog/product/K/S/2bd48d28d1c32adea0e55139a4e6434a/KSV36BIEP_1.jpg",
    },
    {
      value: "Plite",
      url: "https://lcdn.altex.ro/resize/media/catalog/product/P/L/2bd48d28d1c32adea0e55139a4e6434a/PLTEIV9467_b3df8c3e.jpg",
    },
    {
      value: "Cuptoare",
      url: "https://lcdn.altex.ro/resize/media/catalog/product/C/P/2bd48d28d1c32adea0e55139a4e6434a/CPBBCS798S24X_8c7865ed.jpg",
    },
    {
      value: "Hote",
      url: "https://lcdn.altex.ro/resize/media/catalog/product/G/D/2bd48d28d1c32adea0e55139a4e6434a/GDK5777BXBH_50.jpg",
    },
    {
      value: "Masini de spalat vase",
      url: "https://lcdn.altex.ro/resize/media/catalog/product/G/S/2bd48d28d1c32adea0e55139a4e6434a/GS671C60X_1.jpg",
    },
    {
      value: "Masini de spalat rufe",
      url: "https://lcdn.altex.ro/resize/media/catalog/product/W/A/2bd48d28d1c32adea0e55139a4e6434a/WAL28PH0BY_1.jpg",
    },
    {
      value: "Uscatoare rufe",
      url: "https://lcdn.altex.ro/resize/media/catalog/product/G/T/2bd48d28d1c32adea0e55139a4e6434a/GTP5824BN_1.jpg",
    },
  ];
  const schimba = (e) => {
    setCategorieAutomat(e.target.value);
  };
  const afla = (e) => {
    setCategorieAutomat(e.target.value);
    const x = selectDenumireAutomat.forEach((x, idx) => {
      if (x.categorie.toUpperCase() == e.target.value.toUpperCase()) {
        return idx;
      }
    });

    console.log(x);
  };

  useEffect(() => {
    if (categorie == "Televizoare") {
      setUnitate("kWh/1000 ore");
    }
    if (categorie == "Aragazuri") {
      setUnitate("kWh/100 cicluri");
    }
    if (categorie == "Aparate frigorifice") {
      setUnitate("kWh/an");
    }
    if (categorie == "Plite") {
      setUnitate("kWh");
    }
    if (categorie == "Cuptoare") {
      setUnitate("kWh/100 cicluri");
    }
    if (categorie == "Hote") {
      setUnitate("kWh/an");
    }
    if (categorie == "Masini de spalat vase") {
      setUnitate("kWh/100 cicluri");
    }
    if (categorie == "Masini de spalat rufe") {
      setUnitate("kWh/100 cicluri");
    }
    if (categorie == "Uscatoare rufe") {
      setUnitate("kWh/100 cicluri");
    }
  }, [categorie]);

  const adaugaConsumator = (e, den, cons, freq, pr) => {
    if (
      categorie == "Uscatoare rufe" ||
      categorie == "Masini de spalat rufe" ||
      categorie == "Masini de spalat vase"
    ) {
      var valInterval = 1;
      var valUnitate = 1;
      if (interval == "saptamana") {
        valInterval = 1 / 7;
      }
      if (unitate == "kWh/1000 ore") {
        valUnitate = 1 / 1000;
      }
      if (unitate == "kWh/100 cicluri") {
        valUnitate = 1 / 100;
      }
      if (unitate == "kWh/an") {
        valUnitate = 1 / 365;
      }
      cat.forEach((el) => {
        el.value == categorie
          ? dispatch(
              addConsumator(
                idConfiguratie,
                camera,
                den,
                categorie,
                "",
                el.url,
                Math.round(cons * valUnitate * valInterval * 100) / 100,
                pr,
                freq,
                unitate,
                false
              )
            )
          : console.log("");
      });
    } else {
      var valUnitate = 1;
      if (unitate == "kWh/1000 ore") {
        valUnitate = 1 / 1000;
      }
      if (unitate == "kWh/100 cicluri") {
        valUnitate = 1 / 100;
      }
      if (unitate == "kWh/an") {
        valUnitate = 1 / 365;
      }
      console.log(consum);
      console.log(unitate);

      cat.forEach((el) => {
        el.value == categorie
          ? dispatch(
              addConsumator(
                idConfiguratie,
                camera,
                den,
                categorie,
                "",
                el.url,
                Math.round(cons * valUnitate * 100) / 100,
                pr,
                freq,
                unitate,
                false
              )
            )
          : console.log("");
      });
    }
    dispatch(listConsumatori(userInfo.id, idConfiguratie));
    setLoad(true);
    adauga();
    const x = setTimeout(function () {
      setLoad(false);
    }, 100);
  };

  const adaugaConsumatorAutomat = (e, frecventaValidareAutomat) => {
    console.log(denumireAutomat);
    const obj = selectDenumireAutomat[denumireAutomat];
    console.log(obj);
    dispatch(
      addConsumator(
        idConfiguratie,
        camera,
        obj.denumire,
        obj.categorie,
        "",
        obj.imagine,
        obj.consum,
        obj.pret,
        frecventaValidareAutomat,
        obj.unitateMasura,
        true
      )
    );
    dispatch(listConsumatori(userInfo.id, idConfiguratie));
    setLoad(true);
    adauga();
    const x = setTimeout(function () {
      setLoad(false);
    }, 100);
  };

  useEffect(() => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .get(
        `http://localhost:3000/api/getpredefiniti`,

        config
      )
      .then((rez) => {
        setSelectDenumireAutomat(rez.data);
      });
  }, []);

  const validareFormular = Yup.object().shape({
    denumireValidare: Yup.string()
      .min(3, "Denumirea necesita cel putin 2 caractere")
      .required("Acest camp necesita completare"),
    consumValidare: Yup.number()
      .moreThan(0, "Introduceti o valoare mai mare decat 0")
      .required("Acest camp necesita completare"),
    frecventaValidare: Yup.number()
      .moreThan(0, "Introduceti o valoare mai mare decat 0")
      .moreThan(0, "Pretul trebuie sa fie mai mare decat 0")
      .required("Acest camp necesita completare"),
    pretValidare: Yup.number()
      .moreThan(0, "Introduceti o valoare mai mare decat 0")
      .moreThan(0, "Pretul trebuie sa fie mai mare decat 0")
      .required("Acest camp necesita completare"),
  });

  const validareFormularAutomat = Yup.object().shape({
    frecventaValidareAutomat: Yup.number()
      .moreThan(0, "Introduceti o valoare mai mare decat 0")
      .moreThan(0, "Pretul trebuie sa fie mai mare decat 0")
      .required("Acest camp necesita completare"),
  });

  return (
    <>
      <SuiBox lineHeight={0}>
        <SuiTypography mt={1} mb={2} variant="h5" fontWeight="bold">
          Adaugare dispozitive
        </SuiTypography>

        <SuiBox width="100%" pr={1}>
          <SuiBox display="flex" alignItems="center">
            <SuiBox mr={3} onClick={() => setFormular(true)}>
              <SuiButton variant="gradient" buttonColor={"error"}>
                MANUAL
              </SuiButton>
            </SuiBox>
            <SuiBox mr={3} onClick={() => setFormular(false)}>
              <SuiButton variant="gradient" buttonColor={"primary"}>
                AUTOMAT
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </SuiBox>

      {formular ? (
        <Formik
          initialValues={{
            denumireValidare: "",
            consumValidare: "",
            frecventaValidare: "",
            pretValidare: "",
          }}
          validationSchema={validareFormular}
        >
          {(formik) => (
            <Form>
              <SuiBox>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Denumire"
                      name="denumireValidare"
                      placeholder="Denumire consumator energetic"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SuiBox mb={2} ml={0.5} lineHeight={0} display="block">
                      <SuiTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                        textTransform="capitalize"
                      >
                        Categorie
                      </SuiTypography>
                    </SuiBox>
                    <select
                      style={{
                        width: "210px",
                        height: "40px",
                        padding: "5px",
                        borderRadius: "0.5em",
                        opacity: "0.5",
                      }}
                      value={categorie}
                      onChange={(e) => setCategorie(e.target.value)}
                      class="form-select"
                      aria-label="Default select example"
                    >
                      {selectData.categorie.map((c) => {
                        return <option value={c.value}>{c.value}</option>;
                      })}
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="consumValidare"
                      type="number"
                      label="Consum energetic"
                      placeholder="Consum"
                    />
                  </Grid>

                  {/* 1.TELEVIZOARE */}
                  {categorie == "Televizoare" ? (
                    <>
                      <Grid item xs={12} sm={6}>
                        <SuiBox mb={2} ml={0.5} lineHeight={0} display="block">
                          <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Unitate de masura
                          </SuiTypography>
                        </SuiBox>
                        <select
                          style={{
                            width: "210px",
                            height: "40px",

                            borderRadius: "0.5em",
                            opacity: "0.5",
                          }}
                          defaultValue={selectData.umTelevizoare[0].value}
                          value={unitate}
                          onChange={(e) => setUnitate(e.target.value)}
                          class="form-select"
                          aria-label="Default select example"
                        >
                          {selectData.umTelevizoare.map((c) => {
                            return <option value={c.value}>{c.value}</option>;
                          })}
                        </select>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="number"
                          name="frecventaValidare"
                          label="Frecventa de utilizare - ore / zi"
                          placeholder="Ore / zi"
                        />
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}

                  {/* ARAGAZ */}
                  {categorie == "Aragazuri" ? (
                    <>
                      <Grid item xs={12} sm={6}>
                        <SuiBox mb={2} ml={0.5} lineHeight={0} display="block">
                          <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Unitate de masura
                          </SuiTypography>
                        </SuiBox>
                        <select
                          style={{
                            width: "210px",
                            height: "40px",
                            padding: "5px",
                            borderRadius: "0.5em",
                            opacity: "0.5",
                          }}
                          value={unitate}
                          onChange={(e) => setUnitate(e.target.value)}
                          class="form-select"
                          aria-label="Default select example"
                        >
                          {selectData.umAragaz.map((c) => {
                            return <option value={c.value}>{c.value}</option>;
                          })}
                        </select>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="number"
                          name="frecventaValidare"
                          label="Frecventa de utilizare - Nr utilizari/ zi"
                          placeholder="Cicluri"
                        />
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* APARATE FRIGORIFICE */}
                  {categorie == "Aparate frigorifice" ? (
                    <>
                      <Grid item xs={12} sm={6}>
                        <SuiBox mb={1} ml={0.5} lineHeight={0} display="block">
                          <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Unitate de masura
                          </SuiTypography>
                        </SuiBox>
                        <select
                          style={{
                            width: "210px",
                            height: "40px",
                            padding: "5px",
                            borderRadius: "0.5em",
                            opacity: "0.5",
                          }}
                          value={unitate}
                          onChange={(e) => setUnitate(e.target.value)}
                          class="form-select"
                          aria-label="Default select example"
                        >
                          {selectData.umAparatFrigorific.map((c) => {
                            return <option value={c.value}>{c.value}</option>;
                          })}
                        </select>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          type="number"
                          name="frecventaValidare"
                          label="Frecventa de utilizare - ore / zi"
                          placeholder="Ore / zi"
                        />
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}

                  {/* APARATE FRIGORIFICE */}
                  {categorie == "Plite" ? (
                    <>
                      <Grid item xs={12} sm={6}>
                        <SuiBox mb={1} ml={0.5} lineHeight={0} display="block">
                          <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Unitate de masura
                          </SuiTypography>
                        </SuiBox>
                        <select
                          style={{
                            width: "210px",
                            height: "40px",
                            padding: "5px",
                            borderRadius: "0.5em",
                            opacity: "0.5",
                          }}
                          value={unitate}
                          onChange={(e) => setUnitate(e.target.value)}
                          class="form-select"
                          aria-label="Default select example"
                        >
                          {selectData.umPlite.map((c) => {
                            return <option value={c.value}>{c.value}</option>;
                          })}
                        </select>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="number"
                          name="frecventaValidare"
                          label="Frecventa de utilizare - ore / zi"
                          placeholder="Ore / zi"
                        />
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}

                  {/* CUPTOARE */}
                  {categorie == "Cuptoare" ? (
                    <>
                      <Grid item xs={12} sm={6}>
                        <SuiBox mb={1} ml={0.5} lineHeight={0} display="block">
                          <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Unitate de masura
                          </SuiTypography>
                        </SuiBox>
                        <select
                          style={{
                            width: "210px",
                            height: "40px",
                            padding: "5px",
                            borderRadius: "0.5em",
                            opacity: "0.5",
                          }}
                          value={unitate}
                          onChange={(e) => setUnitate(e.target.value)}
                          class="form-select"
                          aria-label="Default select example"
                        >
                          {selectData.umCuptoare.map((c) => {
                            return <option value={c.value}>{c.value}</option>;
                          })}
                        </select>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          type="number"
                          name="frecventaValidare"
                          label="Frecventa de utilizare - Nr utilizari"
                          placeholder="Cicluri"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <SuiBox mb={2} ml={0.5} lineHeight={0} display="inline-block">
                          <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Alegeti interval
                          </SuiTypography>
                        </SuiBox>
                        <select
                          style={{
                            width: "150px",
                            height: "40px",
                            padding: "5px",
                            borderRadius: "0.5em",
                            opacity: "0.5",
                          }}
                          value={unitate}
                          onChange={(e) => setUnitate(e.target.value)}
                          class="form-select"
                          aria-label="Default select example"
                        >
                          {selectData.timp.map((c) => {
                            return <option value={c.value}>{c.value}</option>;
                          })}
                        </select>
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}

                  {/* 1.HOTE */}
                  {categorie == "Hote" ? (
                    <>
                      <Grid item xs={12} sm={6}>
                        <SuiBox mb={1} ml={0.5} lineHeight={0} display="block">
                          <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Unitate de masura
                          </SuiTypography>
                        </SuiBox>
                        <select
                          style={{
                            width: "210px",
                            height: "40px",
                            padding: "5px",
                            borderRadius: "0.5em",
                            opacity: "0.5",
                          }}
                          value={unitate}
                          onChange={(e) => setUnitate(e.target.value)}
                          class="form-select"
                          aria-label="Default select example"
                        >
                          {selectData.umHote.map((c) => {
                            return <option value={c.value}>{c.value}</option>;
                          })}
                        </select>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="number"
                          name="frecventaValidare"
                          label="Frecventa de utilizare - ore / zi"
                          placeholder="Ore / zi"
                        />
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}

                  {categorie == "Uscatoare rufe" ||
                  categorie == "Masini de spalat rufe" ||
                  categorie == "Masini de spalat vase" ? (
                    <>
                      <Grid item xs={12} sm={6}>
                        <SuiBox mb={1} ml={0.5} lineHeight={0} display="block">
                          <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Unitate de masura
                          </SuiTypography>
                        </SuiBox>
                        <select
                          style={{
                            width: "210px",
                            height: "40px",
                            padding: "5px",
                            borderRadius: "0.5em",
                            opacity: "0.5",
                          }}
                          value={unitate}
                          onChange={(e) => setUnitate(e.target.value)}
                          class="form-select"
                          aria-label="Default select example"
                        >
                          {selectData.umMVRU.map((c) => {
                            return <option value={c.value}>{c.value}</option>;
                          })}
                        </select>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          type="number"
                          name="frecventaValidare"
                          label="Frecventa de utilizare - nr utilizari"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <SuiBox mb={2} ml={0.5} lineHeight={0} display="inline-block">
                          <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Alegeti intervalul
                          </SuiTypography>
                        </SuiBox>
                        <select
                          style={{
                            width: "150px",
                            height: "40px",
                            padding: "5px",
                            borderRadius: "0.5em",
                            opacity: "0.5",
                          }}
                          value={interval}
                          onChange={(e) => setInterval(e.target.value)}
                          class="form-select"
                          aria-label="Default select example"
                        >
                          {selectData.timp.map((c) => {
                            return <option value={c.value}>{c.value}</option>;
                          })}
                        </select>
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}

                  {/* PRET */}

                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      name="pretValidare"
                      label="Pret - RON"
                      placeholder="Pret - RON"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <SuiButton
                      variant="gradient"
                      color="dark"
                      disabled={!(formik.isValid && formik.dirty)}
                      onClick={(e) => {
                        adaugaConsumator(
                          e,
                          formik.values.denumireValidare,
                          formik.values.consumValidare,
                          formik.values.frecventaValidare,
                          formik.values.pretValidare
                        );
                      }}
                    >
                      <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                      &nbsp;Adauga consumator
                    </SuiButton>
                  </Grid>
                </Grid>
              </SuiBox>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            frecventaValidareAutomat: "",
          }}
          validationSchema={validareFormularAutomat}
        >
          {(formik2) => (
            <Form>
              <SuiBox mt={1.625}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <SuiBox mb={1} ml={0.5} lineHeight={0} display="block">
                      <SuiTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                        textTransform="capitalize"
                      >
                        Denumire
                      </SuiTypography>
                    </SuiBox>
                    <select
                      style={{
                        width: "320px",
                        height: "40px",
                        padding: "5px",
                        borderRadius: "0.5em",
                        opacity: "0.5",
                      }}
                      value={denumireAutomat}
                      onChange={(e) => setDenumireAutomat(e.target.value)}
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <h1>{selectDenumireAutomat.length}</h1>
                      {selectDenumireAutomat.length > 0 ? (
                        selectDenumireAutomat.map((c, idx) => {
                          if (c.categorie.toUpperCase() == categorieAutomat.toUpperCase())
                            return <option value={idx}>{c.denumire}</option>;
                        })
                      ) : (
                        <p></p>
                      )}
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={4}></Grid>
                  <Grid item xs={12} sm={6}>
                    <SuiBox mb={1} ml={0.5} lineHeight={0} display="block">
                      <SuiTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                        textTransform="capitalize"
                      >
                        Categorie
                      </SuiTypography>
                    </SuiBox>
                    <select
                      style={{
                        width: "320px",
                        height: "40px",
                        padding: "5px",
                        borderRadius: "0.5em",
                        opacity: "0.5",
                      }}
                      value={categorieAutomat}
                      onChange={(e) => afla(e)}
                      class="form-select"
                      aria-label="Default select example"
                    >
                      {selectData.categorie.map((c) => {
                        return <option value={c.value}>{c.value}</option>;
                      })}
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={4}></Grid>

                  <Grid item xs={12} sm={6}>
                    {categorieAutomat == "Masini de spalat vase" ||
                    categorieAutomat == "Masini de spalat rufe" ||
                    categorieAutomat == "Uscatoare rufe" ? (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            type="number"
                            name="frecventaValidareAutomat"
                            label="Frecventa de utilizare - nr utilizari"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} display="block">
                          <select
                            style={{
                              width: "165px",
                              height: "40px",
                              padding: "5px",
                              borderRadius: "0.5em",
                              opacity: "0.5",
                            }}
                            value={interval}
                            onChange={(e) => setInterval(e.target.value)}
                            class="form-select"
                            aria-label="Default select example"
                          >
                            {selectData.timp.map((c) => {
                              return <option value={c.value}>{c.value}</option>;
                            })}
                          </select>
                        </Grid>
                      </>
                    ) : (
                      <TextField
                        type="number"
                        label="Frecventa de utilizare - ore / zi"
                        placeholder="Ore / zi"
                        name="frecventaValidareAutomat"
                        defaultValue="0"
                      />
                    )}
                  </Grid>

                  <Grid item xs={12} sm={4}></Grid>
                  <Grid item xs={12} md={6}>
                    <SuiButton
                      variant="gradient"
                      color="dark"
                      disabled={!(formik2.isValid && formik2.dirty)}
                      onClick={(e) => {
                        adaugaConsumatorAutomat(e, formik2.values.frecventaValidareAutomat);
                      }}
                    >
                      <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                      &nbsp;Adauga consumator
                    </SuiButton>
                  </Grid>
                </Grid>
              </SuiBox>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

export default BasicInfo;
