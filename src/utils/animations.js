import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger)

export const animateWithGsap = (target, animationProps, scrollProps) => {
  gsap.to(target, {
    ...animationProps, 
    scrollTrigger: {
      trigger:target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps
    }
  })
}


export const animateWithGsapTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps
) => {
  //firstTarget(#view1) and secondTarget(#view2)

  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });
  
  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<" //Esto simboliza insertar la animación al inicio de la animación anterior.
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<" //Esto simboliza insertar la animación al inicio de la animación anterior.
  );
};
