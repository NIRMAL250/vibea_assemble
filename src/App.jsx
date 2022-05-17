import React from "react";
import {
  Player,
  BigPlayButton,
  ControlBar,
  ClosedCaptionButton,
} from "video-react";
import "./App.css";

import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js";

export default (props) => {
  var object;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    95,
    innerWidth / innerHeight,
    0.1,
    1000
  );
  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  var generate = (cameraPosition, model) => {
    const beeURL = "../models/Bee.glb";
    const roboURL = "../models/robo/scene.gltf";
    var url;
    if (model == "bee") url = beeURL;
    else if (model == "robo") url = roboURL;
    scene.clear();
    var loader = new GLTFLoader();
    loader.load(
      // resource URL
      url,
      // called when the resource is loaded
      function (gltf) {
        scene.add(gltf.scene);
        object = gltf.scene;
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
      },
      // called while loading is progressing
      function (xhr) {
        //console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function (error) {
        console.log(error);
      }
    );
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    scene.add(light);
    const backlight = new THREE.DirectionalLight(0xffffff, 1);
    backlight.position.set(0, 0, -1);
    scene.add(backlight);
    camera.position.z = cameraPosition;
    function animate() {
      scene.rotation.y += 0.005;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();
  };
  // document.getElementById("bee").addEventListener("click", () => {
  //   generate(25, "bee");
  // });

  // document.getElementById("robo").addEventListener("click", () => {
  //   generate(5, "robo");
  // });
  const getCaption = () => {
    console.log("hello");
  };
  return (
    <div>
      {/* <Player videoId="video-1">
        <source
          src="//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4"
          type="video/mp4"
        />
        <source
          src="//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.ogg"
          type="video/ogg"
        />
        <BigPlayButton position="center" />

        <track
          kind="captions"
          src="/assets/elephantsdream/captions.en.vtt"
          srcLang="en"
          label="English"
          default
        />

        <ControlBar autoHide={false}>
          <ClosedCaptionButton order={7} />
        </ControlBar>
      </Player> */}
      <video
        className="video-js"
        controls
        preload="auto"
        width="640"
        height="264"
        data-setup="{}"
      >
        <source
          src="//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4"
          type="video/mp4"
        />
        <track
          kind="captions"
          src="../video/caption.en.vtt"
          srcLang="en"
          label="English"
          default
        />
      </video>
      {getCaption()}
      <div className="modelContainer">
        <h1>Model</h1>
        <hr />
        <button
          onClick={() => {
            var container = document.getElementById("modelContainer");
            console.log(container);
            generate(25, "bee");
          }}
        >
          Bee
        </button>
        <button
          onClick={() => {
            generate(5, "robo");
          }}
        >
          robo
        </button>
      </div>
    </div>
  );
};
