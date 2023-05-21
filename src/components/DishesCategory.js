import React from 'react'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useState } from 'react';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { store } from '../store/store';
import { actionCartAdd, actionCartChange, actionCartRemove, actionSpotSelect } from '../store/cardReducer';
import { Box, Button, Modal, Typography } from '@mui/material';
import { BasketConnect } from './Basket';

import Input from '@mui/joy/Input';

import { setSearchInput } from '../actions/Actions';

import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useMemo } from 'react';

import { useDispatch } from "react-redux";
import { useCallback } from 'react';

const ProductModal = ({active , setModalActive ,img ,name , desc , price , id , mainPrice}) => {
  const [isAddressBarVisible, setIsAddressBarVisible] = useState(false);
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    // Check if the maximum width of the screen is greater than 800 pixels
    const mediaQuery = window.matchMedia('(max-width: 800px)');

    // Hide the component if the screen is too large
    setShowComponent(mediaQuery.matches);

    // Add a listener to the media query to update the component when the screen size changes
    const handleMediaQueryChange = () => {
      setShowComponent(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  useLayoutEffect(() => {
    function handleResize() {
      const isAddressBarVisible = window.visualViewport.height > 700;
      setIsAddressBarVisible(isAddressBarVisible);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (active) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [active]);

  const [startY, setStartY] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const componentRef = useRef(null);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setStartY(touch.clientY);
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    setCurrentY(touch.clientY);
    if (startY && !isSwiping) {
      setIsSwiping(true);
    }
  };

  const handleTouchEnd = () => {
    if (isSwiping) {
      const componentHeight = componentRef.current.offsetHeight;
      const swipeDistance = currentY - startY;
      if (swipeDistance > componentHeight / 3) {
        // Close the component
      } else {
        // Reset the component to its original position
      }
      setIsSwiping(false);
    }
    
    setStartY(null);
    setCurrentY(null);
    setModalActive(false)
  };

  if (!active) return null;

  return (
        <div className={active ? "modal_product active" : "modal_product"}
        ref={componentRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateY(${currentY ? currentY - startY : 0}px)` ,paddingBottom: !isAddressBarVisible ? "20%" : 0 , backgroundColor:   currentY ? "rgba(0,0,0,0)" : []}}
        onClick={() => setModalActive(false)}>
          <div className='modal_product_content' onClick={(e) => e.stopPropagation() }>
            <div className='top_modal_product_content'>
              {showComponent &&  <div  className='close_modal_button'>
                {
                  isSwiping ? <ArrowDropDownIcon/> : <RemoveIcon/>
                }
                </div>
              }
                <div className='top_modal_product_content_imgContainer'>
                    <img src={img}/>
                </div>
                <div className='top_modal_product_content_text'>
                    <h1>{name}</h1>
                    <p>{desc}</p>
                    <span style={{color: "red"}}>{price}</span>
                </div>
            </div>
          <div className='bottom_modal_product_content' >
            <button onClick={() => store.dispatch(actionCartAdd(1, id , name , mainPrice , img))}>Додати до замовлення за {price}</button>
          </div>
        </div>
      </div>
      )   
    }
  
    const removeTrailingZeros = (priceString) => {
      return priceString.replace(/(\d)(?=(\d{3})+$)/g, '$1').replace(/(\.[0-9]*[1-9])0+$|\.0*$/g, '$1');
    }
  

const Spot1 = ({product_name , price  , photo , productIng , id}) => {
  const [amount , setAmount] = useState()
  const [modalActive, setModalActive] = useState(false);
  const formattedPrice = removeTrailingZeros(price.slice(0, -2));

  const items = useSelector(state => state.cardReducer)

  useEffect(() => {
    const item = items[id];
    if (item) {
      setAmount(item.count);
    } else {
      setAmount(0);
    }
  }, [items, id]);

  const deleteFromBasket = (id) => {
    store.dispatch(actionCartChange(-1 , id , product_name ,  formattedPrice , photo))
    setAmount(amount - 1)
    if(store.getState().cardReducer[id].count === 0){
          store.dispatch(actionCartRemove(id))
      }
  }
  const addToBasket = (amount ,id , product_name , formattedPrice , photo) => {
    setAmount(amount + 1)
    store.dispatch(actionCartAdd(1, id , product_name , formattedPrice , photo))
    console.log(id)
  }
  useEffect(() => {
    if (modalActive) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [modalActive])

  return (
    <>
    <div className='category_Item' onClick={() => setModalActive(true)}>
      <div className='category_ItemTop'>
        {
          photo !== null ?  <div className='category_ItemTop_img'>
          {
            photo !== "http://joinposter.com" ? <img src={photo} /> : ''
          }
          </div> : []
        }
        </div>
      <div className='category_item_bottom'>
          <div className='category_ItemTopTITLE'>
              <h6>{product_name}</h6>
              <div className='category_item_desc'>
                  {productIng}
              </div>
          </div>
          <div className='count_ContainerBottom'  onClick={(e) => e.stopPropagation()}>
              <span>
                {formattedPrice + "  грн"}
              </span>
              <div className='count_ContainerBottom_containerOFCOUNT'>
                <button onClick={() => deleteFromBasket(id)} className={amount < 1 ? "visibleMinus" : "minus"}>
                  <span> - </span>
                  </button>
                <div className={amount < 1 ? "visibleMinus" : "count_ContainerBottom_amount"}>{amount}</div>
                <button onClick={() => addToBasket(amount ,id , product_name , formattedPrice , photo)} className="count_plus">
                  <span> + </span>
                </button>
              </div>
          </div>
      </div>
    </div>
    <ProductModal 
        active={modalActive} 
        id={id}
        setModalActive={setModalActive} 
        img={photo}
        name={product_name}
        desc={productIng}
        mainPrice={formattedPrice}
        price={formattedPrice + "  грн"}
        /> 
  </>
  )
}

const CategoryRowItem = ({ products, category_name }) => {
  const selectedSpot = useSelector((state) => state.cardReducer?.spot);
  const [sortedProducts, setSortedProducts] = useState([]);

  // useEffect(() => {
  //   const spots = [null, [], [], [], [], []];
  //   for (const product of Object.values(products || {})) {
  //     for (const spot of Object.values(product.spots || {})) {
  //       if (spot.visible == 1 && (spot.spot_id === selectedSpot?.name)) {
  //         spots[spot.spot_id].push(product);
  //       }
  //     }
  //   }
  //   setSortedProducts(spots);
  // }, [products, selectedSpot]);



  useEffect(() => {
    const spots = new Array(21).fill(null).map(() => []);
    for (const product of Object.values(products || {})) {
      for (const spot of Object.values(product.spots || {})) {
        if (spot.visible == 1 && spot.spot_id >= 1 && spot.spot_id <= 20) {
          spots[spot.spot_id] = spots[spot.spot_id] || [];
          if (spot.spot_id === selectedSpot?.name) {
            spots[spot.spot_id].push(product);
          }
        }
      }
    }
    setSortedProducts(spots);
  }, [products, selectedSpot]);
  

  const categoryProducts = sortedProducts[selectedSpot?.name]?.filter(
    (product) => product.category_name === category_name
  );

  if (categoryProducts?.length === 0) {
    return <div className='notFound'>
          <span>упс , поки що не знайшли в цій категорії нічого</span>
    </div>;
  }

  return (
    <>
      {
        categoryProducts?.map((product) => (
          <Spot1
            key={product.product_id}
            product_name={product.product_name}
            photo={
              product.photo !== null
                ? `http://joinposter.com${product.photo}`
                : null
            }
            productIng={product.product_production_description}
            price={product.price[selectedSpot?.name]}
            id={product.product_id}
          />
        ))}

    </>
  );
};


const CategoryRow = ({ name , id , products , searchInputValue , productsFranchise }) => {
          const div = useRef()
          const [mountSearch , setMountSearch] = useState()
          const selectedSpot = useSelector((state) => state.cardReducer?.spot);
          const [catVisible , setCatVisible] = useState(false)
          // !здесь можешь добавить на поиск приколи

          useEffect(() => {
            if(searchInputValue){
              setMountSearch(searchInputValue)
            }
          }, [searchInputValue , catVisible])

          
          let filteredProducts = products?.filter((product) =>
          product.product_name.toLowerCase().includes(mountSearch?.toLowerCase())
          );

          // if (selectedSpot === "8") {
          //   filteredProducts = productsFranchise?.filter((product) =>
          //   product.product_name.toLowerCase().includes(mountSearch?.toLowerCase())
          //   );

          // }

          const categoryProducts = filteredProducts?.filter(
            (product) => product.category_name === name
          );          
        
          useEffect(() => {
            setCatVisible(categoryProducts?.length > 0);
          }, [categoryProducts]);

          return (
            <div className='category_Row' key={id} id={id} ref={div}>
              <h2>{name}</h2>
              <div className='category_ItemRow'>
                {
                  <CategoryRowItem products={searchInputValue ? filteredProducts : products} category_name={name} setCatVisible={setCatVisible} />
                }
              </div>
            </div>
          );
}

export const CategoryRowConnect = connect(state => ({
  products: state.promise.products?.payload?.products,
  productsFranchise: state.promise.productsFranchise?.payload?.products,
  searchInputValue: state.searchReducer.searchInputValue
}), {
  
})(CategoryRow)     


// const DishCategoryItem = ({ sections }) => {
  // const menuRef = useRef(null);
  // const [sortedSections, setSortedSections] = useState([]);
  // const [activeSection, setActiveSection] = useState("");
//   const [menuItemClicked, setMenuItemClicked] = useState(false);
  
  // const inputRef = useRef(null);
  // const [searchInputActive , setSearchInputActive] = useState(false)
  
  // const searchInputValue = useSelector(
  //   (state) =>  state.searchInput?.searchInputValue
  // );
  // const dispatch = useDispatch();
  
//   useEffect(() => {
//     const handleScroll = () => {
//       const sectionOffsets = sortedSections.map((section) => {
//         const element = document.getElementById(section.category_id);
//         if (element) {
//           return [section.category_id, element.offsetTop, element.offsetTop + element.offsetHeight];
//         }
//         return null;
//       });
  
//       const scrollPosition = window.pageYOffset + window.innerHeight / 2;
  
//       const currentSection = sectionOffsets.find(
//         ([_, offsetTop, offsetBottom]) => scrollPosition >= offsetTop && scrollPosition <= offsetBottom
//       );
  
//       if (currentSection) {
//         setActiveSection(currentSection[0]);
//       } else {
//         setActiveSection("");
//       }
//     };
  
//     window.addEventListener("scroll", handleScroll);
  
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [sortedSections]);
  
//   useEffect(() => {
//     // const filteredSections = sections?.filter((section) => !["Подарунки", "Кава", "Другі страви ", "Тайське смажене морозиво", "Чай"].includes(section.category_name));
//     setSortedSections(sections);
//   }, [sections]);
  
  // useEffect(() => {
  //   const activeButton = menuRef.current.querySelector(`#section-${activeSection}`);
  //   if (activeButton && !menuItemClicked) { // only scroll if no menu item is clicked
  //     activeButton.scrollIntoView({ behavior: "smooth" });
  //     activeButton.focus();
  //   } else {
  //     setMenuItemClicked(false); // reset the flag
  //   }
  // }, [activeSection, menuItemClicked]);
  
  // useEffect(() => {
  //   // Add an event listener to the document object
  //   document.addEventListener("click", handleClickOutside);
  //   // Clean up the event listener when the component unmounts
  //   return () => document.removeEventListener("click", handleClickOutside);
  // }, []);
  
  // function handleClickOutside(event) {
  //   if (inputRef.current && !inputRef.current.contains(event.target)) {
  //     // Check if the click target is not the search icon or its container
  //     const isSearchIconClicked = event.target.classList.contains("searchIcon") || event.target.closest(".dishCategoryItem") === menuRef.current;
  //     if (!isSearchIconClicked) {
  //       setSearchInputActive(false);
  //       dispatch(setSearchInput(""));
  //     }
  //   }
  // }
  
  // function handleInputChange(event) {
  //   dispatch(setSearchInput(event.target.value));
  // }

//   const handleClick = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       setMenuItemClicked(true);
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <nav ref={menuRef}>
      // {
      //   searchInputActive ?
      //     <Input
      //       sx={{backgroundColor: "white" , color: "white"}}
      //       ref={inputRef}
      //       value={searchInputValue}
      //       onChange={handleInputChange}
      //       endDecorator={
      //         <CloseIcon
      //           onClick={() => {setSearchInputActive(false)}}
      //           sx={{backgroundColor: 'inherit',color: "red"}}
      //         />}
      //     />
      //     :
//       <ul className="dishCategoryItem">
//         <SearchRoundedIcon className="searchIcon" sx={{ fontSize: 40 }} onClick={() => setSearchInputActive(true)}/>
//         {sortedSections?.map((section) => (
//           <li key={section.category_id} className="scroll-section">
//             <button
              // id={`section-${section.category_id}`}
              // className={
              //   activeSection === section.category_id
              //     ? "dishCategoryItemButton nav-scroller__item_active"
              //     : "dishCategoryItemButton"
              // }
//               onClick={() => {handleClick(section.category_id)}}
//             >
//               {section.category_name}
//             </button>
//           </li>
//         ))}
//       </ul>
//       }
//     </nav>
//   );
// };



const DishCategoryItem = ({ sections }) => {
  const menuRef = useRef(null);
  const [sortedSections, setSortedSections] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const inputRef = useRef(null);
  const [searchInputActive , setSearchInputActive] = useState(false)
  const [isClick, setIsClick] = useState(false); 

  const [backgroundColor, setBackgroundColor] = React.useState('white');

  const searchInputValue = useSelector(
    (state) =>  state.searchInput?.searchInputValue
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (!isClick) { // Only update active section if scrolling is not triggered by a click
        const sectionOffsets = sortedSections?.map((section) => {
          const element = document.getElementById(section.category_id);
          if (element) {
            return [section.category_id, element.offsetTop, element.offsetTop + element.offsetHeight];
          }
          return null;
        });

        const scrollPosition = window.pageYOffset + window.innerHeight / 2;

        const currentSection = sectionOffsets.find(
          ([_, offsetTop, offsetBottom]) => scrollPosition >= offsetTop && scrollPosition <= offsetBottom
        );

        if (currentSection) {
          setActiveSection(currentSection[0]);
        } else {
          setActiveSection("");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sortedSections, isClick]); // Add isClick to dependencies

  useEffect(() => {
    const filteredSections = sections?.filter((section) => !["Подарунки", "Кава", "Другі страви ", "Тайське смажене морозиво", "Чай"].includes(section.category_name));
    setSortedSections(filteredSections);
  }, [sections]);

  useEffect(() => {
    const activeButton = menuRef.current.querySelector(`#section-${activeSection}`);
    if (activeButton) {
      setIsClick(true); // Set isClick to true before scrolling
      activeButton.scrollIntoView({ behavior: "smooth" });
      activeButton.focus();
      setTimeout(() => setIsClick(false), 1000); // Add a delay to ensure scrolling is complete before setting isClick to false
    }
  }, [activeSection]);

  const handleClick = (id) => {
    setIsClick(true); // Set isClick to true before scrolling
    const targetElement = document.getElementById(id);
    targetElement.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setIsClick(false), 700); // Add a delay to ensure scrolling is complete before setting isClick to false
  };

  function handleInputChange(event) {
    dispatch(setSearchInput(event.target.value));
  }

  const handleCloseInput = () => {
    setSearchInputActive(false)
    dispatch(setSearchInput(""));
  }

  const handleInputBlur = () => {
    setBackgroundColor('white');
  };

  return (
    <nav ref={menuRef}>
      {
        searchInputActive ?
        <div style={{marginLeft: "40px"}}>
          <Input
            sx={{ color: "white", outline: "none", 
            "&:hover": {backgroundColor: "white"  , outline: 'none' ,borderColor: "red"},
            "&:focus": {backgroundColor: "white"  ,  outlineWidth: 0, color: "white"},
            '& .MuiInputBase-input': {
              borderBottomColor: 'red' // change the border color of the input field to red
            },
            '& .MuiInputBase-root': {
              '&:before': {
                borderBottomColor: 'red' // change the color of the underline before input focus to red
              }
            }
          }}
            ref={inputRef}
            value={searchInputValue}
            onBlur={handleInputBlur}
            onChange={handleInputChange}
            endDecorator={
              <CloseIcon
                onClick={() => handleCloseInput()}
                sx={{backgroundColor: 'inherit',color: "red"}}
              />}
          />
        </div>
          :
      <ul className="dishCategoryItem">
        <SearchRoundedIcon className="searchIcon" sx={{ fontSize: 40 }} onClick={() => setSearchInputActive(true)}/>
        {sortedSections?.map((section) => (
          <li key={section.category_id} className="scroll-section">
            <button
              id={`section-${section.category_id}`}
              className={
                activeSection === section.category_id 
                  ? "dishCategoryItemButton nav-scroller__item_active"
                  : "dishCategoryItemButton"
              }
              onClick={() => handleClick(section.category_id)}
            >
              {section.category_name}
            </button>
          </li>
        ))}
      </ul>
    }
    </nav>
  );
};




const DishesCategory = ({categories}) => {
  const [cat , setCat] = useState()
  const [sortedCat  , setSortedCat] = useState()
  const [ing , setIng] = useState()
  
  const div = useRef();
  
  useLayoutEffect(() => {
    const divAnimate = div.current.getBoundingClientRect().top;
    const onScroll = () => {
      if (divAnimate < window.scrollY) {
        // console.log("ok");
        div.current.style.position = "fixed";
        div.current.style.top = 0;
        div.current.style.paddingTop = "10px";
        // div.current.style.boxShadow = "0px 0px 5px 0px #CBC8C8";
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


  useEffect(() => {
    const filteredSections = cat?.filter((section) => !["Подарунки", "Кава", "Другі страви ", "Тайське смажене морозиво", "Чай"].includes(section.category_name));
    setSortedCat(filteredSections);
  }, [cat]);
  

  return (
    <div className='dishes_content'>
        <div className='dishes_wrapper' ref={div} >
            <div className='dishes_container' id="scrollNavbar">
              <DishCategoryItem sections={cat} />
            </div>
        </div>

        <div className='category_with_dishes'>
            {
              sortedCat?.map((item) => ( 
              <CategoryRowConnect name={item.category_name} key={item.category_id} id={item.category_id} ing={ing}/>
              ))
            }
        </div>
    </div>
  )
};
// завтра поправить верстку на нормальный лад 
// перейти в баскет и сделать валидацию форм 

export const DishesConnect = connect(state => ({
  categories: state.promise?.categories?.payload?.categories,
}), {
  
})(DishesCategory) 















// const CategoryRowItem = ({selectedSpot,products  , category_name}) =>  {
//     const [changePos , setChangePos] = useState(false)
//     const [amount , setAmount] = useState(0)
//     const [open , setOpen] = useState(false)

//     const [currSpot , setCurrSpot] = useState()
//     const [prd , setProd] = useState([])

//     const rest1 = []
//     const rest2 = []
//     const rest3 = []
//     const rest4 = []
//     const [spot1Visible , setSpot1Visible] = useState(false);
//     const [spot2Visible , setSpot2Visible] = useState(false);
//     const [spot3Visible , setSpot3Visible] = useState(false);
//     const [spot4Visible , setSpot4Visible] = useState(false);
//     const [spot5Visible , setSpot5Visible] = useState(false);
 
//     const sortProducts = (products) => {
//       for(let [key , value] of Object.entries(products)){
//         for(let [k , v] of Object.entries(value.spots)){
//           if(v.spot_id == 1 && v.visible == 1){
//             rest1.push(value)
//           }
//           if(v.spot_id == 2 && v.visible == 1){
//             rest2.push(value)
//           }
//           if(v.spot_id == 3 && v.visible == 1){
//             rest3.push(value)
//           }
//           if(v.spot_id == 4 && v.visible == 1){
//             rest4.push(value)
//           }
//         }
//       }
//     }
    
//     sortProducts(prd)

//     useEffect(() => {
//       setCurrSpot(selectedSpot)
//     }, [selectedSpot])

//     useEffect(() => {
//       if(products !== null){
//         setProd(products || [])
//       }
//     }, [products])
    

//     useEffect(() => {
//         currSpot?.name == 1 ? setSpot1Visible(true): setSpot1Visible(false);
//         currSpot?.name == 2 ? setSpot2Visible(true): setSpot2Visible(false);
//         currSpot?.name == 3 ? setSpot3Visible(true): setSpot3Visible(false);
//         currSpot?.name == 4 ? setSpot4Visible(true): setSpot4Visible(false);
//         currSpot?.name == 5 ? setSpot5Visible(true): setSpot5Visible(false);

//     }, [currSpot])


//     return (
//           <>  
//               {
//                 spot1Visible === true ? rest1?.map((item) => (item.category_name === category_name ? 
//                 <Spot1 
//                   key={item.product_id} 
//                   product_name={item.product_name}
//                   photo={item.photo !== null ? "http://joinposter.com"  + item.photo : null}
//                   productIng={item.product_production_description} 
//                   price={item.price} 
//                   id={item.product_id}
//                   />
//                   : [])) : []
//               }
//           </>
//         )
//       }