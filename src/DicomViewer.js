import React, { useState, useEffect, useRef } from "react";
import Hammer from "hammerjs";
import dicomParser from "dicom-parser";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoader.js";
import * as cornerstoneTools from "cornerstone-tools";

// Externals
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;

// // CodeSandbox live updates components in an odd way.
// // We do this to protect ourselves from duplicate initializations
if (!cornerstoneWADOImageLoader.initialized) {
  // WadoImageLoader Registration/Config
  const config = {
    webWorkerPath: "/codecs/cornerstoneWADOImageLoaderWebWorker.js",
    taskConfiguration: {
      decodeTask: {
        codecsPath: "/codecs/cornerstoneWADOImageLoaderCodecs.js",
      },
    },
  };
  cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
  cornerstoneWADOImageLoader.initialized = true;
}

export function DicomViewer(props) {
  const canvas1 = useRef();
  const canvas2 = useRef();

  useEffect(() => {
    cornerstoneTools.init({
      globalToolSyncEnabled: true,
    });
    // Grab Tool Classes
    global.cornerstoneTools = cornerstoneTools;
    const StackScrollMouseWheelTool =
      cornerstoneTools.StackScrollMouseWheelTool;

    // Add them
    // cornerstoneTools.addTool(PanTool);
    // cornerstoneTools.addTool(ZoomTool);
    // cornerstoneTools.addTool(WwwcTool);
    // cornerstoneTools.addTool(PanMultiTouchTool);
    // cornerstoneTools.addTool(ZoomTouchPinchTool);
    cornerstoneTools.addTool(StackScrollMouseWheelTool);
    // cornerstoneTools.StackScrollWheel.activate(canvas2);

    // Set tool modes
    // cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 4 }); // Middle
    // cornerstoneTools.setToolActive("Zoom", { mouseButtonMask: 2 }); // Right
    // cornerstoneTools.setToolActive("Wwwc", { mouseButtonMask: 1 }); // Left & Touch
    // cornerstoneTools.setToolActive("PanMultiTouch", {});
    // cornerstoneTools.setToolActive("ZoomMouseWheel", {});
    // cornerstoneTools.setToolActive("ZoomTouchPinch", {});
    cornerstoneTools.setToolActive("StackScrollMouseWheel", {});
    // console.log(cornerstoneTools.StackScrollMouseWheelTool);

    cornerstone.enable(canvas1.current, {
      renderer: "webgl",
    });
    cornerstone.enable(canvas2.current, {
      renderer: "webgl",
    });
    const synchronizer = new cornerstoneTools.Synchronizer(
      "cornerstonenewimage",
      cornerstoneTools.updateImageSynchronizer
    );
    const codeSandboxProjectUrl = "https://9jy10r8x7w.codesandbox.io";

    // Setup canvas 1
    // const canvasStack1 = {
    //   currentImageIdIndex: 0,
    //   imageIds: [
    //     "wadouri:http://pacsapp.mediplus.vn:741/vrpacs-scu/study-get-public?link=2MypsrMTGaOHVYGXJ2LH8nK+wWGM4IqbxgtoXXCI3_qR3v_p8QkMsPVa5PNWEbjlEcyhCeeR7urZdwkhDd+UpYHU7+nxAxCs81zw+1sBu+kbz6AE+5L89sssQmBKmNb3kd7_6OwBEKzzV_37Whu_5RvJpBy1oQ.mRlAJjkYSo5ZJGRO5K7_VQ&file=0005.1.2.840.113619.2.44.10795885.11628122.89718.1659918885.155.dcm",
    //     `wadouri:http://localhost:3000/image11.dcm`,
    //     // `wadouri:/vrpacs-scu/study-get-public?link=jI2+rDiwQJfPjsMi9TmCcFbkpq9Q6RMffSwgwGbgyM3Fn+j3eqpVhL2BpkaESv1nNZbGxzuYd25iUEG8G7eDktWV+Pd6oEmYu4eyTola_ms_lcfKJ5tlcnALCv1c8MHAxZ_o9meiSZi7jL9OiUD6Zz+Wx9JpqA.982YISP37Z1m_5c6tj11EA&file=thum.jpg`,
    //     `wadouri:${codeSandboxProjectUrl}/s1/2.dcm`,
    //   ],
    // };

    // cornerstone.loadImage(canvasStack1.imageIds[0]).then((image) => {
    //   cornerstone.displayImage(canvas1.current, image);

    //   // set the stack as tool state
    //   synchronizer.add(canvas1.current);
    //   cornerstoneTools.addStackStateManager(canvas1.current, [
    //     "stack",
    //     "crosshairs",
    //   ]);
    //   cornerstoneTools.addToolState(canvas1.current, "stack", canvasStack1);
    // });
    const canvasStack2 = {
      currentImageIdIndex: 0,
      imageIds: [
        "wadouri:/vrpacs-scu/study-get-public?link=KdGTO2p7uLOfkD7+J3fGvCVDLXK7P51LQsTxDDTsYVVgw8VgKG6toOyfVJdWA7miQjNFHtBO+TpduJBwSbsqCnDJ1WAoa7G86p5Pk1IUuqpMNU4Xz07rJk_j2zEO_GhYYMPFYTVptrzrmkKTWg6+oEwwTQ+Cfg.m+d2x1lziQG7_7K5PVgheA&file=0001.1.2.840.113619.2.44.10795885.11628122.87917.1658624068.881.dcm",
        "wadouri:/vrpacs-scu/study-get-public?link=KdGTO2p7uLOfkD7+J3fGvCVDLXK7P51LQsTxDDTsYVVgw8VgKG6toOyfVJdWA7miQjNFHtBO+TpduJBwSbsqCnDJ1WAoa7G86p5Pk1IUuqpMNU4Xz07rJk_j2zEO_GhYYMPFYTVptrzrmkKTWg6+oEwwTQ+Cfg.m+d2x1lziQG7_7K5PVgheA&file=0002.1.2.840.113619.2.44.10795885.11628122.87917.1658624068.894.dcm",
        "wadouri:/vrpacs-scu/study-get-public?link=KdGTO2p7uLOfkD7+J3fGvCVDLXK7P51LQsTxDDTsYVVgw8VgKG6toOyfVJdWA7miQjNFHtBO+TpduJBwSbsqCnDJ1WAoa7G86p5Pk1IUuqpMNU4Xz07rJk_j2zEO_GhYYMPFYTVptrzrmkKTWg6+oEwwTQ+Cfg.m+d2x1lziQG7_7K5PVgheA&file=0003.1.2.840.113619.2.44.10795885.11628122.87917.1658624068.882.dcm",
        "wadouri:/vrpacs-scu/study-get-public?link=KdGTO2p7uLOfkD7+J3fGvCVDLXK7P51LQsTxDDTsYVVgw8VgKG6toOyfVJdWA7miQjNFHtBO+TpduJBwSbsqCnDJ1WAoa7G86p5Pk1IUuqpMNU4Xz07rJk_j2zEO_GhYYMPFYTVptrzrmkKTWg6+oEwwTQ+Cfg.m+d2x1lziQG7_7K5PVgheA&file=0004.1.2.840.113619.2.44.10795885.11628122.87917.1658624068.895.dcm",
        "wadouri:/vrpacs-scu/study-get-public?link=KdGTO2p7uLOfkD7+J3fGvCVDLXK7P51LQsTxDDTsYVVgw8VgKG6toOyfVJdWA7miQjNFHtBO+TpduJBwSbsqCnDJ1WAoa7G86p5Pk1IUuqpMNU4Xz07rJk_j2zEO_GhYYMPFYTVptrzrmkKTWg6+oEwwTQ+Cfg.m+d2x1lziQG7_7K5PVgheA&file=0005.1.2.840.113619.2.44.10795885.11628122.87917.1658624068.883.dcm",
        "wadouri:/vrpacs-scu/study-get-public?link=KdGTO2p7uLOfkD7+J3fGvCVDLXK7P51LQsTxDDTsYVVgw8VgKG6toOyfVJdWA7miQjNFHtBO+TpduJBwSbsqCnDJ1WAoa7G86p5Pk1IUuqpMNU4Xz07rJk_j2zEO_GhYYMPFYTVptrzrmkKTWg6+oEwwTQ+Cfg.m+d2x1lziQG7_7K5PVgheA&file=0006.1.2.840.113619.2.44.10795885.11628122.87917.1658624068.896.dcm",
        "wadouri:/vrpacs-scu/study-get-public?link=KdGTO2p7uLOfkD7+J3fGvCVDLXK7P51LQsTxDDTsYVVgw8VgKG6toOyfVJdWA7miQjNFHtBO+TpduJBwSbsqCnDJ1WAoa7G86p5Pk1IUuqpMNU4Xz07rJk_j2zEO_GhYYMPFYTVptrzrmkKTWg6+oEwwTQ+Cfg.m+d2x1lziQG7_7K5PVgheA&file=0007.1.2.840.113619.2.44.10795885.11628122.87917.1658624068.884.dcm",
        "wadouri:/vrpacs-scu/study-get-public?link=KdGTO2p7uLOfkD7+J3fGvCVDLXK7P51LQsTxDDTsYVVgw8VgKG6toOyfVJdWA7miQjNFHtBO+TpduJBwSbsqCnDJ1WAoa7G86p5Pk1IUuqpMNU4Xz07rJk_j2zEO_GhYYMPFYTVptrzrmkKTWg6+oEwwTQ+Cfg.m+d2x1lziQG7_7K5PVgheA&file=0008.1.2.840.113619.2.44.10795885.11628122.87917.1658624068.897.dcm",
        "wadouri:/vrpacs-scu/study-get-public?link=KdGTO2p7uLOfkD7+J3fGvCVDLXK7P51LQsTxDDTsYVVgw8VgKG6toOyfVJdWA7miQjNFHtBO+TpduJBwSbsqCnDJ1WAoa7G86p5Pk1IUuqpMNU4Xz07rJk_j2zEO_GhYYMPFYTVptrzrmkKTWg6+oEwwTQ+Cfg.m+d2x1lziQG7_7K5PVgheA&file=0009.1.2.840.113619.2.44.10795885.11628122.87917.1658624068.885.dcm",
        "wadouri:/vrpacs-scu/study-get-public?link=KdGTO2p7uLOfkD7+J3fGvCVDLXK7P51LQsTxDDTsYVVgw8VgKG6toOyfVJdWA7miQjNFHtBO+TpduJBwSbsqCnDJ1WAoa7G86p5Pk1IUuqpMNU4Xz07rJk_j2zEO_GhYYMPFYTVptrzrmkKTWg6+oEwwTQ+Cfg.m+d2x1lziQG7_7K5PVgheA&file=0010.1.2.840.113619.2.44.10795885.11628122.87917.1658624068.898.dcm",
      ].map((x) =>
        x.replace("wadouri:/", "wadouri:http://pacsapp.mediplus.vn:741/")
      ),
    };
    cornerstone.loadImage(canvasStack2.imageIds[0]).then((image) => {
      cornerstone.displayImage(canvas2.current, image);

      // set the stack as tool state
      synchronizer.add(canvas2.current);
      cornerstoneTools.addStackStateManager(canvas2.current, ["stack"]);
      cornerstoneTools.addToolState(canvas2.current, "stack", canvasStack2);
      // cornerstoneTools.StackScrollMouseWheelTool.activate(canvas2.current);
    });

    // setTimeout(() => {
    //   const CrosshairsTool = cornerstoneTools.CrosshairsTool;
    //   console.log(synchronizer);
    //   console.log(synchronizer.getSourceElements());

    //   cornerstoneTools.addTool(CrosshairsTool);
    //   cornerstoneTools.setToolActive("Crosshairs", {
    //     mouseButtonMask: 1,
    //     synchronizationContext: synchronizer
    //   });
    // }, 5000);
  }, []);

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div ref={canvas1} style={{ flex: 1 }}></div>
      <div ref={canvas2} style={{ flex: 1 }}></div>
    </div>
  );
}
