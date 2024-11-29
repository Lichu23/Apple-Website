import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { yellowImg } from "../utils";
import IphoneModelView from "./IphoneModelView";

import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";

const Model = () => {
  const [size, setSize] = useState("small");

  //Creamos un model default para poder modificaarlo despues
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  //camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  //actual model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  //rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  //timeline para la animacion de los iphone3D cuando cambiemos el tamaño
  const timeline = gsap.timeline()

  useEffect(() => {
    if(size === "large") {
      animateWithGsapTimeline(timeline, small, smallRotation, "#view1", "#view2", {
        transform:"translateX(-100%)", //this will remove it from the view
        duration: 2


      }) //utilizamos todo small porque va a ser cuando del large pasemos al small
    }

    if(size === "small") {
      animateWithGsapTimeline(timeline, large, largeRotation, "#view2", "#view1", {
        transform:"translateX(0)",
        duration: 2
      }) 
    }
  }, [size])

  useGSAP(() => {
    gsap.to("#heading", {
      opacity: 1,
      y: 0,
      duration: 1,
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <IphoneModelView
              index={1} //primer model a mostrar
              groupRef={small} //le pasamos el model small
              gsapType="view1"
              controlRef={cameraControlSmall} //camera control
              setRotationState={setSmallRotation} //setear la rotacion
              item={model} //las propiedad del iphone como title, color, img
              size={size} //size default que tenemos en este caso small
            />
            <IphoneModelView
              index={2} //segundo model a mostrar
              groupRef={large} //le pasamos el model large
              gsapType="view2"
              controlRef={cameraControlLarge} //camera control
              setRotationState={setSmallRotation} //setear la rotacion
              item={model} //las propiedad del iphone como title, color, img
              size={size} //size default que tenemos en este caso small
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                    key={i}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    onClick={() => setSize(value)}
                    className={`size-btn ${
                      (size === value ? "bg-white" : "bg-transparent",
                      size === value ? "text-black" : "text-white")
                    }`}
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                    }}
                    key={label}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
