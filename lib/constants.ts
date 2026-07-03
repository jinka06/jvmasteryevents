export type EventItem = {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

const events: EventItem[] = [
    {
    title: "WeAreDevelopers World Congress 2026",
    image: "/images/event1.png",
    slug: "wearedevelopers-world-congress-2026",
    location: "Berlin, Germany",
    date: "July 7-9, 2026",
    time: "09:00",
  },
  {
    title: "NDC Oslo 2026",
    image: "/images/event2.png",
    slug: "ndc-oslo-2026",
    location: "Oslo Spektrum, Oslo, Norway",
    date: "September 13-17, 2026",
    time: "09:00",
  },
  {
    title: "FabCon Europe 2026",
    image: "/images/event3.png",
    slug: "fabcon-europe-2026",
    location: "Barcelona, Spain",
    date: "September 28 - October 1, 2026",
    time: "08:30",
  },
  {
    title: "code.talks 2026",
    image: "/images/event4.png",
    slug: "code-talks-2026",
    location: "Hamburg, Germany",
    date: "November 3-4, 2026",
    time: "09:30",
  },
  {
    title: "Web Summit Lisbon 2026",
    image: "/images/event5.png",
    slug: "web-summit-lisbon-2026",
    location: "Altice Arena, Lisbon, Portugal",
    date: "November 9-12, 2026",
    time: "10:00",
  },
  {
    title: "Tech Show Paris 2026",
    image: "/images/event6.png",
    slug: "tech-show-paris-2026",
    location: "Paris Expo Porte de Versailles, Paris, France",
    date: "November 18-19, 2026",
    time: "09:00",
  },
  {
    title: "Slush 2026",
    image: "/images/event7.png",
    slug: "slush-2026",
    location: "Messukeskus, Helsinki, Finland",
    date: "November 18-19, 2026",
    time: "10:00",
  },
  {
    title: "ESPC26",
    image: "/images/event8.png",
    slug: "espc26",
    location: "Amsterdam, Netherlands",
    date: "November 30 - December 3, 2026",
    time: "09:00",
  },
]

export default events