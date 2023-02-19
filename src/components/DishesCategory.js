import React from 'react'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { Link } from "react-scroll";
import { store } from '../store/store';
import { actionCartAdd, actionCartChange, actionCartRemove, actionSpotSelect} from '../store/cardReducer';
import { Box, Button, Modal, Typography } from '@mui/material';
import { BasketConnect } from './Basket';

import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

const ProductModal = ({active , setActive ,img ,name , desc , price }) => {

  return (
    <div className={active ? "modal_product active" : "modal_product"} onClick={() => setActive(false)}>
      <div className='modal_product_content' onClick={e => e.stopPropagation()}>
          <div className='top_modal_product_content'>
            <div className='top_modal_product_content_imgContainer'>
                <img src={img}/>
            </div>
            <div className='top_modal_product_content_text'>
                <h1>{name}</h1>
                <p>{desc}</p>
            </div>
          </div>
          <div className='bottom_modal_product_content'>
            <button>Додати до замовлення за {price}</button>
          </div>
      </div>
    </div>
  )
}

// !!!!!!!!!!!!
  
const removeUpTo6Zeros = val => {
  let i;
  for (i = 0; i < 4; i++) {
    if (val[val.length - 1 - i] !== '0') break;
  }
  return i ? val.slice(0, -i) : val;
};


const Spot1 = ({product_name , price , photo , productIng , id}) => {
  const [amount , setAmount] = useState(0)
  const [changePos , setChangePos] = useState(false)

  const [modalActive, setModalActive] = useState(false);
 
  useEffect(() => {
    if(product_name === "Удон з куркою та овочами"){
        setChangePos(true)
      }
    }, [product_name])

  const deleteFromBasket = (id) => {
    // setOpen(false)
    store.dispatch(actionCartChange(-1 , id , product_name ,  removeUpTo6Zeros(price[1])))
    setAmount(amount - 1)
    if(store.getState().cardReducer[id].count === 0){
          store.dispatch(actionCartRemove(id))
      }
  }

  const addToBasket = (amount ,id , product_name , price) => {
    // setOpen(true)
    setAmount(amount + 1)
    store.dispatch(actionCartAdd(1, id , product_name , removeUpTo6Zeros(price)))
    console.log(id)
  }


  return (
    <>
      <div className='category_Item' onClick={e => e.stopPropagation()} >
      <div className='category_ItemTop'  onClick={() => setModalActive(true)}>
            {
              photo !== "http://joinposter.com" ? <img src={photo} className={changePos === true ? 'img_pos' : ''}/> : ''
            }
            <h6>{product_name}</h6>
            <div className='category_item_desc'>
                {productIng}
            </div>
        </div>
      <div className='category_item_bottom'>
          <span>
            {removeUpTo6Zeros(price[1]) + "  грн"}
          </span>
          <div className='count_ContainerBottom'>
              <button onClick={() => deleteFromBasket(id)} className={amount < 1 ? "visibleMinus" : "minus"}>
                 <span> - </span>
                 </button>
              <h4 className={amount < 1 ? "visibleMinus" : ""}>{amount}</h4>
              <button onClick={() => addToBasket(amount ,id , product_name , price[1])} className="count_plus">
                <span> + </span>
              </button>
          </div>
      </div>
    </div>
   <ProductModal 
        active={modalActive} 
        setActive={setModalActive} 
        img={photo}
        name={product_name}
        desc={productIng}
        price={removeUpTo6Zeros(price[1]) + "  грн"}
        />
   </>
  )
}


const Spot2 = ({product_name , price , photo , productIng , id}) => {
  const [amount , setAmount] = useState(0)
  const [changePos , setChangePos] = useState(false)

  useEffect(() => {
    if(product_name === "Удон з куркою та овочами"){
        setChangePos(true)
      }
    }, [product_name])

  const deleteFromBasket = (id) => {
    // setOpen(false)
    store.dispatch(actionCartChange(-1 , id , product_name ,  removeUpTo6Zeros(price[2])))
    setAmount(amount - 1)
    if(store.getState().cardReducer[id].count === 0){
          store.dispatch(actionCartRemove(id))
      }
  }

  const addToBasket = (amount ,id , product_name , price) => {
    // setOpen(true)
    setAmount(amount + 1)
    store.dispatch(actionCartAdd(1, id , product_name , removeUpTo6Zeros(price)))
    console.log(id)
  }

  return (
    <div className='category_Item'>
    {
      photo !== "http://joinposter.com" ? <img src={photo} className={changePos === true ? 'img_pos' : ''}/> : ''
    }
    <h6>{product_name}</h6>
    <div className='category_item_desc'>
        {productIng}
    </div>
    <div className='category_item_bottom'>
        <span>
          {removeUpTo6Zeros(price[2]) + "  грн"}
        </span>
        <div className='count_ContainerBottom'>
            <button onClick={() => deleteFromBasket(id)} className={amount < 1 ? "visibleMinus" : "minus"}> - </button>
            <h4 className={amount < 1 ? "visibleMinus" : ""}>{amount}</h4>
            <button onClick={() => addToBasket(amount ,id , product_name , price[2])} className="count_plus">+</button>
        </div>
    </div>
  </div>
  )
}


const Spot3 = ({product_name , price , photo , productIng , id}) => {
  const [amount , setAmount] = useState(0)
  const [changePos , setChangePos] = useState(false)

  useEffect(() => {
    if(product_name === "Удон з куркою та овочами"){
        setChangePos(true)
      }
    }, [product_name])

  const deleteFromBasket = (id) => {
    // setOpen(false)
    store.dispatch(actionCartChange(-1 , id , product_name ,  removeUpTo6Zeros(price[3])))
    setAmount(amount - 1)
    if(store.getState().cardReducer[id].count === 0){
          store.dispatch(actionCartRemove(id))
      }
  }

  const addToBasket = (amount ,id , product_name , price) => {
    // setOpen(true)
    setAmount(amount + 1)
    store.dispatch(actionCartAdd(1, id , product_name , removeUpTo6Zeros(price)))
    console.log(id)
  }

  return (
    <div className='category_Item'>
    {
      photo !== "http://joinposter.com" ? <img src={photo} className={changePos === true ? 'img_pos' : ''}/> : ''
    }
    <h6>{product_name}</h6>
    <div className='category_item_desc'>
        {productIng}
    </div>
    <div className='category_item_bottom'>
        <span>
          {removeUpTo6Zeros(price[3]) + "  грн"}
        </span>
        <div className='count_ContainerBottom'>
            <button onClick={() => deleteFromBasket(id)} className={amount < 1 ? "visibleMinus" : "minus"}> - </button>
            <h4 className={amount < 1 ? "visibleMinus" : ""}>{amount}</h4>
            <button onClick={() => addToBasket(amount ,id , product_name , price[3])} className="count_plus">+</button>
        </div>
    </div>
  </div>
  )
}

const Spot4 = ({product_name , price , photo , productIng , id}) => {
  const [amount , setAmount] = useState(0)
  const [changePos , setChangePos] = useState(false)

  useEffect(() => {
    if(product_name === "Удон з куркою та овочами"){
        setChangePos(true)
      }
    }, [product_name])

  const deleteFromBasket = (id) => {
    // setOpen(false)
    store.dispatch(actionCartChange(-1 , id , product_name ,  removeUpTo6Zeros(price[4])))
    setAmount(amount - 1)
    if(store.getState().cardReducer[id].count === 0){
          store.dispatch(actionCartRemove(id))
      }
  }

  const addToBasket = (amount ,id , product_name , price) => {
    // setOpen(true)
    setAmount(amount + 1)
    store.dispatch(actionCartAdd(1, id , product_name , removeUpTo6Zeros(price)))
    console.log(id)
  }

  return (
    <div className='category_Item'>
          {
            photo !== "http://joinposter.com" ? <img src={photo} className={changePos === true ? 'img_pos' : ''}/> : ''
          }
      <div className='category_ItemTop'>
          <h6>{product_name}</h6>
          <div className='category_item_desc'>
              {productIng}
          </div>
      </div>
    <div className='category_item_bottom'>
        <span>
          {removeUpTo6Zeros(price[4]) + "  грн"}
        </span>
        <div className='count_ContainerBottom'>
            <button onClick={() => deleteFromBasket(id)} className={amount < 1 ? "visibleMinus" : "minus"}> - </button>
            <h4 className={amount < 1 ? "visibleMinus" : ""}>{amount}</h4>
            <button onClick={() => addToBasket(amount ,id , product_name , price[4])} className="count_plus">+</button>
        </div>
    </div>
  </div>
  )
}


const CategoryRowItem = ({selectedSpot,products  , category_name}) =>  {
    const [changePos , setChangePos] = useState(false)
    const [amount , setAmount] = useState(0)
    const [open , setOpen] = useState(false)

    const [currSpot , setCurrSpot] = useState()
    const [prd , setProd] = useState([])

    const rest1 = []
    const rest2 = []
    const rest3 = []
    const rest4 = []
    const [spot1Visible , setSpot1Visible] = useState(false);
    const [spot2Visible , setSpot2Visible] = useState(false);
    const [spot3Visible , setSpot3Visible] = useState(false);
    const [spot4Visible , setSpot4Visible] = useState(false);
    const [spot5Visible , setSpot5Visible] = useState(false);
 
    const sortProducts = (products) => {
      for(let [key , value] of Object.entries(products)){
        for(let [k , v] of Object.entries(value.spots)){
          if(v.spot_id == 1 && v.visible == 1){
            rest1.push(value)
          }
          if(v.spot_id == 2 && v.visible == 1){
            rest2.push(value)
          }
          if(v.spot_id == 3 && v.visible == 1){
            rest3.push(value)
          }
          if(v.spot_id == 4 && v.visible == 1){
            rest4.push(value)
          }
        }
      }
    }
    
    sortProducts(prd)

    useEffect(() => {
      setCurrSpot(selectedSpot)
    }, [selectedSpot])

    useEffect(() => {
      if(products !== null){
        setProd(products || [])
      }
    }, [products])
    

    useEffect(() => {
        currSpot?.name == 1 ? setSpot1Visible(true): setSpot1Visible(false);
        currSpot?.name == 2 ? setSpot2Visible(true): setSpot2Visible(false);
        currSpot?.name == 3 ? setSpot3Visible(true): setSpot3Visible(false);
        currSpot?.name == 4 ? setSpot4Visible(true): setSpot4Visible(false);
        currSpot?.name == 5 ? setSpot5Visible(true): setSpot5Visible(false);

    }, [currSpot])


    return (
          <>  
              {
                spot1Visible === true ? rest1?.map((item) => (item.category_name === category_name ? 
                <Spot1 
                  key={item.product_id} 
                  product_name={item.product_name}
                  photo={item.photo !== null ? "http://joinposter.com"  + item.photo : null}
                  productIng={item.product_production_description} 
                  price={item.price} 
                  id={item.product_id}
                  />
                  : [])) : []
              }
              {
                spot2Visible === true ? rest2?.map((item) => (item.category_name === category_name ? 
                <Spot2
                  key={item.product_id} 
                  product_name={item.product_name}
                  photo={item.photo !== null ? "http://joinposter.com"  + item.photo : null}
                  productIng={item.product_production_description} 
                  price={item.price} 
                  id={item.product_id}
                  />
                  : [])) : []
              }
              {
                spot3Visible === true ? rest3?.map((item) => (item.category_name === category_name ? 
                <Spot3
                  key={item.product_id} 
                  product_name={item.product_name}
                  photo={item.photo !== null ? "http://joinposter.com"  + item.photo : null}
                  productIng={item.product_production_description} 
                  price={item.price} 
                  id={item.product_id}
                  />
                  : [])) : []
              }
              {
                spot4Visible === true ? rest4?.map((item) => (item.category_name === category_name ? 
                <Spot4 
                  key={item.product_id} 
                  product_name={item.product_name}
                  photo={item.photo !== null ? "http://joinposter.com"  + item.photo : null}
                  productIng={item.product_production_description} 
                  price={item.price} 
                  id={item.product_id}
                  />
                  : [])) : []
              } 
          </>
        )
      }

export const CategoryRowItemConnect = connect(state => ({
    selectedSpot: state.cardReducer.spot,
}), {

})(CategoryRowItem)      

      

const CategoryRow = ({ name , id , products }) => {
  const div = useRef()

  // useEffect(() => {

  //   const check = () => {
  //     const divAnimate = div.current.getBoundingClientRect().top;
  //     if(divAnimate < window.screenY){
  //       const element = document.getElementById(name);
  //       element.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }

  //   window.addEventListener('scroll', check);

  //   return () => window.removeEventListener('scroll', check);
  // }, [])
  
    // const section = event.target.dataset.section;
  // const handleMenuScroll = (name) => {
  //   const doc = document.getElementById(name)
  //   // doc.style.backgroundColor = "white"
  //   // doc.style.color = "black"
  //   doc.scrollIntoView({behavior: "smooth"})
  // }

  // onMouseEnter={handleMenuScroll}
  return (
    <div className='category_Row' key={id} id={id} ref={div}>
      <h2>{name}</h2>
      <div className='category_ItemRow'>
        {
        <CategoryRowItemConnect products={products} category_name={name} /> 
        }
      </div>
    </div>
  )
}

export const CategoryRowConnect = connect(state => ({
  products: state.promise.products?.payload?.products
}), {

})(CategoryRow)     


const DishCategoryItem = ({sections}) => {

  const [activeSection, setActiveSection] = useState("");

  const handleClick = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionOffsets = sections?.map((section) => {
        const element = document.getElementById(section.category_id);
        return [section.category_id, element.offsetTop, element.offsetTop + element.offsetHeight];
      });

      const scrollPosition = window.pageYOffset + window.innerHeight / 2;

      const currentSection = sectionOffsets.find(
        ([_, offsetTop, offsetBottom]) => scrollPosition >= offsetTop && scrollPosition <= offsetBottom
      );

      if (currentSection) {
        setActiveSection(currentSection[0]);
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <nav>
      <ul className='dishCategoryItem'>
        {sections?.map((section) => (
          <li key={section.category_name} className="scroll-section">
            <button
              id={section.category_name}
              className={activeSection === section.category_id ? 'dishCategoryItemButton nav-scroller__item_active' : 'dishCategoryItemButton' }
              onClick={(e) => handleClick(section.category_id)}
            >
              {section.category_name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}


const DishesCategory = ({categories}) => {
    const [cat , setCat] = useState()
    const [prod , setProd] = useState()
    const [ing , setIng] = useState()

    const div = useRef();

    useLayoutEffect(() => {
      const divAnimate = div.current.getBoundingClientRect().top;
      const onScroll = () => {
        if (divAnimate < window.scrollY) {
          // console.log("ok");
          div.current.style.position = "fixed";
          div.current.style.top = 0;
          div.current.style.boxShadow = "0px 0px 5px 0px #CBC8C8";
          div.current.style.transition = "0.3s ease-in-out";
        } else {
          div.current.style.position = "relative";
          div.current.style.borderBottom = "none"
          div.current.style.boxShadow = "none"
          div.current.style.transition = "none"
        }       
      }; 
      window.addEventListener("scroll", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
      }
    }, []);

    useEffect(() => {
      if(categories !== null) {
        setCat(categories)
        // setProd(products)
        // setIng(ingredients)
      }
    }, [categories])


  return (
    <div className='dishes_content'>
        <div className='dishes_wrapper' ref={div} >
            <div className='dishes_container' id="scrollNavbar">
              <SearchRoundedIcon  className='searchIcon' sx={{fontSize: 40}}/>
              <DishCategoryItem sections={cat} />
            </div>
        </div>

        <div className='category_with_dishes' style={{ height: "100%" }}>
            {
              cat?.map((item) => (
                <CategoryRowConnect name={item.category_name} key={item.category_id} id={item.category_id} ing={ing}/>
              ))
            }
        </div>
    </div>
  )
};

export const DishesConnect = connect(state => ({
  categories: state.promise?.categories?.payload?.categories,
}), {

})(DishesCategory) 
