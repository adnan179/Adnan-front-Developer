import capsule from '../../public/capsule.jpeg';
import rocket from "../../public/rocket.jpeg";
import dragon from "../../public/dragon.jpg";

export const links =[
  {
    name: "SpaceX",
    hash: "/",
  },
  {
    name: "Explore",
    hash: "explore",
  },
  {
    name: "About",
    hash: "about",
  },
  {
    name: "Careers",
    hash: "careers",
  },
] as const;

export const categories =[
  {
    name: "Capsules",
    hash: "capsules",
    pic:capsule,
    desc: "A spacecraft module designed to carry astronauts, cargo, or both into space and return them safely to Earth",

  },
  {
    name: "Rockets",
    hash: "rockets",
    pic:rocket,
    desc:"A vehicle that propels itself through space or the atmosphere by expelling gases out of a nozzle, used to launch payloads into space",
  },
  {
    name: "Dragons",
    hash: "dragons",
    pic:dragon,
    desc:"SpaceX's spacecraft series used for cargo resupply missions to the ISS (Cargo Dragon) and crewed missions carrying astronauts to and from the ISS (Crew Dragon).",
  },
] as const;

export const social_links =[
  {
    name:"Twitter",
    hash:"https://twitter.com/SpaceX",
  },
  {
    name:"Instagram",
    hash:"https://www.instagram.com/spacex/",
  },
  {
    name:"Facebook",
    hash:"https://www.facebook.com/groups/spaceXverse/",
  },
  {
    name:"youtube",
    hash:"https://www.youtube.com/@SpaceX",
  },
] as const;