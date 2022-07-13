/**
=========================================================
* Soft UI Dashboard PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/* eslint-disable react/prop-types */
// Soft UI Dashboard PRO React components
import SuiBadge from "components/SuiBadge";

// ProductsList page components
import ProductCell from "layouts/configuratie/ListaDispozitive/components/ProductCell";
import ActionCell from "layouts/configuratie/ListaDispozitive/components/ActionCell";

// Images
const adidasHoodie =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/adidas-hoodie.jpg";
const macBookPro =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/macbook-pro.jpg";
const metroChair =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/metro-chair.jpg";
const alchimiaChair =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/alchimia-chair.jpg";
const fendiCoat =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/fendi-coat.jpg";
const offWhiteJacket =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/off-white-jacket.jpg";
const yohjiYamamoto =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/yohji-yamamoto.jpg";
const mcqueenShirt =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/mcqueen-shirt.jpg";
const yellowChair =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/yellow-chair.jpg";
const heronTshirt =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/heron-tshirt.jpg";
const livingChair =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/living-chair.jpg";
const orangeSofa =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/orange-sofa.jpg";
const burberry =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/burberry.jpg";
const dgSkirt =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/d&g-skirt.jpg";
const undercover =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/undercover.jpg";

// Badges
const outOfStock = (
  <SuiBadge
    variant="contained"
    color="error"
    size="extra-small"
    badgeContent="out of stock"
    container
  />
);
const inStock = (
  <SuiBadge
    variant="contained"
    color="success"
    size="extra-small"
    badgeContent="in stock"
    container
  />
);

export default {
  columns: [
    {
      Header: "Consumator energetic",
      accessor: "product",
      width: "40%",
      Cell: ({ value: [name, data] }) => (
        <ProductCell image={data.image} name={name} checked={data.checked} />
      ),
    },
    { Header: "Categorie", accessor: "category" },
    { Header: "Consum energetic", accessor: "price" },
    { Header: "Pret", accessor: "sku" },
    { Header: "Numar consumatori", accessor: "quantity" },
    { Header: "Frecventa utilizare", accessor: "nu" },
    {
      Header: "status",
      accessor: "status",
      Cell: ({ value }) => (value === "in stock" ? inStock : outOfStock),
    },
    { Header: "action", accessor: "action" },
  ],

  rows: [
    {
      product: ["BKLGO Full Zip Hoodie", { image: adidasHoodie, checked: true }],
      category: "Cloting",
      price: "$1,321",
      sku: 243598234,
      quantity: 0,
      status: "out of stock",
      action: <ActionCell />,
    },
    {
      product: ["MacBook Pro", { image: macBookPro, checked: true }],
      category: "Electronics",
      price: "$1,869",
      sku: 877712,
      quantity: 0,
      status: "out of stock",
      action: <ActionCell />,
    },
    {
      product: ["Metro Bar Stool", { image: metroChair, checked: false }],
      category: "Furniture",
      price: "$99",
      sku: "0134729",
      quantity: 978,
      status: "in stock",
      action: <ActionCell />,
    },
    {
      product: ["Alchimia Chair", { image: alchimiaChair, checked: false }],
      category: "Furniture",
      price: "$2,999",
      sku: 113213,
      quantity: 0,
      status: "out of stock",
      action: <ActionCell />,
    },
    {
      product: ["Fendi Gradient Coat", { image: fendiCoat, checked: false }],
      category: "Clothing",
      price: "$869",
      sku: 634729,
      quantity: 725,
      status: "in stock",
      action: <ActionCell />,
    },
    {
      product: ["Off White Cotton Bomber", { image: offWhiteJacket, checked: false }],
      category: "Clothing",
      price: "$1,869",
      sku: 634729,
      quantity: 725,
      status: "in stock",
      action: <ActionCell />,
    },
    {
      product: ["Y-3 Yohji Yamamoto", { image: yohjiYamamoto, checked: true }],
      category: "Shoes",
      price: "$869",
      sku: 634729,
      quantity: 725,
      status: "in stock",
      action: <ActionCell />,
    },
    {
      product: ["Alexander McQueen", { image: mcqueenShirt, checked: true }],
      category: "Clothing",
      price: "$1,199",
      sku: "00121399",
      quantity: 51293,
      status: "in stock",
      action: <ActionCell />,
    },
    {
      product: ["Luin Floor Lamp", { image: yellowChair, checked: true }],
      category: "Furniture",
      price: "$1,900",
      sku: 434729,
      quantity: 34,
      status: "in stock",
      action: <ActionCell />,
    },
    {
      product: ["Heron Preston T-shirt", { image: heronTshirt, checked: false }],
      category: "Clothing",
      price: "$149",
      sku: 928341,
      quantity: 0,
      status: "out of stock",
      action: <ActionCell />,
    },
    {
      product: ["Gray Living Chair", { image: livingChair, checked: true }],
      category: "Furniture",
      price: "$2,099",
      sku: 9912834,
      quantity: 32,
      status: "in stock",
      action: <ActionCell />,
    },
    {
      product: ["Derbyshire Orange Sofa", { image: orangeSofa, checked: false }],
      category: "Furniture",
      price: "$2,999",
      sku: 561151,
      quantity: 22,
      status: "in stock",
      action: <ActionCell />,
    },
    {
      product: ["Burberry Low-Tops", { image: burberry, checked: true }],
      category: "Shoes",
      price: "$869",
      sku: 634729,
      quantity: 725,
      status: "in stock",
      action: <ActionCell />,
    },
    {
      product: ["Dolce & Gabbana Skirt", { image: dgSkirt, checked: false }],
      category: "Designer",
      price: "$999",
      sku: "01827391",
      quantity: 0,
      status: "out of stock",
      action: <ActionCell />,
    },
    {
      product: ["Undercover T-shirt", { image: undercover, checked: true }],
      category: "Shoes",
      price: "$869",
      sku: 63472,
      quantity: 725,
      status: "in stock",
      action: <ActionCell />,
    },
  ],
};
