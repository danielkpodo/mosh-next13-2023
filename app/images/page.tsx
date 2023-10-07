import Image from "next/image";
import React from "react";
import motivation from "@/public/assets/images/never_give_up.jpg";

const NextImageOptimization = () => {
  return (
    <>
      {/* // this is for local images */}
      {/* <Image src={motivation§} alt="Never Give up" /> */}
      <div className="relative h-screen">
        {/* the h-screen on the parent image tells the container to take 100% of the viewport
        but if the image is going to be in a card allocate a certain height to the parent of the card
        */}
        <Image
          /**
           * for the image to work we need to register the url in our our next config
           * we search for remote patterns on the next-image page
           * In the config we add one or more domains where we are allowed to serve images
           * This is for security reasons otherwise anyone can take the endpoint that next exposes for serving optimized images
           */
          src="https://bit.ly/react-cover"
          alt="mosh react course"
          // when we use fill the parent element should have position of relative, absolute, fixed. (use relative) and also to maintain the responsivenes we set object-fit
          // the main element by default have a position of static
          fill
          className="object-cover"
          /**
           * when showing responsive images using the fill prop, we often need to set sizes as well
           * this determine how much of the viewport this image is going to take
           * for background image we want the image to take 100% width ofthe viewport (sizes="100vw")
           * This sizes dimension takes effect when the image is in a grid
           * The sizes prop is only for nextjs to serve different images based on screen sizes, it does not impact the screen
           */
          sizes="(max-width: 480px) 100vw,  (max-width: 768px)  50vw, 33vw"
          /*
          33vw is the desktop
           * the sizes attribute is used to tell the browser what size of image to load
           * the sizes attribute is a comma separated list of media queries
           * the first media query is the smallest image size and the last is the largest
           * the browser will load the image that matches the media query that matches the device
           */

          /***
           optional props
          prioity is set for images that should appear above the fold, the image component uses lazy loading so our
          images are only retrieved when they are visible in the viewport
          NOTE: when we have images that should be visible right from the get go set priority to true
           *
           */
          priority
          quality={100}

          /**
           * the quality value ranges form 1 - 100
           * the default quality is 75 but sometimes for background images you want to set the quality higher to say 100
           */
        />
      </div>
    </>
  );
};

export default NextImageOptimization;
