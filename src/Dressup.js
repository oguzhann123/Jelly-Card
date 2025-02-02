import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import "./Barbie.css";

const Dressup = () => {

  const [selectedBackground, setSelectedBackground] = useState("/images/backside.gif" );

  // const [selectedHead, setSelectedHead] = useState({ img: "/head/defaulthead.png", top: "-50px", left: "", width: "400px" });

  // const [selectedBody, setSelectedBody] = useState({ img: "/legs/defaultleg.png", top: "25px", left: "", width: "400px" });
  const [selectedHead, setSelectedHead] = useState(null);

  const [selectedBody, setSelectedBody] = useState(null);

  const [selectedEyes, setSelectedEyes] = useState(null); // New state

  const [selectedMouth, setSelectedMouth] = useState(null);

  const [selectedFacialHair, setSelectedFacialHair] = useState(null);
  const [selectedHats, setSelectedHats] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState(null);


  const [selectedNecklace, setSelectedNecklace] = useState(null);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  
  const [downloadCount, setDownloadCount] = useState(0); // Yeni state
  
  
 
  

    

  const characterRef = useRef(null);

  const [backImage] = useState("/images/backside.gif"); // Arka yüz görseli
  const [isFlipped, setIsFlipped] = useState(false); // Arka yüz görünürlüğü

 

  const [borderColor, setBorderColor] = useState("#FF69B4"); // Başlangıç rengi pembe


  const handleMouseMove = (e) => {
    if (isFlipped) return; // Eğer kart çevrilmişse, fare hareketini engelle
    const card = characterRef.current;
    const rect = card.getBoundingClientRect();
  
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    const centerX = rect.width / 4;
    const centerY = rect.height / 4;
  
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
  
    const rotateX = deltaY * 10;
    const rotateY = -deltaX * 10;
  
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    const card = characterRef.current;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };
  
  const handleTouchMove = (e) => {
    if (isFlipped) return; // Eğer kart çevrilmişse, dokunma hareketini engelle
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handleMouseMove({
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
    }
  };
  

  
  // Flip işlemi
  const handleFlip = () => {
    setIsFlipped((prev) => !prev); // Kartın dönme durumunu değiştir
    const card = characterRef.current;
    card.style.transition = "transform 0.6s"; // Flip animasyon süresi
  };
  

  const backgrounds = [
    { id: 1, img: "/background/background1.avif" },
    { id: 2, img: "/background/background2.jpg" },
    { id: 3, img: "/background/background3.avif" },
    { id: 4, img: "/background/background4.avif" },
    { id: 5, img: "/background/background5.jpg" },
    { id: 6, img: "/background/background6.jpg" },
    { id: 7, img: "/background/background7.avif" },
    { id: 8, img: "/background/background8.avif" },
    { id: 9, img: "/background/background9.avif" },
    { id: 10, img: "/background/background10.avif" },
    { id: 11, img: "/background/background11.avif" },
    { id: 12, img: "/background/background12.avif" },
    { id: 13, img: "/background/background13.avif" },
    { id: 14, img: "/background/background14.avif" },
    { id: 15, img: "/background/background15.png" },

  ];


  const heads = [
    { id: 1, img: "/head/h2.png", top: "10%", width: "208px", left: "50%", shape: "round" },
    { id: 2, img: "/head/h1.png", top: "10%", width: "208px", left: "50%", shape: "round" },
    { id: 3, img: "/head/h3.png", top: "10%", width: "208px", left: "50%", shape: "round" },
    { id: 4, img: "/head/h4.png", top: "10%", width: "208px", left: "50%", shape: "round" },
    { id: 5, img: "/head/h5.png", top: "10%", width: "208px", left: "51%", shape: "long" },
    { id: 6, img: "/head/h6.png", top: "10%", width: "208px", left: "51%", shape: "long" },
    { id: 7, img: "/head/h7.png", top: "10%", width: "208px", left: "51%", shape: "long" },
    { id: 8, img: "/head/h8.png", top: "8%", width: "208px", left: "50%", shape: "round" },
    { id: 9, img: "/head/h9.png", top: "9%", width: "208px", left: "50%", shape: "round" },
    { id: 10, img: "/head/h10.png", top: "8%", width: "208px", left: "50%", shape: "yellow" },
    { id: 11, img: "/head/h11.png", top: "8%", width: "208px", left: "50%", shape: "round" },
  ];

  const bodies = [
    { id: 1, img: "/legs/p1.png", top: "82px", width: "240px", left: "45%",rotate:"2deg",shape: "pink"},
    { id: 2, img: "/legs/p2.png", top: "79px", width: "240px", left: "50%",shape:"pink1"},
    { id: 3, img: "/legs/p3.png", top: "91px", width: "240px", left: "50%",rotate:"0deg",shape:"pink2"},
    { id: 4, img: "/legs/p4.png", top: "90px", width: "240px", left: "47%",shape: "pink3"}, //!pink
    { id: 5, img: "/legs/p5.png", top: "93px", width: "240px", left: "50%",shape: "pink4"},
    { id: 6, img: "/legs/p6.png", top: "95px", width: "240px", left: "51%",shape: "pink5"},
    { id: 7, img: "/legs/p7.png", top: "90px", width: "240px", left: "41%",shape:"pink6"},
    { id: 8, img: "/legs/px.png", top: "98px", width: "240px", left: "51%",shape:"pink7"},

    { id: 9, img: "/legs/r8.png", top: "103px", width: "240px", left: "45%",rotate: "",shape: "robotic"},
    { id: 10, img: "/legs/r9.png", top: "89px", width: "240px", left: "50%",rotate: "",shape: "robotic1"},
    { id: 11, img: "/legs/r10.png", top: "112px", width: "240px", left: "50%",rotate: "",shape: "robotic2"},
    { id: 12, img: "/legs/r11.png", top: "110px", width: "240px", left: "46%",rotate: "",shape: "robotic3"},//! robotic
    { id: 13, img: "/legs/r12.png", top: "103px", width: "240px", left: "51%",rotate: "",shape: "robotic4"},
    { id: 14, img: "/legs/r13.png", top: "110px", width: "240px", left: "49%",rotate: "2deg",shape: "robotic5"},
    { id: 15, img: "/legs/r14.png", top: "112px", width: "240px", left: "41%",rotate: "",shape: "robotic6"},

    { id: 16, img: "/legs/rr15.png", top: "75px", width: "320px", left: "52%",rotate:"2deg",shape:"rob"},
    { id: 17, img: "/legs/rr16.png", top: "78px", width: "320px", left: "53%",rotate:"1deg",shape:"rob1"},
    { id: 18, img: "/legs/rr17.png", top: "75px", width: "320px", left: "52%",rotate:"0deg",shape:"rob2"},  //!robotic2
    { id: 19, img: "/legs/rr18.png", top: "72px", width: "320px", left: "51%",rotate:"1deg",shape:"rob3"},
    { id: 20, img: "/legs/rr19.png", top: "75px", width: "320px", left: "52%",rotate:"",shape:"rob4"},
    { id: 21, img: "/legs/rr20.png", top: "75px", width: "320px", left: "52%",rotate:"",shape:"rob5"},
    { id: 22, img: "/legs/rr21.png", top: "75px", width: "320px", left: "52%",rotate:"",shape:"rob6"},
    { id: 23, img: "/legs/rry.png", top: "75px", width: "320px", left: "52%",rotate:"",shape:"rob7"},

    { id: 24, img: "/legs/blue22.png", top: "78px", width: "320px", left: "50%",rotate: "",shape:"blue"},
    { id: 25, img: "/legs/blue23.png", top: "78px", width: "320px", left: "51%",rotate: "1deg",shape:"blue1"},
    { id: 26, img: "/legs/blue24.png", top: "82px", width: "320px", left: "51%",rotate: "-1deg",shape:"blue2"},
    { id: 27, img: "/legs/blue25.png", top: "78px", width: "320px", left: "50%",rotate: "1deg",shape:"blue3"},//!blue
    { id: 28, img: "/legs/blue26.png", top: "82px", width: "320px", left: "51.5%",rotate: "",shape:"blue4"},
    { id: 29, img: "/legs/blue27.png", top: "78px", width: "320px", left: "51%",rotate: "",shape:"blue5"},
    { id: 30, img: "/legs/blue28.png", top: "80px", width: "320px", left: "51%",rotate: "",shape:"blue6"},
    { id: 31, img: "/legs/bluez.png", top: "118px", width: "240px", left: "51%",rotate: "0deg",shape:"blue7"},

    { id: 32, img: "/legs/y29.png", top: "120px", width: "240px", left: "51%",rotate: "",shape:"yellow"},
    { id: 33, img: "/legs/y30.png", top: "120px", width: "240px", left: "51%",rotate: "",shape:"yellow1"},
    { id: 34, img: "/legs/y31.png", top: "116px", width: "240px", left: "50%",rotate: "",shape:"yellow2"},//!yellow
    { id: 35, img: "/legs/y32.png", top: "120px", width: "240px", left: "51%",rotate: "",shape:"yellow3"},
    { id: 36, img: "/legs/y33.png", top: "120px", width: "240px", left: "51%",rotate: "",shape:"yellow4"},
    { id: 37, img: "/legs/y34.png", top: "117px", width: "240px", left: "50%",rotate: "",shape:"yellow5"},
    { id: 38, img: "/legs/yh.png", top: "118px", width: "240px", left: "51%",rotate: "",shape:"yellow6"},

    { id: 39, img: "/legs/leg37.png", top: "75px", width: "240px", left: "51%",shape:"box"}, //!trash box

  ];

    // Yeni gözler (Eyes) verisi
    const eyes = [
      { id: 1, img: "/eyesandglasses/eye1.png", top: "30px", width: "240px", left: "51%"},
      { id:2, img: "/eyesandglasses/eye2.png", top: "30px", width: "200px", left: "49%"},
      { id:3, img: "/eyesandglasses/eye3.png", top: "30px", width: "200px", left: "49%"},
      { id: 4, img: "/eyesandglasses/eye4.png", top: "10px", width: "240px", left: "48%"},
      { id: 5, img: "/eyesandglasses/eye5.png", top: "10px", width: "240px", left: "48%"},
      { id: 6, img: "/eyesandglasses/eye6.png", top: "30px", width: "210px", left: "48%"},
      { id: 7, img: "/eyesandglasses/eye7.png", top: "22px", width: "230px", left: "48%"},
      { id: 8, img: "/eyesandglasses/eye8.png", top: "40px", width: "240px", left: "52%"},
      { id: 9, img: "/eyesandglasses/eye9.png", top: "55px", width: "240px", left: "51%"},
      { id: 10, img: "/eyesandglasses/eye10.png", top: "5px", width: "270px", left: "49%"},

      { id: 11, img: "/eyesandglasses/eye11.png", top: "43px", width: "170px", left: "49%"},
      { id: 12, img: "/eyesandglasses/eye12.png", top: "32px", width: "200px", left: "50%"},
      { id: 13, img: "/eyesandglasses/eye13.png", top: "35px", width: "200px", left: "49%"},
      { id: 14, img: "/eyesandglasses/eye14.png", top: "35px", width: "200px", left: "49%"},
      { id: 15, img: "/eyesandglasses/eye15.png", top: "40px", width: "180px", left: "50%"},
      { id: 16, img: "/eyesandglasses/eye16.png", top: "35px", width: "200px", left: "49%"},
      { id: 17, img: "/eyesandglasses/eye17.png", top: "50px", width: "180px", left: "49%"},

    ];
  
    const mouths = [
      { id: 1, img: "/mouths/mouth1.png", top: "88px", width: "150px", left: "51%",rotate:"1deg"},
      { id: 2, img: "/mouths/mouth2.png", top: "89px", width: "150px", left: "50%",rotate:"1deg"},
      { id: 3, img: "/mouths/mouth3.png", top: "88px", width: "150px", left: "51%",rotate:"-1deg"},
      { id: 4, img: "/mouths/mouth4.png", top: "105px", width: "130px", left: "51%",rotate:"1deg"},
      { id: 5, img: "/mouths/mouth5.png", top: "89px", width: "150px", left: "50%",rotate:"1deg"},
      { id: 6, img: "/mouths/mouth6.png", top: "78px", width: "180px", left: "51%",rotate:"1deg"},
      { id: 7, img: "/mouths/mouth7.png", top: "90px", width: "150px", left: "50%",rotate: "-1deg"},
      { id: 8, img: "/mouths/mouth8.png", top: "93px", width: "150px", left: "51%",rotate:"1deg"},
      { id: 9, img: "/mouths/mouth9.png", top: "78px", width: "180px", left: "51%",rotate:"1deg"},
      { id: 10, img: "/mouths/mouth10.png", top: "92px", width: "150px", left: "51%",rotate:"1deg"},
      { id: 11, img: "/mouths/mouth11.png", top: "79px", width: "180px", left: "51%",rotate:"1deg"},
      { id: 12, img: "/mouths/mouth12.png", top: "92px", width: "150px", left: "51%",rotate:"1deg"},
      { id: 13, img: "/mouths/mouth13.png", top: "90px", width: "160px", left: "51%",rotate:"1deg"},
      { id: 14, img: "/mouths/mouth14.png", top: "92px", width: "150px", left: "51%",rotate:"1deg"},
      { id: 15, img: "/mouths/mouth15.png", top: "94px", width: "150px", left: "51%",rotate:"1deg"},
      { id: 16, img: "/mouths/mouth16.png", top: "82px", width: "150px", left: "49%",rotate:"1deg"},
      { id: 17, img: "/mouths/mouth17.png", top: "109px", width: "100px", left: "50%",rotate:"1deg"},



    ];
 
    const facialHairs = [
      { id: 1, img: "/facialhairs/facialhair1.png", top: "-13px", width: "250px", left: "50%"},
      { id: 2, img: "/facialhairs/facialhair2.png", top: "2px", width: "220px", left: "49%"},
      { id: 3, img: "/facialhairs/facialhair3.png", top: "25px", width: "180px", left: "49.9%"},
      { id: 4, img: "/facialhairs/facialhair4.png", top: "12px", width: "200px", left: "49.9%"},
      { id: 5, img: "/facialhairs/facialhair5.png", top: "-4px", width: "240px", left: "49.2%"},
      { id: 6, img: "/facialhairs/facialhair6.png", top: "20px", width: "200px", left: "50.5%"},



    ];

    const hats = [
      {
        id: 1,
        img: "/hatsandmasks/hat1.png",
        adjustments: {
          round: { top: "3px", width: "210px", left: "48%", rotate: "-1deg" },
          long: { top: "11px", width: "180px", left: "48%", rotate: "-2deg" },
          yellow: { top: "3px", width: "210px", left: "48%", rotate: "-1deg" },

        },
      },
      {
        id: 2,
        img: "/hatsandmasks/hat2.png",
        adjustments: {
          round: { top: "-44px", width: "250px", left: "49%", rotate: "-1.4deg" },
          long: { top: "-38px", width: "230px", left: "49%", rotate: "-2deg" },
          yellow: { top: "-44px", width: "250px", left: "49%", rotate: "-1.4deg" },

        },
      },
      {
        id: 3,
        img: "/hatsandmasks/hat3.png",
        adjustments: {
          round: { top: "-25px", width: "250px", left: "50%", rotate: "-3deg" },
          long: { top: "-15px", width: "235px", left: "50%", rotate: "-3deg" },
          yellow: { top: "-25px", width: "250px", left: "50%", rotate: "-3deg" },

        },
      },
      {
        id: 4,
        img: "/hatsandmasks/hat4.png",
        adjustments: {
          round: { top: "-4px", width: "230px", left: "50%", rotate: "-1deg" },
          long: { top: "9px", width: "200px", left: "50%", rotate: "-1deg" },
          yellow: { top: "-4px", width: "230px", left: "50%", rotate: "-1deg" },

        },
      },
      {
        id: 5,
        img: "/hatsandmasks/hat5.png",
        adjustments: {
          round: { top: "14px", width: "200px", left: "49%", rotate: "-2deg" },
          long: { top: "21px", width: "180px", left: "50%", rotate: "-2deg" },
          yellow: { top: "14px", width: "200px", left: "49%", rotate: "-2deg" },


        },
      },
      {
        id: 6,
        img: "/hatsandmasks/hat6.png",
        adjustments: {
          round: { top: "-16px", width: "200px", left: "49%", rotate: "0deg" },
          long: { top: "-7px", width: "180px", left: "49%", rotate: "-1deg" },
          yellow: { top: "-16px", width: "200px", left: "49%", rotate: "0deg" },

        },
      },
      {
        id: 7,
        img: "/hatsandmasks/hat7.png",
        adjustments: {
          round: { top: "-5px", width: "200px", left: "50%", rotate: "0deg" },
          long: { top: "-10px", width: "200px", left: "51%", rotate: "0deg" },
          yellow: { top: "-5px", width: "200px", left: "50%", rotate: "0deg" },

        },
      },
      {
        id: 8,
        img: "/hatsandmasks/hat8.png",
        adjustments: {
          round: { top: "-60px", width: "300px", left: "49%", rotate: "0deg" },
          long: { top: "-60px", width: "300px", left: "49%", rotate: "0deg" },
          yellow: { top: "-60px", width: "300px", left: "49%", rotate: "0deg" },

        },
      },
      {
        id: 9,
        img: "/hatsandmasks/hat9.png",
        adjustments: {
          round: { top: "22px", width: "240px", left: "47%", rotate: "-1deg" },
          long: { top: "36px", width: "210px", left: "48%", rotate: "-1deg" },
          yellow: { top: "22px", width: "240px", left: "47%", rotate: "-1deg" },

        },
      },
      {
        id: 10,
        img: "/hatsandmasks/hat10.png",
        adjustments: {
          round: { top: "30px", width: "210px", left: "48%", rotate: "0deg" },
          long: { top: "30px", width: "220px", left: "47%", rotate: "0deg" },
          yellow: { top: "30px", width: "210px", left: "48%", rotate: "0deg" },

        },
      },
      {
        id: 11,
        img: "/hatsandmasks/hat11.png",
        adjustments: {
          round: { top: "40px", width: "200px", left: "47%", rotate: "0deg" },
          long: { top: "36px", width: "200px", left: "48%", rotate: "0deg" },
          yellow: { top: "36px", width: "200px", left: "47%", rotate: "0deg" },

          
        },
      },
      {
        id: 12,
        img: "/hatsandmasks/hat12.png",
        adjustments: {
          round: { top: "40px", width: "200px", left: "48%", rotate: "1deg" },
          long: { top: "36px", width: "200px", left: "48%", rotate: "0deg" },
          yellow: { top: "40px", width: "200px", left: "48%", rotate: "1deg" },

        },
      },
      {
        id: 13,
        img: "/hatsandmasks/hat13.png",
        adjustments: {
          round: { top: "20px", width: "200px", left: "50%", rotate: "0deg" },
          long: { top: "20px", width: "200px", left: "51", rotate: "0deg" },
          yellow: { top: "15px", width: "210px", left: "50%", rotate: "0deg" },

        },
      },
      {
        id: 14,
        img: "/hatsandmasks/hat14.png",
        adjustments: {
          round: { top: "20px", width: "250px", left: "48%", rotate: "-1deg" },
          long: { top: "20px", width: "250px", left: "51", rotate: "0deg" },
          yellow: { top: "20px", width: "250px", left: "48%", rotate: "0deg" },

        },
      },
      {
        id: 15,
        img: "/hatsandmasks/hat15.png",
        adjustments: {
          round: { top: "30px", width: "215px", left: "47%", rotate: "0deg" },
          long: { top: "25px", width: "220px", left: "49", rotate: "0deg" },
          yellow: { top: "30px", width: "215px", left: "47%", rotate: "0deg" },

        },
      },
      {
        id: 16,
        img: "/hatsandmasks/hat16.png",
        adjustments: {
          round: { top: "34px", width: "210px", left: "47%", rotate: "0deg" },
          long: { top: "40px", width: "206px", left: "48%", rotate: "1deg" },
          yellow: { top: "34px", width: "210px", left: "47%", rotate: "0deg" },

        },
      },

      {
        id: 17,
        img: "/hatsandmasks/hat17.png",
        adjustments: {
          round: { top: "50px", width: "200px", left: "50%", rotate: "0deg" },
          long: { top: "50px", width: "200px", left: "50%", rotate: "0deg" },
          yellow: {top: "50px", width: "200px", left: "50%", rotate: "0deg" },

        },
      },
      {
        id: 18,
        img: "/hatsandmasks/hat18.png",
        adjustments: {
          round: { top: "50px", width: "200px", left: "50%", rotate: "0deg" },
          long: { top: "50px", width: "200px", left: "50%", rotate: "1deg" },
          yellow: { top: "50px", width: "200px", left: "50%", rotate: "0deg" },

        },
      },
      {
        id: 19,
        img: "/hatsandmasks/hat19.png",
        adjustments: {
          round: { top: "46px", width: "210px", left: "51%", rotate: "0deg" },
          long: { top: "64px", width: "180px", left: "51%", rotate: "0deg" },
          yellow: { top: "45px", width: "220px", left: "51%", rotate: "0deg" },

        },
      },

      {
        id: 20,
        img: "/hatsandmasks/hat20.png",
        adjustments: {
          round: { top: "-56px", width: "280px", left: "48%", rotate: "0deg" },
          long: { top: "-56px", width: "280px", left: "48%", rotate: "0deg" },
          yellow: { top: "-56px", width: "280px", left: "48%", rotate: "0deg" },

        },
      },
      
      {
        id: 21,
        img: "/hatsandmasks/hat21.png",
        adjustments: {
          round: { top: "-12px", width: "230px", left: "50%", rotate: "0deg" },
          long: { top: "-12px", width: "230px", left: "50%", rotate: "0deg" },
          yellow: { top: "-12px", width: "230px", left: "50%", rotate: "0deg" },

        },
      },
     


    ];
    


  const necklaces = [
    {
      id: 1,
      img: "/necklaces/necklaces1.png",
      adjustments: {
        pink: { top: "100px", width: "150px", left: "51%", rotate: "2deg" },
        pink1: { top: "102px", width: "150px", left: "51%", rotate: "2deg" },
        pink2:{ top: "100px", width: "150px", left: "51%", rotate: "2deg" },
        pink3:{ top: "98px", width: "150px", left: "51%", rotate: "2deg" },
        pink4:{ top: "100px", width: "150px", left: "51%", rotate: "2deg" },
        pink5:{ top: "100px", width: "150px", left: "51%", rotate: "2deg" },
        pink6:{ top: "100px", width: "150px", left: "51%", rotate: "2deg" },
        pink7:{ top: "100px", width: "150px", left: "51%", rotate: "0deg" },

      robotic:{top: "100px", width: "150px", left: "51%", rotate: "2deg" },
      robotic1:{top: "100px", width: "150px", left: "51%", rotate: "2deg" },
      robotic2:{top: "100px", width: "150px", left: "51%", rotate: "2deg" },
      robotic3:{top: "100px", width: "150px", left: "51%", rotate: "2deg" },
      robotic4:{top: "100px", width: "150px", left: "51%", rotate: "2deg" },
      robotic5:{top: "100px", width: "150px", left: "51%", rotate: "2deg" },
      robotic6:{top: "100px", width: "150px", left: "51%", rotate: "2deg" },


      rob:{top: "100px", width: "150px", left: "51%", rotate: "2deg" },
      rob1:{top: "102px", width: "150px", left: "51%", rotate: "2deg" },
      rob2:{top: "100px", width: "150px", left: "51%", rotate: "2deg" },
      rob3:{top: "98px", width: "150px", left: "50%", rotate: "2deg" },
      rob4:{top: "100px", width: "150px", left: "51%", rotate: "2deg" },
      rob5:{top: "100px", width: "150px", left: "51%", rotate: "0deg" },
      rob6:{top: "100px", width: "150px", left: "51%", rotate: "0deg" },
      rob7:{top: "100px", width: "150px", left: "51%", rotate: "0deg" },


      blue:{top: "100px", width: "150px", left: "50%", rotate: "0deg" },
      blue1:{top: "98px", width: "150px", left: "51%", rotate: "2deg" },
      blue2:{top: "100px", width: "150px", left: "51%", rotate: "2deg" },
      blue3:{top: "98px", width: "150px", left: "50%", rotate: "0deg" },
      blue4:{top: "20px", width: "150px", left: "51%", rotate: "0deg" },
      blue5:{top: "98px", width: "150px", left: "51%", rotate: "0deg" },
      blue6:{top: "100px", width: "150px", left: "51%", rotate: "0deg" },
      blue7:{top: "100px", width: "150px", left: "51%", rotate: "2deg" },


      yellow:{top: "100px", width: "150px", left: "50%", rotate: "2deg" },
      yellow1:{top: "100px", width: "150px", left: "50%", rotate: "2deg" },
      yellow2:{top: "100px", width: "150px", left: "50%", rotate: "2deg" },
      yellow3:{top: "100px", width: "150px", left: "50%", rotate: "2deg" },
      yellow4:{top: "100px", width: "150px", left: "50%", rotate: "0deg" },
      yellow5:{top: "98px", width: "150px", left: "50%", rotate: "0deg" },
      yellow6:{top: "99px", width: "150px", left: "50%", rotate: "0deg" },

      box:{top: "101px", width: "150px", left: "49%", rotate: "2deg" },

      },
    },
    
    {
      id: 2,
      img: "/necklaces/necklaces2.png",
      adjustments: {
        pink: { top: "128px", width: "130px", left: "50%", rotate: "0deg" },
        pink1: { top: "130px", width: "130px", left: "50%", rotate: "0deg" },
        pink2: { top: "128px", width: "130px", left: "50%", rotate: "0deg" },
        pink3: { top: "125px", width: "130px", left: "50%", rotate: "0deg" },
        pink4: { top: "128px", width: "130px", left: "50%", rotate: "0deg" },
        pink5: { top: "128px", width: "130px", left: "50%", rotate: "0deg" },
        pink6: { top: "128px", width: "130px", left: "50%", rotate: "0deg" },
        pink7: { top: "128px", width: "130px", left: "50%", rotate: "0deg" },

        robotic:{ top: "125px", width: "130px", left: "50%", rotate: "0deg" },
        robotic1:{ top: "130px", width: "130px", left: "50%", rotate: "0deg" },
        robotic2:{ top: "130px", width: "130px", left: "50%", rotate: "0deg" },
        robotic3:{ top: "127px", width: "130px", left: "49%", rotate: "0deg" },
        robotic4:{ top: "130px", width: "130px", left: "50%", rotate: "0deg" },
        robotic5:{ top: "128px", width: "130px", left: "50%", rotate: "0deg" },
        robotic6:{ top: "128px", width: "130px", left: "50%", rotate: "0deg" },

        rob:{ top: "127px", width: "130px", left: "50%", rotate: "0deg" },
        rob1:{ top: "130px", width: "130px", left: "50%", rotate: "0deg" },
        rob2:{ top: "126px", width: "130px", left: "50%", rotate: "0deg" },
        rob3:{ top: "125px", width: "130px", left: "49%", rotate: "0deg" },
        rob4:{ top: "128px", width: "130px", left: "50%", rotate: "0deg" },
        rob5:{ top: "128px", width: "130px", left: "50%", rotate: "0deg" },
        rob6:{ top: "128px", width: "130px", left: "50%", rotate: "0deg" },
        rob7:{ top: "128px", width: "130px", left: "50%", rotate: "0deg" },

        blue:{ top: "125px", width: "130px", left: "50%", rotate: "0deg" },
        blue1:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        blue2:{ top: "126px", width: "130px", left: "50%", rotate: "0deg" },
        blue3:{ top: "125px", width: "130px", left: "49%", rotate: "0deg" },
        blue4:{ top: "128px", width: "130px", left: "50%", rotate: "0deg" },
        blue5:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        blue6:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        blue7:{ top: "125px", width: "130px", left: "50%", rotate: "0deg" },

        yellow:{ top: "127px", width: "130px", left: "50%", rotate: "0deg" },
        yellow1:{ top: "125px", width: "130px", left: "50%", rotate: "0deg" },
        yellow2:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        yellow3:{ top: "125px", width: "130px", left: "50%", rotate: "0deg" },
        yellow4:{ top: "127px", width: "130px", left: "50%", rotate: "0deg" },
        yellow5:{ top: "123px", width: "130px", left: "50%", rotate: "0deg" },
        yellow6:{ top: "123px", width: "130px", left: "50%", rotate: "0deg" },

        box:{top: "115px", width: "150px", left: "49%", rotate: "2deg" },



      },
    },
    {
      id: 3,
      img: "/necklaces/necklaces3.png",
      adjustments: {
        pink:{ top: "124px", width: "130px", left: "49%", rotate: "0deg" },
        pink1:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        pink2:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        pink3:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        pink4:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        pink5:{ top: "123px", width: "130px", left: "50%", rotate: "0deg" },
        pink6:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        pink7:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
       
        robotic:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        robotic1:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        robotic2:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        robotic3:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        robotic4:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        robotic5:{ top: "123px", width: "130px", left: "50%", rotate: "0deg" },
        robotic6:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
       
        rob:{ top: "124px", width: "130px", left: "49%", rotate: "0deg" },
        rob1:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        rob2:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        rob3:{ top: "120px", width: "130px", left: "49%", rotate: "0deg" },
        rob4:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        rob5:{ top: "123px", width: "130px", left: "50%", rotate: "0deg" },
        rob6:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        rob7:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },

        blue:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        blue1:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        blue2:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        blue3:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        blue4:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        blue5:{ top: "120px", width: "130px", left: "50%", rotate: "0deg" },
        blue6:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        blue7:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },

        yellow:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        yellow1:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        yellow2:{ top: "120px", width: "130px", left: "49%", rotate: "0deg" },
        yellow3:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        yellow4:{ top: "120px", width: "130px", left: "50%", rotate: "0deg" },
        yellow5:{ top: "120px", width: "130px", left: "50%", rotate: "0deg" },
        yellow6:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        yellow7:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },

        box:{top: "114px", width: "150px", left: "48%", rotate: "2deg" },



      },
    },
    {
      id: 4,
      img: "/necklaces/necklaces4.png",
      adjustments: {
        pink:{ top: "124px", width: "130px", left: "49%", rotate: "0deg" },
        pink1:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        pink2:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        pink3:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        pink4:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        pink5:{ top: "123px", width: "130px", left: "50%", rotate: "0deg" },
        pink6:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        pink7:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },

        robotic:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        robotic1:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        robotic2:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        robotic3:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        robotic4:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        robotic5:{ top: "123px", width: "130px", left: "50%", rotate: "0deg" },
        robotic6:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },

        rob:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        rob1:{ top: "125px", width: "130px", left: "50%", rotate: "0deg" },
        rob2:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        rob3:{ top: "120px", width: "130px", left: "49%", rotate: "0deg" },
        rob4:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        rob5:{ top: "123px", width: "130px", left: "50%", rotate: "0deg" },
        rob6:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        rob7:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },

        blue:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        blue1:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        blue2:{ top: "125px", width: "130px", left: "50%", rotate: "0deg" },
        blue3:{ top: "120px", width: "130px", left: "49%", rotate: "0deg" },
        blue4:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        blue5:{ top: "120px", width: "130px", left: "50%", rotate: "0deg" },
        blue6:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        blue7:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },

        yellow:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        yellow1:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        yellow2:{ top: "119px", width: "130px", left: "50%", rotate: "1deg" },
        yellow3:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        yellow4:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        yellow5:{ top: "120px", width: "130px", left: "50%", rotate: "0deg" },
        yellow6:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
      yellow7:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },



      box:{top: "110px", width: "150px", left: "48%", rotate: "-1deg" },

      },
    },
    {
      id: 5,
      img: "/necklaces/necklaces5.png",
      adjustments: {
        pink:{ top: "122px", width: "130px", left: "49%", rotate: "1deg" },
        pink1:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        pink2:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        pink3:{ top: "120px", width: "130px", left: "49%", rotate: "0deg" },
        pink4:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        pink5:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        pink6:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        pink7:{ top: "120px", width: "130px", left: "50%", rotate: "0deg" },

        robotic:{ top: "120px", width: "130px", left: "49%", rotate: "0deg" },
        robotic1:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        robotic2:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        robotic3:{ top: "120px", width: "130px", left: "49%", rotate: "0deg" },
        robotic4:{ top: "124px", width: "130px", left: "50%", rotate: "0deg" },
        robotic5:{ top: "120px", width: "130px", left: "50%", rotate: "0deg" },
        robotic6:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },

        rob:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        rob1:{ top: "123px", width: "130px", left: "50%", rotate: "0deg" },
        rob2:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        rob3:{ top: "118px", width: "130px", left: "49%", rotate: "0deg" },
        rob4:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        rob5:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        rob6:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        rob7:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },

        blue:{ top: "120px", width: "130px", left: "49%", rotate: "0deg" },
        blue1:{ top: "120px", width: "130px", left: "50%", rotate: "0deg" },
        blue2:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        blue3:{ top: "119px", width: "130px", left: "49%", rotate: "0deg" },
        blue4:{ top: "122px", width: "130px", left: "50%", rotate: "0deg" },
        blue5:{ top: "119px", width: "130px", left: "50%", rotate: "0deg" },
        blue6:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        blue7:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },

        yellow:{ top: "121px", width: "130px", left: "49%", rotate: "0deg" },
        yellow1:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        yellow2:{ top: "117px", width: "130px", left: "50%", rotate: "0deg" },
        yellow3:{ top: "122px", width: "130px", left: "49%", rotate: "0deg" },
        yellow4:{ top: "120px", width: "130px", left: "50%", rotate: "0deg" },
        yellow5:{ top: "118px", width: "130px", left: "50%", rotate: "0deg" },
        yellow6:{ top: "119px", width: "130px", left: "50%", rotate: "0deg" },


        box:{top: "110px", width: "150px", left: "49%", rotate: "0deg" },


      },
    },
    {
      id: 6,
      img: "/necklaces/necklaces6.png",
      adjustments: {
        pink:{ top: "120px", width: "130px", left: "50%", rotate: "0deg" },
        pink1:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        pink2:{ top: "119px", width: "130px", left: "50%", rotate: "0deg" },
        pink3:{ top: "119px", width: "130px", left: "49%", rotate: "0deg" },
        pink4:{ top: "120px", width: "130px", left: "50%", rotate: "0deg" },
        pink5:{ top: "119px", width: "130px", left: "50%", rotate: "0deg" },
        pink6:{ top: "118px", width: "130px", left: "50%", rotate: "0deg" },
        pink7:{ top: "117px", width: "130px", left: "50%", rotate: "0deg" },

        robotic:{ top: "118px", width: "130px", left: "50%", rotate: "0deg" },
        robotic1:{ top: "119px", width: "130px", left: "50%", rotate: "0deg" },
        robotic2:{ top: "118px", width: "130px", left: "50%", rotate: "0deg" },
        robotic3:{ top: "118px", width: "130px", left: "49%", rotate: "0deg" },
        robotic4:{ top: "120px", width: "130px", left: "50%", rotate: "0deg" },
        robotic5:{ top: "119px", width: "130px", left: "50%", rotate: "0deg" },
        robotic6:{ top: "119px", width: "130px", left: "50%", rotate: "0deg" },

        rob:{ top: "120px", width: "130px", left: "50%", rotate: "0deg" },
        rob1:{ top: "121px", width: "130px", left: "50%", rotate: "0deg" },
        rob2:{ top: "119px", width: "130px", left: "50%", rotate: "0deg" },
        rob3:{ top: "116px", width: "130px", left: "49%", rotate: "0deg" },
        rob4:{ top: "119px", width: "130px", left: "50%", rotate: "0deg" },
        rob5:{ top: "118px", width: "130px", left: "50%", rotate: "0deg" },
        rob6:{ top: "118px", width: "130px", left: "50%", rotate: "0deg" },
        rob7:{ top: "118px", width: "130px", left: "50%", rotate: "0deg" },

        blue:{ top: "118px", width: "130px", left: "50%", rotate: "0deg" },
        blue1:{ top: "117px", width: "130px", left: "50%", rotate: "0deg" },
        blue2:{ top: "119px", width: "130px", left: "50%", rotate: "0deg" },
        blue3:{ top: "117px", width: "130px", left: "49%", rotate: "0deg" },
        blue4:{ top: "120px", width: "130px", left: "50%", rotate: "0deg" },
        blue5:{ top: "117px", width: "130px", left: "50%", rotate: "0deg" },
        blue6:{ top: "118px", width: "130px", left: "50%", rotate: "0deg" },
        blue7:{ top: "118px", width: "130px", left: "50%", rotate: "0deg" },

        yellow:{ top: "118px", width: "130px", left: "49%", rotate: "0deg" },
        yellow1:{ top: "118px", width: "130px", left: "50%", rotate: "0deg" },
        yellow2:{ top: "115px", width: "130px", left: "50%", rotate: "-2deg" },
        yellow3:{ top: "119px", width: "130px", left: "49%", rotate: "0deg" },
        yellow4:{ top: "117px", width: "130px", left: "50%", rotate: "0deg" },
        yellow5:{ top: "115px", width: "130px", left: "50%", rotate: "0deg" },
        yellow6:{ top: "116px", width: "130px", left: "50%", rotate: "0deg" },



        box:{top: "108px", width: "150px", left: "49%", rotate: "-2deg" },

      },
    },

  ];

  const accessories = [
    {
      id: 1,
      img: "/accessories/accessories1.png",
      adjustments: {
        pink: { top: "125px", width: "90px", left: "28%", rotate: "50deg" },
        pink1: { top: "150px", width: "90px", left: "20%", rotate: "18deg" },
        pink2: { top: "150px", width: "90px", left: "23%", rotate: "20deg" },
        pink3: { top: "160px", width: "90px", left: "29%", rotate: "10deg" },
        pink4: { top: "205px", width: "90px", left: "28%", rotate: "10deg" },
        pink5: { top: "209px", width: "90px", left: "28%", rotate: "10deg" },
        pink6: { top: "155px", width: "90px", left: "22%", rotate: "-10deg" },
        pink7: { top: "205px", width: "90px", left: "28%", rotate: "10deg" },

        robotic: { top: "125px", width: "90px", left: "28%", rotate: "50deg" },
        robotic1: { top: "150px", width: "90px", left: "23%", rotate: "40deg" },
        robotic2: { top: "150px", width: "90px", left: "23%", rotate: "20deg" },
        robotic3: { top: "160px", width: "90px", left: "29%", rotate: "10deg" },
        robotic4: { top: "205px", width: "90px", left: "28%", rotate: "10deg" },
        robotic5: { top: "209px", width: "90px", left: "28%", rotate: "10deg" },
        robotic6: { top: "150px", width: "90px", left: "23%", rotate: "1deg" },
        robotic7: { top: "205px", width: "90px", left: "28%", rotate: "10deg" },

        rob: { top: "125px", width: "90px", left: "28%", rotate: "50deg" },
        rob1: { top: "150px", width: "90px", left: "23%", rotate: "40deg" },
        rob2: { top: "150px", width: "90px", left: "23%", rotate: "20deg" },
        rob3: { top: "160px", width: "90px", left: "29%", rotate: "10deg" },
        rob4: { top: "205px", width: "90px", left: "28%", rotate: "10deg" },
        rob5: { top: "209px", width: "90px", left: "28%", rotate: "10deg" },
        rob6: { top: "150px", width: "90px", left: "23%", rotate: "1deg" },
        rob7: { top: "205px", width: "90px", left: "28%", rotate: "10deg" },

        blue: { top: "125px", width: "90px", left: "28%", rotate: "50deg" },
        blue1: { top: "148px", width: "90px", left: "23%", rotate: "40deg" },
        blue2: { top: "155px", width: "90px", left: "23%", rotate: "20deg" },
        blue3: { top: "160px", width: "90px", left: "29%", rotate: "10deg" },
        blue4: { top: "205px", width: "90px", left: "28%", rotate: "10deg" },
        blue5: { top: "209px", width: "90px", left: "28%", rotate: "10deg" },
        blue6: { top: "150px", width: "90px", left: "23%", rotate: "1deg" },
        blue7: { top: "205px", width: "90px", left: "28%", rotate: "10deg" },
                                                                                                       
                                                             
        yellow: { top: "152px", width: "90px", left: "23%", rotate: "40deg" },
        yellow1: { top: "155px", width: "90px", left: "23%", rotate: "20deg" },
        yellow2: { top: "160px", width: "90px", left: "29%", rotate: "10deg" },
        yellow3: { top: "205px", width: "90px", left: "28%", rotate: "10deg" },
        yellow4: { top: "209px", width: "90px", left: "28%", rotate: "10deg" },
        yellow5: { top: "150px", width: "90px", left: "23%", rotate: "1deg" },
        yellow6: { top: "205px", width: "90px", left: "28%", rotate: "10deg" },
                                                                                 
        box: { top: "255px", width: "90px", left: "20%", rotate: "10deg" },                                  
                       
      },
    },
    {
      id: 2,
      img: "/accessories/accessories2.png",                               
      adjustments: {
        pink: { top: "115px", width: "100px", left: "29%", rotate: "50deg" },
        pink1: { top: "145px", width: "100px", left: "18%", rotate: "0deg" },
        pink2: { top: "145px", width: "100px", left: "18%", rotate: "0deg" },
        pink3: { top: "155px", width: "100px", left: "29%", rotate: "15deg" },               
        pink4: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        pink5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        pink6: { top: "145px", width: "100px", left: "20%", rotate: "0deg" },
        pink7: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
                   
        robotic: { top: "115px", width: "100px", left: "29%", rotate: "50deg" },
        robotic1: { top: "145px", width: "100px", left: "18%", rotate: "0deg" },
        robotic2: { top: "145px", width: "100px", left: "18%", rotate: "0deg" },
        robotic3: { top: "145px", width: "100px", left: "29%", rotate: "10deg" },
        robotic4: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        robotic5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        robotic6: { top: "165px", width: "100px", left: "20%", rotate: "0deg" },
                                
        rob: { top: "115px", width: "100px", left: "29%", rotate: "50deg" },
        rob1: { top: "145px", width: "100px", left: "18%", rotate: "0deg" },
        rob2: { top: "145px", width: "100px", left: "18%", rotate: "0deg" },
        rob3: { top: "145px", width: "100px", left: "29%", rotate: "15deg" },
        rob4: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        rob5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        rob6: { top: "145px", width: "100px", left: "20%", rotate: "0deg" },
        rob7: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },

        blue: { top: "115px", width: "100px", left: "29%", rotate: "50deg" },
        blue1: { top: "145px", width: "100px", left: "18%", rotate: "0deg" },
        blue2: { top: "145px", width: "100px", left: "18%", rotate: "0deg" },
        blue3: { top: "145px", width: "100px", left: "29%", rotate: "15deg" },
        blue4: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        blue5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        blue6: { top: "145px", width: "100px", left: "20%", rotate: "0deg" },
        blue7: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },

        yellow: { top: "145px", width: "100px", left: "20%", rotate: "5deg" },
        yellow1: { top: "145px", width: "100px", left: "18%", rotate: "0deg" },
        yellow2: { top: "150px", width: "100px", left: "28%", rotate: "6deg" },
        yellow3: { top: "145px", width: "100px", left: "150%", rotate: "15deg" },
        yellow4: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        yellow5: { top: "145px", width: "100px", left: "18%", rotate: "0deg" },
        yellow6: { top: "145px", width: "100px", left: "150%", rotate: "0deg" },

        box:{top: "145px", width: "100px", left: "33%", rotate: "150deg" },



      },
    },
    {
      id: 3,
      img: "/accessories/accessories3.png",
      adjustments: {
        pink: { top: "115px", width: "100px", left: "29%", rotate: "50deg" },
        pink1: { top: "145px", width: "100px", left: "18%", rotate: "0deg" },
        pink2: { top: "150px", width: "100px", left: "21%", rotate: "0deg" },
        pink3: { top: "155px", width: "100px", left: "29%", rotate: "15deg" },
        pink4: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        pink5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        pink6: { top: "145px", width: "100px", left: "20%", rotate: "0deg" },
        pink7: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },

        robotic: { top: "115px", width: "100px", left: "29%", rotate: "50deg" },
        robotic1: { top: "145px", width: "100px", left: "18%", rotate: "0deg" },
        robotic2: { top: "155px", width: "100px", left: "19%", rotate: "0deg" },
        robotic3: { top: "155px", width: "100px", left: "29%", rotate: "15deg" },
        robotic4: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        robotic5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        robotic6: { top: "155px", width: "100px", left: "20%", rotate: "0deg" },

        rob: { top: "115px", width: "100px", left: "29%", rotate: "50deg" },
        rob1: { top: "155px", width: "100px", left: "18%", rotate: "0deg" },
        rob2: { top: "155px", width: "100px", left: "18%", rotate: "0deg" },
        rob3: { top: "145px", width: "100px", left: "29%", rotate: "15deg" },
        rob4: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        rob5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        rob6: { top: "150px", width: "100px", left: "20%", rotate: "0deg" },
        rob7: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },

        blue: { top: "115px", width: "100px", left: "29%", rotate: "50deg" },
        blue1: { top: "145px", width: "100px", left: "18%", rotate: "0deg" },
        blue2: { top: "155px", width: "100px", left: "20%", rotate: "0deg" },
        blue3: { top: "155px", width: "100px", left: "29%", rotate: "15deg" },
        blue4: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        blue5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        blue6: { top: "145px", width: "100px", left: "20%", rotate: "0deg" },
        blue7: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },

        yellow: { top: "145px", width: "100px", left: "20%", rotate: "5deg" },
        yellow1: { top: "155px", width: "100px", left: "20%", rotate: "0deg" },
        yellow2: { top: "150px", width: "100px", left: "28%", rotate: "6deg" },
        yellow3: { top: "145px", width: "100px", left: "150%", rotate: "15deg" },
        yellow4: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        yellow5: { top: "150px", width: "100px", left: "20%", rotate: "0deg" },
        yellow6: { top: "145px", width: "100px", left: "150%", rotate: "0deg" },

        box:{top: "158px", width: "70px", left: "16%", rotate: "-25deg" },



      },
    },

    {
      id: 4,
      img: "/accessories/accessories4.png",
      adjustments: {
        pink: { top: "90px", width: "230px", left: "65%", rotate: "0deg" },
        pink1: { top: "90px", width: "230px", left: "65%", rotate: "0deg" },
        pink2: { top: "50px", width: "230px", left: "75%", rotate: "0deg" },
        pink3: { top: "60px", width: "230px", left: "29%", rotate: "15deg" },
        pink4: { top: "105px", width: "230px", left: "60%", rotate: "0deg" },
        pink5: { top: "90px", width: "230px", left: "20%", rotate: "0deg" },
        pink6: { top: "55px", width: "230px", left: "20%", rotate: "0deg" },
        pink7: { top: "93px", width: "230px", left: "74%", rotate: "-25deg" },

        robotic: { top: "90px", width: "230px", left: "65%", rotate: "0deg" },
        robotic1: { top: "90px", width: "230px", left: "65%", rotate: "0deg" },
        robotic2: { top: "50px", width: "230px", left: "75%", rotate: "0deg" },
        robotic3: { top: "60px", width: "230px", left: "29%", rotate: "15deg" },
        robotic4: { top: "105px", width: "230px", left: "60%", rotate: "0deg" },
        robotic5: { top: "90px", width: "230px", left: "20%", rotate: "0deg" },
        robotic6: { top: "55px", width: "230px", left: "20%", rotate: "0deg" },

        rob: { top: "90px", width: "230px", left: "65%", rotate: "0deg" },
        rob1: { top: "90px", width: "230px", left: "65%", rotate: "0deg" },
        rob2: { top: "50px", width: "230px", left: "75%", rotate: "0deg" },
        rob3: { top: "60px", width: "230px", left: "29%", rotate: "15deg" },
        rob4: { top: "105px", width: "230px", left: "60%", rotate: "0deg" },
        rob5: { top: "90px", width: "230px", left: "20%", rotate: "0deg" },
        rob6: { top: "55px", width: "230px", left: "20%", rotate: "0deg" },
        rob7: { top: "93px", width: "230px", left: "74%", rotate: "-25deg" },

        blue: { top: "90px", width: "230px", left: "65%", rotate: "0deg" },
        blue1: { top: "90px", width: "230px", left: "65%", rotate: "0deg" },
        blue2: { top: "50px", width: "230px", left: "75%", rotate: "0deg" },
        blue3: { top: "60px", width: "230px", left: "29%", rotate: "15deg" },
        blue4: { top: "105px", width: "230px", left: "60%", rotate: "0deg" },
        blue5: { top: "90px", width: "230px", left: "20%", rotate: "0deg" },
        blue6: { top: "55px", width: "230px", left: "20%", rotate: "0deg" },
        blue7: { top: "93px", width: "230px", left: "74%", rotate: "-25deg" },

        yellow: { top: "90px", width: "230px", left: "65%", rotate: "0deg" },
        yellow1: { top: "90px", width: "230px", left: "65%", rotate: "0deg" },
        yellow2: { top: "50px", width: "230px", left: "75%", rotate: "0deg" },
        yellow3: { top: "60px", width: "230px", left: "29%", rotate: "15deg" },
        yellow4: { top: "105px", width: "230px", left: "60%", rotate: "0deg" },
        yellow5: { top: "90px", width: "230px", left: "20%", rotate: "0deg" },
        yellow6: { top: "55px", width: "230px", left: "20%", rotate: "0deg" },
        yellow7: { top: "93px", width: "230px", left: "74%", rotate: "-25deg" },

        box: { top: "95px", width: "230px", left: "48%", rotate: "-10deg" },


      },
    },


    { //! burada
      id: 5,
      img: "/accessories/accessories5.png",
      adjustments: {
        pink: { top: "112px", width: "90px", left: "28%", rotate: "50deg" },
        pink1: { top: "150px", width: "90px", left: "21%", rotate: "18deg" },
        pink2: { top: "150px", width: "90px", left: "23%", rotate: "10deg" },
        pink3: { top: "150px", width: "90px", left: "29%", rotate: "10deg" },
        pink4: { top: "205px", width: "90px", left: "28%", rotate: "0deg" },
        pink5: { top: "209px", width: "90px", left: "28%", rotate: "0deg" },
        pink6: { top: "150px", width: "90px", left: "22%", rotate: "-15deg" },
        pink7: { top: "205px", width: "90px", left: "28%", rotate: "0deg" },

        robotic: { top: "112px", width: "90px", left: "28%", rotate: "50deg" },
        robotic1: { top: "150px", width: "90px", left: "21%", rotate: "18deg" },
        robotic2: { top: "150px", width: "90px", left: "23%", rotate: "10deg" },
        robotic3: { top: "155px", width: "90px", left: "29%", rotate: "10deg" },
        robotic4: { top: "205px", width: "90px", left: "28%", rotate: "0deg" },
        robotic5: { top: "209px", width: "90px", left: "28%", rotate: "0deg" },
        robotic6: { top: "155px", width: "90px", left: "23%", rotate: "-15deg" },

        rob: { top: "112px", width: "90px", left: "28%", rotate: "50deg" },
        rob1: { top: "150px", width: "90px", left: "21%", rotate: "18deg" },
        rob2: { top: "150px", width: "90px", left: "23%", rotate: "10deg" },
        rob3: { top: "155px", width: "90px", left: "29%", rotate: "10deg" },
        rob4: { top: "205px", width: "90px", left: "28%", rotate: "0deg" },
        rob5: { top: "209px", width: "90px", left: "28%", rotate: "0deg" },
        rob6: { top: "150px", width: "90px", left: "23%", rotate: "-15deg" },
        rob7: { top: "205px", width: "90px", left: "28%", rotate: "0deg" },


        blue: { top: "112px", width: "90px", left: "28%", rotate: "50deg" },
        blue1: { top: "150px", width: "90px", left: "21%", rotate: "18deg" },
        blue2: { top: "150px", width: "90px", left: "23%", rotate: "10deg" },
        blue3: { top: "155px", width: "90px", left: "29%", rotate: "10deg" },
        blue4: { top: "205px", width: "90px", left: "28%", rotate: "0deg" },
        blue5: { top: "209px", width: "90px", left: "28%", rotate: "0deg" },
        blue6: { top: "150px", width: "90px", left: "23%", rotate: "-15deg" },
        blue7: { top: "205px", width: "90px", left: "28%", rotate: "0deg" },


        yellow: { top: "150px", width: "90px", left: "21%", rotate: "18deg" },
        yellow1: { top: "150px", width: "90px", left: "23%", rotate: "10deg" },
        yellow2: { top: "155px", width: "90px", left: "29%", rotate: "10deg" },
        yellow3: { top: "205px", width: "90px", left: "28%", rotate: "0deg" },
        yellow4: { top: "209px", width: "90px", left: "28%", rotate: "0deg" },
        yellow5: { top: "150px", width: "90px", left: "23%", rotate: "-15deg" },
        yellow6: { top: "205px", width: "90px", left: "28%", rotate: "0deg" },


        box: { top: "255px", width: "90px", left: "20%", rotate: "0deg" },

      },
    },
    { //! burada
      id: 6,
      img: "/accessories/accessories6.png",
      adjustments: {
        pink: { top: "102px", width: "90px", left: "30%", rotate: "50deg" },
        pink1: { top: "140px", width: "90px", left: "17%", rotate: "5deg" },
        pink2: { top: "140px", width: "90px", left: "20%", rotate: "10deg" },
        pink3: { top: "140px", width: "90px", left: "26%", rotate: "10deg" },
        pink4: { top: "230px", width: "90px", left: "33%", rotate: "250deg" },
        pink5: { top: "209px", width: "90px", left: "150%", rotate: "0deg" },
        pink6: { top: "140px", width: "90px", left: "18%", rotate: "5deg" },
        pink7: { top: "205px", width: "90px", left: "150%", rotate: "0deg" },

        robotic: { top: "102px", width: "90px", left: "30%", rotate: "50deg" },
        robotic1: { top: "140px", width: "90px", left: "17%", rotate: "5deg" },
        robotic2: { top: "140px", width: "90px", left: "20%", rotate: "10deg" },
        robotic3: { top: "140px", width: "90px", left: "26%", rotate: "10deg" },
        robotic4: { top: "230px", width: "90px", left: "33%", rotate: "250deg" },
        robotic5: { top: "209px", width: "90px", left: "150%", rotate: "0deg" },
        robotic6: { top: "140px", width: "90px", left: "18%", rotate: "5deg" },
        robotic7: { top: "205px", width: "90px", left: "150%", rotate: "0deg" },

        rob: { top: "102px", width: "90px", left: "30%", rotate: "50deg" },
        rob1: { top: "140px", width: "90px", left: "17%", rotate: "5deg" },
        rob2: { top: "140px", width: "90px", left: "20%", rotate: "10deg" },
        rob3: { top: "140px", width: "90px", left: "26%", rotate: "10deg" },
        rob4: { top: "230px", width: "90px", left: "33%", rotate: "250deg" },
        rob5: { top: "209px", width: "90px", left: "150%", rotate: "0deg" },
        rob6: { top: "140px", width: "90px", left: "18%", rotate: "5deg" },
        rob7: { top: "205px", width: "90px", left: "150%", rotate: "0deg" },


        blue: { top: "103x", width: "90px", left: "30%", rotate: "50deg" },
        blue1: { top: "140px", width: "90px", left: "17%", rotate: "5deg" },
        blue2: { top: "140px", width: "90px", left: "20%", rotate: "10deg" },
        blue3: { top: "140px", width: "90px", left: "26%", rotate: "10deg" },
        blue4: { top: "230px", width: "90px", left: "33%", rotate: "250deg" },
        blue5: { top: "209px", width: "90px", left: "150%", rotate: "0deg" },
        blue6: { top: "140px", width: "90px", left: "18%", rotate: "5deg" },
        blue7: { top: "205px", width: "90px", left: "150%", rotate: "0deg" },


        yellow: { top: "140px", width: "90px", left: "17%", rotate: "5deg" },
        yellow1: { top: "140px", width: "90px", left: "20%", rotate: "10deg" },
        yellow2: { top: "140px", width: "90px", left: "26%", rotate: "10deg" },
        yellow3: { top: "230px", width: "90px", left: "33%", rotate: "250deg" },
        yellow4: { top: "209px", width: "90px", left: "150%", rotate: "0deg" },
        yellow5: { top: "140px", width: "90px", left: "18%", rotate: "5deg" },
        yellow6: { top: "205px", width: "90px", left: "150%", rotate: "0deg" },


        box: { top: "165px", width: "90px", left: "65%", rotate: "260deg" },

      },
    },
    {
      id: 8,
      img: "/accessories/accessories8.png",
      adjustments: {
        pink: { top: "105px", width: "100px", left: "29%", rotate: "50deg" },
        pink1: { top: "145px", width: "100px", left: "20%", rotate: "-15deg" },
        pink2: { top: "145px", width: "100px", left: "21%", rotate: "-15deg" },
        pink3: { top: "145px", width: "100px", left: "27%", rotate: "-15deg" },
        pink4: { top: "208px", width: "130px", left: "31%", rotate: "240deg" },
        pink5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        pink6: { top: "145px", width: "100px", left: "20%", rotate: "-15deg" },
        pink7: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },

        robotic: { top: "105px", width: "100px", left: "29%", rotate: "50deg" },
        robotic1: { top: "145px", width: "100px", left: "20%", rotate: "-15deg" },
        robotic2: { top: "145px", width: "100px", left: "21%", rotate: "-15deg" },
        robotic3: { top: "145px", width: "100px", left: "27%", rotate: "-15deg" },
        robotic4: { top: "208px", width: "130px", left: "31%", rotate: "240deg" },
        robotic5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        robotic6: { top: "145px", width: "100px", left: "20%", rotate: "-15deg" },

        rob: { top: "105px", width: "100px", left: "29%", rotate: "50deg" },
        rob1: { top: "145px", width: "100px", left: "20%", rotate: "-15deg" },
        rob2: { top: "145px", width: "100px", left: "21%", rotate: "-15deg" },
        rob3: { top: "145px", width: "100px", left: "27%", rotate: "-15deg" },
        rob4: { top: "208px", width: "130px", left: "31%", rotate: "240deg" },
        rob5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        rob6: { top: "145px", width: "100px", left: "20%", rotate: "-15deg" },
        rob7: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },

        blue: { top: "105px", width: "100px", left: "29%", rotate: "50deg" },
        blue1: { top: "139px", width: "100px", left: "20%", rotate: "-15deg" },
        blue2: { top: "145px", width: "100px", left: "21%", rotate: "-15deg" },
        blue3: { top: "145px", width: "100px", left: "27%", rotate: "-15deg" },
        blue4: { top: "208px", width: "130px", left: "31%", rotate: "240deg" },
        blue5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        blue6: { top: "145px", width: "100px", left: "20%", rotate: "-15deg" },
        blue7: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },

        yellow: { top: "142px", width: "100px", left: "19%", rotate: "-15deg" },
        yellow1: { top: "145px", width: "100px", left: "21%", rotate: "-15deg" },
        yellow2: { top: "145px", width: "100px", left: "27%", rotate: "-15deg" },
        yellow3: { top: "208px", width: "130px", left: "31%", rotate: "240deg" },
        yellow4: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        yellow5: { top: "145px", width: "100px", left: "20%", rotate: "-15deg" },
        yellow6: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },

        box:{top: "128px", width: "100px", left: "16%", rotate: "-25deg" },



      },
    },

    {
      id: 9,
      img: "/accessories/accessories9.png",
      adjustments: {
        pink: { top: "54px", width: "190px", left: "27%", rotate: "31deg" },
        pink1: { top: "96px", width: "220px", left: "16%", rotate: "-66deg" },
        pink2: { top: "100px", width: "220px", left: "16%", rotate: "-70deg" },
        pink3: { top: "170px", width: "160px", left: "60%", rotate: "-135deg" },
        pink4: { top: "175px", width: "200px", left: "36%", rotate: "235deg" },
        pink5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        pink6: { top: "99px", width: "220px", left: "15%", rotate: "-70deg" },
        pink7: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },

        robotic: { top: "54px", width: "190px", left: "27%", rotate: "31deg" },
        robotic1: { top: "96px", width: "220px", left: "16%", rotate: "-66deg" },
        robotic2: { top: "102x", width: "230px", left: "16%", rotate: "-74deg" },
        robotic3: { top: "170px", width: "160px", left: "59%", rotate: "-135deg" },
        robotic4: { top: "175px", width: "200px", left: "36%", rotate: "235deg" },
        robotic5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        robotic6: { top: "99px", width: "230px", left: "15%", rotate: "-74deg" },

        rob: { top: "54px", width: "190px", left: "27%", rotate: "31deg" },
        rob1: { top: "96px", width: "220px", left: "16%", rotate: "-66deg" },
        rob2: { top: "100px", width: "220px", left: "16%", rotate: "-70deg" },
        rob3: { top: "170px", width: "160px", left: "59%", rotate: "-135deg" },
        rob4: { top: "176px", width: "190px", left: "36%", rotate: "235deg" },
        rob5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        rob6: { top: "99px", width: "220px", left: "15%", rotate: "-70deg" },
        rob7: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },

        blue: { top: "54px", width: "190px", left: "26%", rotate: "31deg" },
        blue1: { top: "96px", width: "220px", left: "16%", rotate: "-74deg" },
        blue2: { top: "102px", width: "220px", left: "16%", rotate: "-70deg" },
        blue3: { top: "170px", width: "160px", left: "59%", rotate: "-135deg" },
        blue4: { top: "176px", width: "190px", left: "37%", rotate: "235deg" },
        blue5: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        blue6: { top: "99px", width: "220px", left: "17%", rotate: "-74deg" },
        blue7: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },

        yellow: { top: "99px", width: "220px", left: "16%", rotate: "-74deg" },
        yellow1: { top: "102px", width: "220px", left: "16%", rotate: "-72deg" },
        yellow2: { top: "170px", width: "160px", left: "59%", rotate: "-135deg" },
        yellow3: { top: "176px", width: "195px", left: "36%", rotate: "235deg" },
        yellow4: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },
        yellow5: { top: "99px", width: "220px", left: "17%", rotate: "-74deg" },
        yellow6: { top: "128px", width: "130px", left: "150%", rotate: "0deg" },

        box:{top: "118px", width: "180px", left: "28%", rotate: "235deg" },



      },
    },

  ];

  const extras = [
    {
      id: 1,
      img: "/extras/extras1.png",
      adjustments: {
        round: { top: "98px", width: "70px", left: "60%", rotate: "9deg" },
        long: { top: "98px", width: "70px", left: "60%", rotate: "9deg" },
        yellow: { top: "98px", width: "70px", left: "60%", rotate: "9deg" },

      },
    },
    {
      id: 2,
      img: "/extras/extras2.png",
      adjustments: {
        round: { top: "111px", width: "70px", left: "60%", rotate: "-16deg" },
        long: { top: "98px", width: "70px", left: "60%", rotate: "-16deg" },
        yellow: { top: "98px", width: "70px", left: "60%", rotate: "-16deg" },

      },
    },
    {
      id: 3,
      img: "/extras/extras3.png",
      adjustments: {
        round: { top: "36px", width: "100px", left: "48%", rotate: "0deg" },
        long: { top: "36px", width: "100px", left: "48%", rotate: "0deg" },
        yellow: { top: "36px", width: "100px", left: "48%", rotate: "0deg" },

      },
    },
    {
      id: 4,
      img: "/extras/extras4.png",
      adjustments: {
        round: { top: "10px", width: "365px", left: "49%", rotate: "0deg" },
        long: { top: "10px", width: "365px", left: "49%", rotate: "0deg" },
        yellow: { top: "10px", width: "365px", left: "49%", rotate: "0deg" },

      },
    },

    {
      id: 5,
      img: "/extras/extras5.png",
      adjustments: {
        mouth1: { top: "66px", width: "140px", left: "38%", rotate: "0deg" },
        mouth2: { top: "69px", width: "140px", left: "41%", rotate: "0deg" },
        mouth3: { top: "62px", width: "145px", left: "41%", rotate: "-2deg" },
        mouth4: { top: "68px", width: "140px", left: "41%", rotate: "0deg" },
        mouth5: { top: "65px", width: "140px", left: "41%", rotate: "0deg" },
        mouth6: { top: "49px", width: "170px", left: "41%", rotate: "0deg" },
        mouth7: { top: "63px", width: "145px", left: "41%", rotate: "-1deg" },
        mouth8: { top: "63px", width: "150px", left: "41%", rotate: "0deg" },
        mouth9: { top: "66px", width: "140px", left: "42%", rotate: "0deg" },
        mouth10: { top: "65px", width: "140px", left: "38%", rotate: "0deg" },
        mouth11: { top: "69px", width: "140px", left: "41%", rotate: "0deg" },
        mouth12: { top: "62px", width: "140px", left: "41%", rotate: "0deg" },
        mouth13: { top: "68px", width: "140px", left: "41%", rotate: "0deg" },
        mouth14: { top: "64px", width: "140px", left: "40%", rotate: "0deg" },
        mouth15: { top: "67px", width: "140px", left: "41%", rotate: "0deg" },
        mouth16: { top: "68px", width: "140px", left: "41%", rotate: "0deg" },
        mouth17: { top: "63px", width: "140px", left: "41%", rotate: "0deg" },
      },
    },

    {
      id: 6,
      img: "/extras/extras6.png",
      adjustments: {
        round: { top: "67px", width: "170px", left: "50%", rotate: "0deg" },
        long: { top: "36px", width: "100px", left: "48%", rotate: "0deg" },
        yellow: { top: "36px", width: "100px", left: "48%", rotate: "0deg" },

      },
    },
    {
      id: 7,
      img: "/extras/extras7.png",
      adjustments: {
        round: { top: "67px", width: "170px", left: "50%", rotate: "0deg" },
        long: { top: "36px", width: "100px", left: "48%", rotate: "0deg" },
        yellow: { top: "36px", width: "100px", left: "48%", rotate: "0deg" },

      },
    },
    
  ];



  const handleDownload = async () => {
    if (characterRef.current) {
      try {
        // Kullanıcıya sadece "Evet" seçeneği sunarak bilgi veriyoruz
        alert("The card will now loading."); // Kullanıcıya indirme bilgisi gösterilir
        
  
        // İndirme işlemini başlat
        const canvas = await html2canvas(characterRef.current, {
          backgroundColor: null, // Arka plan rengini kaldırır (sayfanın beyaz kısmı görselleştirilmez)
          useCORS: true, // Eğer görsel dışarıdan geliyorsa, CORS izinleri için
          x: 0,  // Görselin doğru alınması için sağa kayma
          y: 0   // Görselin doğru alınması için yukarı kayma
        });
        const link = document.createElement("a");
        link.download = "Jelly-Card.png";
        link.href = canvas.toDataURL("image/png");
        link.click(); // Dosya indir
        //! start
    
        //! finish
        // İndirme sayısını artır
        const newDownloadCount = downloadCount + 1;
  
        // Eğer 10 indirme tamamlandıysa sıfırla ve kullanıcıyı bilgilendir
        if (newDownloadCount >= 500) {
          alert("Congrats! You've reached 500 downloads. The count has been reset.");
          setDownloadCount(0); // Sayacı sıfırla
          localStorage.setItem("downloadCount", 0);
        } else {
          // Yeni indirme sayısını kaydet
          setDownloadCount(newDownloadCount);
          localStorage.setItem("downloadCount", newDownloadCount);
        }
      } catch (error) {
        console.error("Error during download:", error);
      }
    }
  };
  
  // localStorage'dan mevcut indirme sayısını al
  useEffect(() => {
    const storedDownloadCount = localStorage.getItem("downloadCount");
    if (storedDownloadCount) {
      setDownloadCount(parseInt(storedDownloadCount)); // İndirme sayısını yerleştir
    }
  }, []);
  
  
 
  useEffect(() => {
    if (selectedMouth) {
      console.log("Selected Mouth:", selectedMouth);
      console.log("Selected Extras Adjustments:", selectedExtras?.adjustments);
    }
  }, [selectedMouth, selectedExtras]);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleSelect = (type, img) => {
    if (type === "background") setSelectedBackground(img);
       // if (type === "head") setSelectedHead(heads.find((h) => h.img === img)); // Updated for head
  //  const head = heads.find((h) => h.img === img);
  //  if (head) setSelectedHead(head);
    // if (type === "body") setSelectedBody(bodies.find((b) => b.img === img)); // Body için özellikleri dahil et
    if (type === "eyes") setSelectedEyes(eyes.find((e) => e.img === img)); //  new state
    // if (type === "mouth") setSelectedMouth(mouths.find((m) => m.img === img));
    if (type === "facialHair") setSelectedFacialHair(facialHairs.find((f) => f.img === img)); // face

  if (type === "mouth") {
  const mouth = mouths.find((m) => m.img === img);
  if (mouth) {
    setSelectedMouth(mouth);

    // Eğer seçili extras varsa, mouth'a göre koordinatlarını güncelle
    if (selectedExtras) {
      const adjustments = selectedExtras.adjustments[`mouth${mouth.id}`] || {};
      const updatedExtras = {
        ...selectedExtras,
        ...adjustments,  // Extras koordinatlarını seçilen ağıza göre ayarla
      };
      setSelectedExtras(updatedExtras);
    }
  }
}

    
   
    // if (type === "necklace") setSelectedNecklace(necklaces.find((n) => n.img === img));
    //if (type === "accessory") setSelectedAccessory(img);

     //if(type === "hats") setSelectedHats(hats.find((h) => h.img === img));


     if (type === "head") {
      const head = heads.find((h) => h.img === img);
      if (head) {
        setSelectedHead(head);
    
        // Eğer bir şapka seçiliyse, koordinatlarını güncelle
        if (selectedHats) {
          const updatedHat = {
            ...selectedHats,
            ...selectedHats.adjustments[head.shape], // Şapka koordinatlarını kafa şekline göre ayarla
          };
          setSelectedHats(updatedHat);
        }
    
        // Eğer bir extras seçiliyse, koordinatlarını güncelle
        if (selectedExtras) {
          const updatedExtras = {
            ...selectedExtras,
            ...selectedExtras.adjustments[head.shape], // Extras koordinatlarını kafa şekline göre ayarla
          };
          setSelectedExtras(updatedExtras);
        }
      }
    } else if (type === "hats") {
      const hat = hats.find((h) => h.img === img);
      if (hat && selectedHead) {
        const updatedHat = {
          ...hat,
          ...hat.adjustments[selectedHead.shape], // Şapka koordinatlarını seçili kafa şekline göre ayarla
        };
        setSelectedHats(updatedHat);
      }
    } else if (type === "extras") { // Extras seçimi için yeni blok
      const extra = extras.find((e) => e.img === img);
      if (extra && selectedHead) {
        const updatedExtras = {
          ...extra,
          ...extra.adjustments[selectedHead.shape], // Extras koordinatlarını kafa şekline göre ayarla
        };
        setSelectedExtras(updatedExtras);
      }
    }
  

    if (type === "body") {
      const body = bodies.find((b) => b.img === img);
      if (body) {
          setSelectedBody(body);
  
          // Eğer bir kolye seçiliyse, koordinatlarını güncelle
          if (selectedNecklace) {
              const updatedNecklace = {
                  ...selectedNecklace,
                  ...selectedNecklace.adjustments[body.shape], // Kolye koordinatlarını vücut şekline göre ayarla
              };
              setSelectedNecklace(updatedNecklace);
          }
  
          // Eğer bir aksesuar seçiliyse, koordinatlarını güncelle
          if (selectedAccessory) {
              const updatedAccessory = {
                  ...selectedAccessory,
                  ...selectedAccessory.adjustments[body.shape], // Aksesuar koordinatlarını vücut şekline göre ayarla
              };
              setSelectedAccessory(updatedAccessory);
          }
      }
  } else if (type === "necklace") {
      const necklace = necklaces.find((n) => n.img === img);
      if (necklace && selectedBody) {
          const updatedNecklace = {
              ...necklace,
              ...necklace.adjustments[selectedBody.shape], // Kolye koordinatlarını seçili vücut şekline göre ayarla
          };
          setSelectedNecklace(updatedNecklace);
      }
  } else if (type === "accessory") {
      const accessory = accessories.find((a) => a.img === img);
      if (accessory && selectedBody) {
          const updatedAccessory = {
              ...accessory,
              ...accessory.adjustments[selectedBody.shape], // Aksesuar koordinatlarını seçili vücut şekline göre ayarla
          };
          setSelectedAccessory(updatedAccessory);
      }
  }
  


    closeModal();
  };
  
  
  

  const getSelectedItemByType = (type) => {
    switch (type) {
      case "background":
        return selectedBackground;
      case "head":
        return selectedHead?.img;
      case "body":
        return selectedBody?.img;
      case "eyes":
        return selectedEyes?.img;
      case "mouth":
        return selectedMouth?.img;
      case "facialHair":
        return selectedFacialHair?.img;
      case "necklace":
        return selectedNecklace?.img;
      case "accessory":
        return selectedAccessory?.img;
        case "hats":
          return selectedHats?.img
          case "extras":
            return selectedExtras?.img;
      default:
        return null;
    }
  };

  const handleRemoveSelected = (type) => {
    if (type === "background") setSelectedBackground("/images/backside.gif" ); // Arka planı kaldır
    // if (type === "head") setSelectedHead({ img: "/head/defaulthead.png", top: "-50px", left: "", width: "400px" }); // Başlığı sıfırla
    // if (type === "body") setSelectedBody({ img: "/legs/defaultleg.png", top: "25px", left: "", width: "400px" }); // Vücudu sıfırla
    if (type === "head") setSelectedHead(null); // Başlığı sıfırla
    if (type === "body") setSelectedBody(null); // Vücudu sıfırla
    if (type === "eyes") setSelectedEyes(); // Gözleri kaldır
    if (type === "mouth") setSelectedMouth(null); // Ağzı kaldır
    if (type === "facialHair") setSelectedFacialHair(null); // Yüz kıllarını kaldır
    if (type === "necklace") setSelectedNecklace(null); // Kolyeyi kaldır
    if (type === "accessory") setSelectedAccessory(null); // Aksesuarı kaldır
    if(type ==="hats") setSelectedHats(null);// new state
    if(type === "extras") setSelectedExtras(null);// new state
  };


  return (
    <div className="barbie-giydirme-container" style={{ textAlign: "center" }}>
      <img 
        src="/images/portalgo.png" 
        alt="Jelly Card Logo" 
        className="logo"
      />
  
      {/* Karakter ve Arka Plan */}
      <div
        ref={characterRef}
        className="character"
        onClick={handleFlip} // Tıklama ile döndürme
        onMouseMove={handleMouseMove} // Fare ile hareket
        onMouseLeave={handleMouseLeave} // Fare çıkınca sıfırlama
        onTouchMove={handleTouchMove} // Dokunma ile hareket
        style={{
          position: "relative",
          width: "300px",
          height: "400px",
          margin: "20px auto",
          backgroundImage: `url(${isFlipped ? backImage : selectedBackground})`, // Arka yüz için backImage, ön yüz için selectedBackground
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundClip: "content-box",
          border: `10px solid ${borderColor}`,
          borderRadius: "15px",
          cursor: "pointer",
          transition: "transform 0.6s, background-image 0.6s", // Dönüşümü ve arka plan değişimini yumuşat
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)", // Yalnızca dönüş için
        }}
      >
        {/* Karakterin öğeleri, yalnızca ön yüz için render edilecek */}
        {!isFlipped && (
          <>
            {selectedHead && selectedHead.img && (
              <img
                src={selectedHead.img}
                alt="Head"
                style={{
                  position: "absolute",
                  top: selectedHead.top,
                  left: selectedHead.left,
                  transform: "translateX(-50%)",
                  width: selectedHead.width,
                }}
              />
            )}
  
            {selectedBody && selectedBody.img && (
              <img
                src={selectedBody.img}
                alt="Body"
                style={{
                  position: "absolute",
                  top: selectedBody.top,
                  left: selectedBody.left,
                  transform: `translateX(-50%) rotate(${selectedBody.rotate})`,
                  width: selectedBody.width,
                  zIndex: 2,
                }}
              />
            )}
  
            {selectedNecklace && (
              <img
                src={selectedNecklace.img}
                alt="Necklace"
                style={{
                  position: "absolute",
                  top: selectedNecklace.top,
                  left: selectedNecklace.left,
                  transform: `translateX(-50%) rotate(${selectedNecklace.rotate})`,
                  width: selectedNecklace.width,
                  zIndex: 2,
                }}
              />
            )}
  
            {selectedAccessory && (
              <img
                src={selectedAccessory.img}
                alt="Accessory"
                style={{
                  position: "absolute",
                  top: selectedAccessory.top,
                  left: selectedAccessory.left,
                  transform: `translateX(-50%) rotate(${selectedAccessory.rotate})`,
                  width: selectedAccessory.width,
                  zIndex: 2,
                }}
              />
            )}
  
            {selectedMouth && (
              <img
                src={selectedMouth.img}
                alt="Mouth"
                style={{
                  position: "absolute",
                  top: selectedMouth.top,
                  left: selectedMouth.left,
                  transform: `translateX(-50%) rotate(${selectedMouth.rotate})`,
                  width: selectedMouth.width,
                  zIndex: 2,
                }}
              />
            )}
  
            {selectedFacialHair && (
              <img
                src={selectedFacialHair.img}
                alt="Facial Hair"
                style={{
                  position: "absolute",
                  top: selectedFacialHair.top,
                  left: selectedFacialHair.left,
                  transform: "translateX(-50%)",
                  width: selectedFacialHair.width,
                  zIndex: 2,
                }}
              />
            )}
  
            {selectedEyes && (
              <img
                src={selectedEyes.img}
                alt="Eyes"
                style={{
                  position: "absolute",
                  top: selectedEyes.top,
                  left: selectedEyes.left,
                  transform: "translateX(-50%)",
                  width: selectedEyes.width,
                  zIndex: 2,
                }}
                
              />
            )}
            {selectedHats && ( // Benzer yapı 'selectedHats' için
  <img
    src={selectedHats.img}
    alt="Hats"
    style={{
      position: "absolute",
      top: selectedHats.top,
      left: selectedHats.left,
      transform: `translateX(-50%) rotate(${selectedHats.rotate})`,
      width: selectedHats.width,
      rotate: selectedHats.rotate,
      zIndex: 3, // Şapkanın üstte olması için zIndex bir miktar artırıldı
    }}
  />
)}
{selectedExtras && (
  <img
    src={selectedExtras.img}
    alt="Extras"
    style={{
      position: "absolute",
      top: selectedExtras.adjustments?.[`mouth${selectedMouth?.id}`]?.top || selectedExtras.top,
      left: selectedExtras.adjustments?.[`mouth${selectedMouth?.id}`]?.left || selectedExtras.left,
      transform: `translateX(-50%) rotate(${selectedExtras.adjustments?.[`mouth${selectedMouth?.id}`]?.rotate || "0deg"})`,
      width: selectedExtras.adjustments?.[`mouth${selectedMouth?.id}`]?.width || selectedExtras.width,
      zIndex: 2,
    }}
  />
)}

          </>
          
        )}
      </div>
   

  


      {/* Kontroller */}
      <div className="controls">
      <button onClick={() => openModal("background")}>Background</button>
        <button onClick={() => openModal("head")}>Head</button>
        <button onClick={() => openModal("body")}>Legs</button>
        <button onClick={() => openModal("eyes")}>Eyes&Glasses</button> {/* Yeni buton */}
        <button onClick={() => openModal("mouth")}>Mouth</button>
        <button onClick={() => openModal("facialHair")}>Facial-Hair</button>
        <button onClick={() => openModal("hats")}>Hats&Masks</button>
        <button onClick={() => openModal("necklace")}>Necklaces</button>
        <button onClick={() => openModal("accessory")}>Accesories</button>

        <button onClick={() => openModal("extras")}>Extras</button>


      </div>

   {/* İndirme Butonu */}
   <div className="download-button-container">
  <button className="download-button" onClick={handleDownload}>
    Download
  </button>

  {/* İlerleme Çubuğu */}
  <div className="progress-bar-container">
    <div
      className="progress-bar"
      style={{ width: `${(downloadCount / 500) * 100}%` }} // İlerleme çubuğunu dinamik olarak ayarla
    ></div>
  </div>

  
  </div>

  {/* <div className="coming-soon">
  <span>Coming Soon</span>
  <span className="arrow">↓</span> 
</div> */}

<input
      type="color"
      value={borderColor}
      onChange={(e) => setBorderColor(e.target.value)}
      class="color-input"
    />
    {/* <span class="color-label">Select Border Color</span> */}
 


{/* Modal */}
{activeModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Options</h2>

      {/* Seçilen eşyanın kutusu */}
      <div className="selected-item-box">
        <div className="selected-item-header">
          <h3>Selected Item</h3>
          {getSelectedItemByType(activeModal) && (
            <button
              className="remove-button"
              onClick={() => handleRemoveSelected(activeModal)}
            >
              ✖
            </button>
          )}
        </div>
        <div className="selected-item-content">
          {getSelectedItemByType(activeModal) ? (
            <img
              src={getSelectedItemByType(activeModal)}
              alt="Selected"
            />
          ) : (
            <span>No item selected</span>
          )}
        </div>
      </div>

      {/* Seçenekler */}
      <div className="options">
        {(
        activeModal === "head"
        ? heads
        : activeModal === "body"
        ? bodies
        : activeModal === "background"
        ? backgrounds
        : activeModal === "necklace"
        ? necklaces
        : activeModal === "accessory"
        ? accessories
        : activeModal === "mouth"
        ? mouths
        : activeModal === "facialHair"
        ? facialHairs
        : activeModal === "eyes"
        ? eyes
      : activeModal === "hats"
      ? hats
      : extras // Yeni seçenek olarak 'extras' eklendi
    

        ).map((item) => (
          <img
            key={item.id}
            src={item.img}
            alt="option"
            onClick={() => handleSelect(activeModal, item.img)}
          />
        ))}
      </div>
      <button onClick={closeModal}>Close</button>
    </div>
  </div>
)}

    </div>
  );
};

export default Dressup;
