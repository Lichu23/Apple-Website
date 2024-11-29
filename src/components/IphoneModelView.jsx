import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import React, { Suspense } from "react";
import Lights from "./Lights";
import { Iphone3d } from "./Iphone3D";
import * as THREE from "three";
import Loader from "./Loader";

const IphoneModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}) => {
  return (
    //orbit control nos permite mover la camera con el mouse
    //group position [x:0 y:0 z:0] es para que el model este en el centro
    //Lights es para que podamos ver el Model del Iphone
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute  ${index === 2 ? "right-[-100%]" : ""} `}
    >
      <ambientLight intensity={7} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false} //desactivamos el zoom
        enablePan={false} //desplazamiento panorámico
        rotateSpeed={0.4} //velocidad de rotacion lenta y constante
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle)}
        //we need to get this specific angle to know where we are in the space
      />

      <group
        groupRef={groupRef}
        name={`${index === 1} ? "small" : "large`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader/>}>
          <Iphone3d
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default IphoneModelView;
