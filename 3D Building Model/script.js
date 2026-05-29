import * as THREE from "https://esm.sh/three@0.152.2";

import { OrbitControls } from
"https://esm.sh/three@0.152.2/examples/jsm/controls/OrbitControls";



// ======================
// SCENE
// ======================

const scene = new THREE.Scene();

scene.background =
new THREE.Color(0x050816);




// ======================
// CAMERA
// ======================

const camera =
new THREE.PerspectiveCamera(

    75,

    window.innerWidth /
    window.innerHeight,

    0.1,

    1000
);

camera.position.set(0,8,18);




// ======================
// RENDERER
// ======================

const renderer =
new THREE.WebGLRenderer({

    canvas:
    document.getElementById('bg'),

    antialias:true
});

renderer.setSize(

    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    window.devicePixelRatio
);




// ======================
// ORBIT CONTROLS
// ======================

const controls =
new OrbitControls(

    camera,
    renderer.domElement
);

controls.enableDamping = true;

controls.dampingFactor = 0.05;

controls.enablePan = true;

controls.minDistance = 8;

controls.maxDistance = 40;

controls.maxPolarAngle =
Math.PI / 2;





// ======================
// LIGHTS
// ======================

// Main Light
const light =
new THREE.DirectionalLight(

    0xffffff,
    2
);

light.position.set(10,20,10);

scene.add(light);


// Ambient Light
const ambientLight =
new THREE.AmbientLight(

    0xffffff,
    1.5
);

scene.add(ambientLight);




// ======================
// BUILDING GROUP
// ======================

let buildingMesh = null;

let ground = null;

let parking = null;





// ======================
// BUTTON EVENT
// ======================

document
.getElementById('generateBtn')
.addEventListener(

    'click',

    createHouse
);




// ======================
// CREATE HOUSE
// ======================

function createHouse(){


    // ======================
    // REMOVE OLD HOUSE
    // ======================

    if(buildingMesh){

        scene.remove(buildingMesh);
    }

    if(ground){

        scene.remove(ground);
    }

    if(parking){

        scene.remove(parking);
    }



    // ======================
    // NEW GROUP
    // ======================

    buildingMesh =
    new THREE.Group();




    // ======================
    // GET VALUES
    // ======================

    const wallColor =
    document.getElementById(
        'wallColor'
    ).value;


    const roofType =
    document.getElementById(
        'roofType'
    ).value;


    const width =
    parseFloat(
        document.getElementById(
            'houseWidth'
        ).value
    );


    const height =
    parseFloat(
        document.getElementById(
            'houseHeight'
        ).value
    );


    const depth =
    parseFloat(
        document.getElementById(
            'houseDepth'
        ).value
    );


    const floors =
    parseInt(
        document.getElementById(
            'floors'
        ).value
    );


    const gardenEnabled =
    document.getElementById(
        'garden'
    ).value;


    const balconyEnabled =
    document.getElementById(
        'balcony'
    ).value;


    const sofaNeeded =
    document.getElementById(
        'sofaNeeded'
    ).value;


    const sofaColor =
    document.getElementById(
        'sofaColor'
    ).value;


    const kitchenNeeded =
    document.getElementById(
        'kitchenNeeded'
    ).value;


    const kitchenColor =
    document.getElementById(
        'kitchenColor'
    ).value;


    const bedroomCount =
    parseInt(
        document.getElementById(
            'bedroomCount'
        ).value
    );


    const bedColor =
    document.getElementById(
        'bedColor'
    ).value;


    const tvNeeded =
    document.getElementById(
        'tvNeeded'
    ).value;


    const diningNeeded =
    document.getElementById(
        'diningNeeded'
    ).value;


    const garageNeeded =
    document.getElementById(
        'garageNeeded'
    ).value;


    const parkingWidth =
    parseFloat(
        document.getElementById(
            'parkingWidth'
        ).value
    );


    const stairsNeeded =
    document.getElementById(
        'stairsNeeded'
    ).value;




    // ======================
    // TOTAL HEIGHT
    // ======================

    const totalHeight =
    height * floors;





    // ======================
    // HOUSE BODY
    // ======================

    const houseGeometry =
    new THREE.BoxGeometry(

        width,
        totalHeight,
        depth
    );


    const houseMaterial =
    new THREE.MeshStandardMaterial({

        color:wallColor,

        transparent:true,

        opacity:0.35
    });


    const house =
    new THREE.Mesh(

        houseGeometry,
        houseMaterial
    );


    house.position.y =
    totalHeight / 2;


    buildingMesh.add(house);





    // ======================
    // ROOF
    // ======================

    let roof;


    if(roofType === 'cone'){

        const roofGeometry =
        new THREE.ConeGeometry(

            width * 0.9,
            2,
            4
        );


        const roofMaterial =
        new THREE.MeshStandardMaterial({

            color:0x222222
        });


        roof =
        new THREE.Mesh(

            roofGeometry,
            roofMaterial
        );


        roof.rotation.y =
        Math.PI / 4;


        roof.position.y =
        totalHeight + 1;
    }

    else{

        const roofGeometry =
        new THREE.BoxGeometry(

            width + 0.4,
            0.3,
            depth + 0.4
        );


        const roofMaterial =
        new THREE.MeshStandardMaterial({

            color:0x333333
        });


        roof =
        new THREE.Mesh(

            roofGeometry,
            roofMaterial
        );


        roof.position.y =
        totalHeight + 0.15;
    }


    buildingMesh.add(roof);





    // ======================
    // DOOR
    // ======================

    const doorGeometry =
    new THREE.BoxGeometry(

        1,
        2,
        0.1
    );


    const doorMaterial =
    new THREE.MeshStandardMaterial({

        color:0x8b4513
    });


    const door =
    new THREE.Mesh(

        doorGeometry,
        doorMaterial
    );


    door.position.set(

        0,
        1,
        depth/2 + 0.05
    );


    buildingMesh.add(door);





    // ======================
    // WINDOWS
    // ======================

    for(let i=-1; i<=1; i+=2){

        const windowGeometry =
        new THREE.BoxGeometry(

            1.2,
            1.2,
            0.1
        );


        const windowMaterial =
        new THREE.MeshStandardMaterial({

            color:0x9be7ff,

            transparent:true,

            opacity:0.7
        });


        const windowMesh =
        new THREE.Mesh(

            windowGeometry,
            windowMaterial
        );


        windowMesh.position.set(

            i * (width/3),
            totalHeight/2,
            depth/2 + 0.05
        );


        buildingMesh.add(windowMesh);
    }






    // ======================
    // BALCONY
    // ======================

    if(balconyEnabled === 'yes'){

        const balconyGeometry =
        new THREE.BoxGeometry(

            width * 0.5,
            0.2,
            1.5
        );


        const balconyMaterial =
        new THREE.MeshStandardMaterial({

            color:0x777777
        });


        const balcony =
        new THREE.Mesh(

            balconyGeometry,
            balconyMaterial
        );


        balcony.position.set(

            0,
            totalHeight - 0.5,
            depth/2 + 0.8
        );


        buildingMesh.add(balcony);
    }







    // ======================
    // STAIRS
    // ======================

    if(stairsNeeded === 'yes'){

        for(let i=0; i<5; i++){

            const stairGeometry =
            new THREE.BoxGeometry(

                2,
                0.25,
                0.7
            );


            const stairMaterial =
            new THREE.MeshStandardMaterial({

                color:0x999999
            });


            const stair =
            new THREE.Mesh(

                stairGeometry,
                stairMaterial
            );


            stair.position.set(

                0,
                0.1 + i*0.25,
                depth/2 + 1.4 - i*0.45
            );


            buildingMesh.add(stair);
        }
    }








    // ======================
    // SOFA
    // ======================

    if(sofaNeeded === 'yes'){

        const sofaGeometry =
        new THREE.BoxGeometry(

            2.5,
            1,
            1
        );


        const sofaMaterial =
        new THREE.MeshStandardMaterial({

            color:sofaColor
        });


        const sofa =
        new THREE.Mesh(

            sofaGeometry,
            sofaMaterial
        );


        // INSIDE LEFT
        sofa.position.set(

            -width/4,
            0.6,
            0
        );


        buildingMesh.add(sofa);
    }








    // ======================
    // TV
    // ======================

    if(tvNeeded === 'yes'){

        const tvGeometry =
        new THREE.BoxGeometry(

            2,
            1,
            0.1
        );


        const tvMaterial =
        new THREE.MeshStandardMaterial({

            color:0x111111
        });


        const tv =
        new THREE.Mesh(

            tvGeometry,
            tvMaterial
        );


        tv.position.set(

            width/4,
            1.5,
            -depth/2 + 0.1
        );


        buildingMesh.add(tv);
    }








    // ======================
    // DINING TABLE
    // ======================

    if(diningNeeded === 'yes'){

        const diningGeometry =
        new THREE.BoxGeometry(

            2,
            0.3,
            2
        );


        const diningMaterial =
        new THREE.MeshStandardMaterial({

            color:0x5b3a29
        });


        const dining =
        new THREE.Mesh(

            diningGeometry,
            diningMaterial
        );


        dining.position.set(

            0,
            1,
            -1
        );


        buildingMesh.add(dining);
    }








    // ======================
    // KITCHEN
    // ======================

    if(kitchenNeeded === 'yes'){

        const kitchenGeometry =
        new THREE.BoxGeometry(

            3,
            1.2,
            1
        );


        const kitchenMaterial =
        new THREE.MeshStandardMaterial({

            color:kitchenColor
        });


        const kitchen =
        new THREE.Mesh(

            kitchenGeometry,
            kitchenMaterial
        );


        // BACK LEFT INSIDE
        kitchen.position.set(

            -width/3,
            0.7,
            -depth/3
        );


        buildingMesh.add(kitchen);
    }








    // ======================
    // BEDROOMS
    // ======================

    for(let i=0; i<bedroomCount; i++){

        const bedGeometry =
        new THREE.BoxGeometry(

            2.5,
            0.7,
            3
        );


        const bedMaterial =
        new THREE.MeshStandardMaterial({

            color:bedColor
        });


        const bed =
        new THREE.Mesh(

            bedGeometry,
            bedMaterial
        );


        bed.position.set(

            width/4,
            0.4,
            -i * 3
        );


        buildingMesh.add(bed);
    }








    // ======================
    // GROUND
    // ======================

    if(gardenEnabled === 'yes'){

        const groundGeometry =
        new THREE.PlaneGeometry(

            80,
            80
        );


        const groundMaterial =
        new THREE.MeshStandardMaterial({

            color:0x6ee16e
        });


        ground =
        new THREE.Mesh(

            groundGeometry,
            groundMaterial
        );


        ground.rotation.x =
        -Math.PI / 2;


        scene.add(ground);
    }








    // ======================
    // PARKING
    // ======================

    if(garageNeeded === 'yes'){

        const parkingGeometry =
        new THREE.PlaneGeometry(

            parkingWidth,
            12
        );


        const parkingMaterial =
        new THREE.MeshStandardMaterial({

            color:0x444444
        });


        parking =
        new THREE.Mesh(

            parkingGeometry,
            parkingMaterial
        );


        parking.rotation.x =
        -Math.PI / 2;


        parking.position.set(

            -width,
            0.01,
            0
        );


        scene.add(parking);
    }







    // ======================
    // ADD HOUSE
    // ======================

    scene.add(buildingMesh);
}





// ======================
// INITIAL HOUSE
// ======================

createHouse();




// ======================
// ANIMATION
// ======================

function animate(){

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(
        scene,
        camera
    );
}

animate();




// ======================
// RESPONSIVE
// ======================

window.addEventListener(

    'resize',

    ()=>{

        camera.aspect =
        window.innerWidth /
        window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,
            window.innerHeight
        );
    }
);