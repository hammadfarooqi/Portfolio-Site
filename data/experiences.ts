export interface Photo {
  imageUrl: string;
  caption: string;
  longDescription: string;
}

export interface Experience {
  title: string;
  date: string;
  shortDescription: string; // For notecards
  photos: Photo[]; // Multiple photos per experience
}

export const experiences: Experience[] = [
  {
    title: "Hammad Farooqi",
    date: "Princeton '27 Undergrad",
    shortDescription: "N/A",
    photos: [
      {
        imageUrl: "/data/photos/me/me-1.JPG",
        caption: "Hammad and his Best Friend",
        longDescription: "Cap and Gown Eating Club Formals (Fall 2025)"
      },
      {
        imageUrl: "/data/photos/me/me-2.JPG",
        caption: "Hammad and his Intern Friends",
        longDescription: "Seattle Boat (Summer 2025)"
      },
      {
        imageUrl: "/data/photos/me/me-3.jpg",
        caption: "Hammad Enjoying Seattle Views",
        longDescription: "Seattle Boat (Summer 2025)"
      },
      {
        imageUrl: "/data/photos/me/me-4.jpeg",
        caption: "Hammad on Another Boat",
        longDescription: "Seattle Kayaking (Summer 2025)"
      },
      {
        imageUrl: "/data/photos/me/me-5.jpeg",
        caption: "Hammad Declaring his Major",
        longDescription: "Princeton Canon Green (Spring 2025)"
      },
      {
        imageUrl: "/data/photos/me/me-6.jpg",
        caption: "Hammad Turning 20",
        longDescription: "At home with family (Spring 2025)"
      },
      {
        imageUrl: "/data/photos/me/me-7.jpeg",
        caption: "Hammad Enjoying Seattle Nightscape",
        longDescription: "Random Seattle Construction Site (Summer 2025)"
      },
      {
        imageUrl: "/data/photos/me/me-8.JPG",
        caption: "Hammad with his Princeton Mentor",
        longDescription: "Stanford Campus (Summer 2024)"
      },
      {
        imageUrl: "/data/photos/me/me-9.jpg",
        caption: "Hammad Going Gambling?",
        longDescription: "Las Vegas (Summer 2024)"
      },
      {
        imageUrl: "/data/photos/me/me-10.jpeg",
        caption: "Hammad Eating Italian Food",
        longDescription: "Teresa's Pizza in Princeton (Spring 2025)"
      },
      {
        imageUrl: "/data/photos/me/me-11.jpeg",
        caption: "Hammad Going to a Wedding",
        longDescription: "In his front yard with family (Summer 2024)"
      },
      {
        imageUrl: "/data/photos/me/me-12.jpeg",
        caption: "Hammad as a Freshman Orientation Leader",
        longDescription: "Poconos (Summer 2024)"
      }
    ]
  },
  {
    title: "HackPrinceton Fall '25 Director",
    date: "Fall 2025",
    shortDescription: "Led a team of 40 to host the largest Ivy League hackathon in post-Covid history!",
    photos: [
      {
        imageUrl: "/data/photos/hackpton-f25/hackpton-f25-1.JPG",
        caption: "Hammad at Opening Ceremony",
        longDescription: "Kicking off the 36 hour hackathon by introducing the rules, prizes, sponsors, and guest speakers."
      },
      {
        imageUrl: "/data/photos/hackpton-f25/hackpton-f25-2.JPG",
        caption: "Hammad at Opening Ceremony",
        longDescription: "Kicking off the 36 hour hackathon by introducing the rules, prizes, sponsors, and guest speakers."
      },
      {
        imageUrl: "/data/photos/hackpton-f25/hackpton-f25-3.JPG",
        caption: "Hammad and Organizers Hard at Work",
        longDescription: "Taking small downtime to drink Ooika matcha from the HackPrinceton pop-up."
      },
      {
        imageUrl: "/data/photos/hackpton-f25/hackpton-f25-4.JPG",
        caption: "Calm Before the Storm",
        longDescription: "Hammad and his organizers polishing the judging system before the judging period."
      },
      {
        imageUrl: "/data/photos/hackpton-f25/hackpton-f25-5.JPG",
        caption: "Hammad Before Closing Ceremony",
        longDescription: "Taking in the crowd of 600 awaiting the closing ceremony after a very successful hackathon."
      },
      {
        imageUrl: "/data/photos/hackpton-f25/hackpton-f25-6.JPG",
        caption: "Hammad Getting Swarmed",
        longDescription: "Helping the Dedalus Labs team give out their limited hoodies to the swarm of hackers."
      },
      {
        imageUrl: "/data/photos/hackpton-f25/hackpton-f25-7.JPG",
        caption: "Hammad and Mark",
        longDescription: "Taking one last picture with the man who brought me onto HackPrinceton after our last hackathon."
      },
      {
        imageUrl: "/data/photos/hackpton-f25/hackpton-f25-8.jpeg",
        caption: "Hammad and Andrew before Opening",
        longDescription: "Had to take one 0.5 selfie with co-director Andrew before the opening ceremony."
      },
      {
        imageUrl: "/data/photos/hackpton-f25/hackpton-f25-9.JPG",
        caption: "Paper Plate Awards Post-Hackathon",
        longDescription: "Giving out paper plate awards to the hard-working lead organizers of HackPrinceton F'25."
      }
    ]
  },
  {
    title: "AWS SDE Intern",
    date: "Summer 2025",
    shortDescription: "Built Multi-Agentic Generative AI pipeline to investigate and solve integration test failures.",
    photos: [
      {
        imageUrl: "/data/photos/amazon/amazon-1.jpeg",
        caption: "Hammad at the Spheres",
        longDescription: "Somehow color coordinated with fellow interns on an office trip to the Spheres."
      },
      {
        imageUrl: "/data/photos/amazon/amazon-2.jpeg",
        caption: "Hammad's Last Day",
        longDescription: "Had to take one last picture with the Amazon logo before leaving the Redmond office."
      },
      {
        imageUrl: "/data/photos/amazon/amazon-3.jpeg",
        caption: "Hammad's Final Presentation",
        longDescription: "Fellow intern snuck a photo of me presenting to the Redshift organization across the country."
      },
      {
        imageUrl: "/data/photos/amazon/amazon-4.JPG",
        caption: "Hammad Winning Amazon Chess Day",
        longDescription: "Won Amazon Chess Day (an office-wide chess tournament) against the entire Redmond office."
      }
    ]
  },
  {
    title: "HackPrinceton Spring '25 Director",
    date: "Spring 2025",
    shortDescription: "Led a team of 35 to host RetroHacks for 400 hackers around the world!",
    photos: [
      {
        imageUrl: "/data/photos/hackpton-s25/hackpton-s25-1.jpeg",
        caption: "Hammad and Jenny at Opening",
        longDescription: "Kicking off the 36 hour hackathon with my co-director Jenny."
      },
      {
        imageUrl: "/data/photos/hackpton-s25/hackpton-s25-2.jpeg",
        caption: "Mandatory 0.5 Selfie",
        longDescription: "Had to take one 0.5 selfie as hackers started filing into the room for opening ceremony."
      },
      {
        imageUrl: "/data/photos/hackpton-s25/hackpton-s25-3.jpeg",
        caption: "Hammad and Jenny at Opening",
        longDescription: "Kicking off the 36 hour hackathon with my co-director Jenny."
      },
      {
        imageUrl: "/data/photos/hackpton-s25/hackpton-s25-4.jpeg",
        caption: "Hammad and Jenny",
        longDescription: "Framing the moment with my co-director Jenny!"
      },
      {
        imageUrl: "/data/photos/hackpton-s25/hackpton-s25-5.jpeg",
        caption: "Hammad and the Overall Winners",
        longDescription: "Giving out the Grand Prize to SixthSense, an amazing Hardware Hack for the vision-impaired."
      },
      {
        imageUrl: "/data/photos/hackpton-s25/hackpton-s25-6.jpg",
        caption: "Thanking Ali Partovi",
        longDescription: "Small LinkedIn exchange thanking Ali Partovi for his HackPrinceton closing remarks."
      },
      {
        imageUrl: "/data/photos/hackpton-s25/hackpton-s25-7.jpeg",
        caption: "Closing Ceremony Crowd",
        longDescription: "Areal shot of the closing ceremony crowd of 400 hackers and sponsors."
      }
    ]
  }
];

