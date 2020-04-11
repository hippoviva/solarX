const moon = {
    name: "Moon",
    size: 2,
    orbit: 25,
    speed: 24,
    angle: 0,
    color: "white",
    imageSource: "moon-transparent.png",
    temp: "-4 F",
    mass: "25% earth mass",
    atmosphere: "Trace",
    cosmic: "Atmosphere too thin to reduce cosmic rays",
    surface: "solid and rocky",
    water: "Frozen water present",
    magnetosphere: "None",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    question: [{
            q1: false,
            text: "Only a trace atmosphere."
        },
        {
            q2: true,
            text: "Water is present."
        },
        {
            q3: true,
            text: "Nice rocky surface."
        },
        {
            q4: false,
            text: "How far it is from the Sun."
        }
    ]
}
const phobos = {
    name: "Phobos",
    size: 2,
    orbit: 9 + 4,
    speed: 10 + 9,
    angle: 0,
    color: "white",
    imageSource: "Phobos.jpg",
    temp: "- 233F",
    mass: ".001 earth mass",
    atmosphere: "None",
    cosmic: "Atmosphere too thin to reduce cosmic rays",
    surface: "solid and rocky",
    water: "None",
    magnetosphere: "None",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    question: [{
            q1: false,
            text: "No magnetosphere is present."
        },
        {
            q2: false,
            text: "No water present."
        },
        {
            q3: true,
            text: "Nice rocky surface."
        },
        {
            q4: false,
            text: "How far it is from the Sun."
        }
    ]

}
const deimos = {
    name: "Deimos",
    size: 2,
    orbit: 16 + 6 + 6,
    speed: 5,
    angle: 0,
    color: "white",
    imageSource: "Deimos.jpg",
    temp: "- 233F",
    mass: ".001 earth mass",
    atmosphere: "None",
    cosmic: "Atmosphere too thin to reduce cosmic rays",
    surface: "solid and rocky",
    water: "None",
    magnetosphere: "None",
    hit: false,
    location: {
        x: 120,
        y: 0
    },
    question: [{
            q1: false,
            text: "No magnetosphere is present."
        },
        {
            q2: false,
            text: "No water present."
        },
        {
            q3: true,
            text: "Nice rocky surface."
        },
        {
            q4: false,
            text: "How far it is from the Sun."
        }
    ]

}
const io = {
    name: "Io",
    size: 2,
    orbit: 45 + 5,
    speed: 20,
    angle: 0,
    color: "yellow",
    imageSource: "io-transparent.png",
    temp: "- 233F",
    mass: ".015 Earth mass",
    atmosphere: "None",
    cosmic: "Atmosphere too thin to reduce cosmic rays",
    surface: "solid and rocky",
    water: "None",
    magnetosphere: "Orbit is within Jupiter's extremely strong field.",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    question: [{
            q1: true,
            text: "Magnetosphere is present."
        },
        {
            q2: false,
            text: "No water present."
        },
        {
            q3: true,
            text: "Nice rocky surface."
        },
        {
            q4: false,
            text: "How far it is from the Sun."
        }
    ]
}
const europa = {
    name: "Europa",
    size: 3,
    orbit: 55 + 10,
    speed: 15,
    angle: 20,
    color: "lightblue",
    imageSource: "europa-transparent.png",
    temp: "- 233F",
    mass: ".01 earth mass",
    atmosphere: "None",
    cosmic: "Atmosphere too thin to reduce cosmic rays",
    surface: "solid and rocky",
    water: "None",
    magnetosphere: "None",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    question: [{
            q1: false,
            text: "How far it is from the Sun."
        },
        {
            q2: false,
            text: "No water present."
        },
        {
            q3: true,
            text: "Nice rocky surface."
        },
        {
            q4: false,
            text: "The mass of the moon."
        }
    ]
}

const ganymede = {
    name: "Ganymede",
    size: 3,
    orbit: 65 + 10,
    speed: 10,
    angle: 90,
    color: "lightgrey",
    imageSource: "ganymede-transparent.png",
    temp: "- 233F",
    mass: ".025 earth mass",
    atmosphere: "None",
    cosmic: "Atmosphere too thin to reduce cosmic rays",
    surface: "solid and rocky",
    water: "None",
    magnetosphere: "None",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    question: [{
            q1: false,
            text: "The solid and rocky surface."
        },
        {
            q2: false,
            text: "No water present."
        },
        {
            q3: true,
            text: "Nice rocky surface."
        },
        {
            q4: false,
            text: "How far it is from the Sun."
        }
    ]
}
const calisto = {
    name: "Calisto",
    size: 3,
    orbit: 75 + 15,
    speed: 10,
    angle: 220,
    color: "lightgrey",
    imageSource: "calisto-transparent.png",
    temp: "- 233F",
    mass: ".02 earth mass",
    atmosphere: "None",
    cosmic: "Atmosphere too thin to reduce cosmic rays",
    surface: "solid and rocky",
    water: "None",
    magnetosphere: "None",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    question: [{
            q1: false,
            text: "The amount of atmosphere."
        },
        {
            q2: false,
            text: "The temperature of the moon."
        },
        {
            q3: true,
            text: "Nice rocky surface."
        },
        {
            q4: false,
            text: "How far it is from the Sun."
        }
    ]
}
const enceladus = {
    name: "Enceladus",
    size: 2,
    orbit: 40,
    speed: 30,
    angle: 270,
    color: "white",
    imageSource: "enceladus-transparent.png",
    temp: "- 233F",
    mass: ".001 earth mass",
    atmosphere: "None",
    cosmic: "Atmosphere too thin to reduce cosmic rays",
    surface: "solid and rocky",
    water: "None",
    magnetosphere: "None",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    question: [{
            q1: false,
            text: "No magnetosphere is present."
        },
        {
            q2: false,
            text: "No water present."
        },
        {
            q3: true,
            text: "Nice rocky surface."
        },
        {
            q4: false,
            text: "How far it is from the Sun."
        }
    ]
}
const titan = {
    name: "Titan",
    size: 4,
    orbit: 75,
    speed: 20,
    angle: 10,
    color: "lightyellow",
    imageSource: "titan-transparent.gif",
    temp: "- 233F",
    mass: "30% earth mass",
    atmosphere: "None",
    cosmic: "Atmosphere too thin to reduce cosmic rays",
    surface: "solid and rocky",
    water: "None",
    magnetosphere: "None",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    question: [{
            q1: false,
            text: "No magnetosphere is present."
        },
        {
            q2: false,
            text: "No water present."
        },
        {
            q3: true,
            text: "Nice rocky surface."
        },
        {
            q4: false,
            text: "How far it is from the Sun."
        }
    ]
}
const dione = {
    name: "Dione",
    size: 2,
    orbit: 105,
    speed: 10,
    angle: 50,
    color: "lightgrey",
    imageSource: "Deimos.jpg",
    temp: "- 233F",
    mass: ".001 earth mass",
    atmosphere: "None",
    cosmic: "Atmosphere too thin to reduce cosmic rays",
    surface: "solid and rocky",
    water: "None",
    magnetosphere: "None",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    question: [{
            q1: false,
            text: "The temperature of the moon."
        },
        {
            q2: false,
            text: "No water present."
        },
        {
            q3: true,
            text: "Nice rocky surface."
        },
        {
            q4: false,
            text: "How far it is from the Sun."
        }
    ]
}
const moon4 = {
    name: "moon4",
    size: 1,
    orbit: 25,
    speed: 20,
    angle: 120,
    color: "white",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    question: [{
            q1: false,
            text: "No magnetosphere is present."
        },
        {
            q2: false,
            text: "No water present."
        },
        {
            q3: true,
            text: "Nice rocky surface."
        },
        {
            q4: false,
            text: "How far it is from the Sun."
        }
    ]
}

const moon5 = {
    name: "moon5",
    size: 1,
    orbit: 20,
    speed: 30,
    angle: 270,
    color: "lightgrey",
    hit: false,
    location: {
        x: 0,
        y: 0
    },
    question: [{
            q1: false,
            text: "No magnetosphere is present."
        },
        {
            q2: true,
            text: "Has a rocky surface."
        },
        {
            q3: false,
            text: "No water present"
        },
        {
            q4: false,
            text: "How far it is from the Sun."
        }
    ]
}