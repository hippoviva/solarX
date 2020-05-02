const sizeReducer = .5

const mercury = {
    name: "Mercury",
    orbit: 67 - 8,
    size: 3 + 6,
    speed: 24.7,
    angle: 60,
    color: "lightgrey",
    imageSource: "mercury-transparent.png",
    temp: "-280 - 800 F",
    mass: ".05 Earth mass",
    atmosphere: "Trace",
    cosmic: "Atmosphere too thin to block cosmic rays",
    surface: "solid and rocky",
    water: "Ice may be present in craters",
    magnetosphere: "Adequate magnetosphere to prevent solar radiation",
    moon: "none",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    moons: [{
        name: "none"
    }],
    question: [{
            q1: false,
            text: "The atmosphere of the planet"
        },
        {
            q2: false,
            text: "Temperature of the surface"
        },
        {
            q3: true,
            text: "The type of surface."
        },
        {
            q4: false,
            text: "The strength of the magnetosphere."
        }
    ]
};

const venus = {
    name: "Venus",
    orbit: 90,
    size: 7 + 6,
    speed: 12,
    angle: 120,
    color: "green",
    imageSource: "venus-transparent.png",
    temp: "867 F",
    mass: ".8 Earth mass",
    atmosphere: "Thick atmosphere of carbon dioxide and nitrogen",
    cosmic: "Atmosphere thick enough to block cosmic rays",
    surface: "solid and rocky",
    water: "No water present",
    magnetosphere: "Inadequte magnetosphere to prevent solar radiation",
    moon: "none",
    hit: false,
    location: {
        x: 20,
        y: 20
    },
    moons: [{
        name: "none"
    }],
    question: [{
            q1: true,
            text: "The mass of the planet."
        },
        {
            q2: false,
            text: "The temperature of the surface"
        },
        {
            q3: false,
            text: "Water is not presentv."
        },
        {
            q4: false,
            text: "The strength of the magnetosphere."
        }
    ]
};

const sun = {
    name: "Sun",
    size: 20,
    imageSource: "sun-transparent.png"
}

const earth = {
    name: "Earth",
    orbit: 140,
    size: 8 + 6,
    speed: 2 + 6,
    angle: 0,
    color: "blue",
    imageSource: "earth-transparent.png",
    temp: "50F",
    mass: "Excellent amount so atmosphere is thick enough.",
    atmosphere: "Contains Nitrogen 75% and Oxygen 23%",
    cosmic: "Atmosphere thick enough to reduce cosmic rays.",
    surface: "Solid and rocky",
    water: "Abundant and present in all three states.",
    magnetosphere: "Strong enough to prevent solar radiation.",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    moons: [moon],
    question: [{
            q1: true,
            text: "The mass of the planet."
        },
        {
            q2: true,
            text: "Water is present."
        },
        {
            q3: true,
            text: "How far it is from the Sun."
        },
        {
            q4: true,
            text: "The strength of the magnetosphere."
        }
    ]
};

const mars = {
    name: "Mars",
    orbit: 200,
    size: 8,
    speed: 1 + 6,
    angle: 90,
    color: "red",
    imageSource: "mars-transparent.png",
    temp: "-226F to 95F",
    mass: "10% earth mass, not large enough so atmosphere is only 10% of Earth",
    atmosphere: "Contains Carbon Dioxide and Nitrogen, only 1% as thick as Earth's",
    cosmic: "Not thick enough to reduce cosmic rays",
    surface: "Solid and rocky",
    water: "Present but frozen below surface.",
    magnetosphere: "No magnetosphere to prevent solar radiation",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    moons: [phobos,
        deimos
    ],
    question: [{
            q1: true,
            text: "The mass of the planet."
        },
        {
            q2: false,
            text: "Water is not present."
        },
        {
            q3: false,
            text: "The temperature of the surface."
        },
        {
            q4: false,
            text: "The strength of the magnetosphere."
        }
    ]
};
const jupiter = {
    name: "Jupiter",
    orbit: 400,
    size: 88 * sizeReducer,
    speed: 3,
    angle: 270,
    color: "purple",
    imageSource: "jupiter-transparent.png",
    temp: "-166F",
    mass: "318x earth mass",
    atmosphere: "Hydrogen 89% and Helium 10.2% ",
    cosmic: "Extremely thick atmosphere",
    surface: "Gas giant, core frozen hydrogen",
    water: "None",
    magnetosphere: "Extremely strong magnetosphere",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    moons: [io, europa, ganymede, calisto],
    question: [{
            q1: false,
            text: "The mass of the planet."
        },
        {
            q2: false,
            text: "Does not have rocky surface."
        },
        {
            q3: false,
            text: "The temperature of the surface."
        },
        {
            q4: false,
            text: "The strength of the magnetosphere."
        }
    ]
};
const saturn = {
    name: "Saturn",
    orbit: 500,
    size: 75 * sizeReducer,
    speed: 2.3,
    angle: 45,
    color: "orange",
    imageSource: "saturn-transparent.png",
    temp: "-220F",
    mass: "95x Earth mass",
    atmosphere: "Contains Hydrogen and Helium",
    cosmic: "Very thick to reduce cosmic rays",
    surface: "Gas giant, so useful solid surface",
    water: "None present",
    magnetosphere: "Strong magnetosphere to prevent solar radiation",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    moons: [enceladus, titan],
    question: [{
            q1: false,
            text: "The mass of the planet."
        },
        {
            q2: false,
            text: "The temperature of the surface"
        },
        {
            q3: false,
            text: "Water is not present"
        },
        {
            q4: true,
            text: "The strength of the magnetosphere."
        }
    ]
};
const uranus = {
    name: "Uranus",
    orbit: 600,
    size: 31 * sizeReducer,
    speed: 2,
    angle: 130,
    color: "lightblue",
    imageSource: "uranus-transparent.png",
    temp: "-320F",
    mass: "15 Earth mass",
    atmosphere: "Contains Hydrogen, Helium and Methane",
    cosmic: "Very thick atmosphere",
    surface: "Gas giant that has no rocky surface",
    water: "Possible ice in mantle but not accessible.",
    magnetosphere: "Magnetosphere opens to solar radiation",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    moons: [miranda, ariel, umbriel, titamia],
    question: [{
            q1: false,
            text: "How far it is from the Sun"
        },
        {
            q2: false,
            text: "Composition of the atmosphere"
        },
        {
            q3: false,
            text: "The temperature of the surface."
        },
        {
            q4: false,
            text: "The strength of the magnetosphere."
        }
    ]
};

const ceres = {
    name: "Ceres",
    orbit: 270,
    size: 6 * sizeReducer,
    speed: 5,
    angle: 90,
    color: "lightgreen",
    imageSource: "ceres-transparent.gif",
    temp: "-120F",
    mass: "Dwarf Planet .2 Earth mass",
    atmosphere: "Only a trace or thin atmosphere",
    cosmic: "Not thick enough to reduce cosmic rays",
    surface: "Rocky, cratered surface",
    water: "Water ice present in craters and underground",
    magnetosphere: "No magnetosphere to prevent solar radiation",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    moons: [{
        name: "none"
    }],
    question: [{
            q1: true,
            text: "Composition of the surface."
        },
        {
            q2: false,
            text: "Surface temperature"
        },
        {
            q3: false,
            text: "water ice present"
        },
        {
            q4: false,
            text: "Too far from the Sun."
        }
    ]
};
const neptune = {
    name: "Neptune",
    orbit: 700,
    size: 30 * sizeReducer,
    speed: 1,
    angle: 320,
    color: "lightgreen",
    imageSource: "neptune-transparent.png",
    temp: "-330F",
    mass: "17x Earth mass",
    atmosphere: "Contains Hydrogen, Helium and Methane",
    cosmic: "Thick enough to reduce cosmic rays",
    surface: "Gas giant without rocky surface",
    water: "Water and ammonia ices present in mantle.",
    magnetosphere: "Strong magnetosphere to prevent solar radiation",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    moons: [proteus, triton],
    question: [{
            q1: false,
            text: "Composition of the surface."
        },
        {
            q2: false,
            text: "Surface temperature"
        },
        {
            q3: false,
            text: "Gas giant"
        },
        {
            q4: false,
            text: "Too far from the Sun."
        }
    ]
};
const asteroids = {
    name: "Asteroids",
    orbit: 200,
    size: 1,
    speed: 5,
    howMany: 500,
    //angle: 0,
    color: "grey",
    //imageSource: "",
    temp: "-330F",
    mass: ".0001 Earth mass",
    atmosphere: "None",
    cosmic: "Too thin to reduce cosmic rays",
    surface: "Rocky",
    water: "No water",
    magnetosphere: "No magnetosphere",
    hit: false,
    location: {
        //   x: 0,
        //   y: 0
    },
    moons: ["none"],
    question: [{
            q1: false,
            text: "Composition of the surface."
        },
        {
            q2: false,
            text: "Surface temperature"
        },
        {
            q3: false,
            text: "Gas giant"
        },
        {
            q4: false,
            text: "Too far from the Sun."
        }
    ]
};