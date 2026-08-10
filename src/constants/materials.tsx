import { Sem } from "./types";

export const materials: Record<
  Sem,
  {
    books: {
      name: React.ReactNode;
      link: string;
      bgColor: string;
      bgImage: string;
      requiresCollegeEmail?: boolean;
    }[];
    materials: {
      name: React.ReactNode;
      link: string;
      bgColor: string;
      bgImage: string;
      requiresCollegeEmail?: boolean;
    }[];
  }
> = {
  sem8: {
    books: [],
    materials: [
    ],
  },
  sem7: {
    books: [],
    materials: [
      {
        name: (
          <>
            DWDM
            <br />
            Slides
          </>
        ),
        link: "https://drive.google.com/drive/folders/1WX2Iqgkzkkg8ZR_QT3hoEQ48vZNU6uiD?usp=drive_link",
        bgColor: "#55a3bf",
        bgImage: "linear-gradient(62deg, #5682c4 0%, #52d0b8 100%)",
        requiresCollegeEmail: true,
      },
    ],
  },
  sem6: {
    books: [],
    materials: [
    ],
  },
  sem5: {
    books: [
      {
        name: (
          <>
            SAD
            <br />
          </>
        ),
        link: "https://drive.google.com/file/d/19HPF413qJgLRbceB4jQjRVzOKF7Zr5vR/view?usp=sharing",
        bgColor: "#283e54",
        bgImage: "linear-gradient(340deg, #283e54 50%, #ba0707 100%)",
      },
      {
        name: (
          <>
            Crypto
            <br />
            Slides
          </>
        ),
        link: "https://drive.google.com/drive/folders/1uOiYHPXejUBhwWAHDzVlnOn3VBeBKizT?usp=sharing",
        bgColor: "#55a3bf",
        bgImage: "linear-gradient(62deg, #5682c4 0%, #52d0b8 100%)",
      },
    ],
    materials: [
    ],
  },
  sem4: {
    books: [],
    materials: [
      {
        name: (
          <>
            OS
            <br />
            Slides
          </>
        ),
        link: "https://drive.google.com/drive/folders/1O4zMlPNaO_zlCQ4loBewK1Wy-XsMaaPL?usp=drive_link",
        bgColor: "#55a3bf",
        bgImage: "linear-gradient(62deg, #5682c4 0%, #52d0b8 100%)",
      },
    ],
  },
  sem3: {
    books: [
      {
        name: "Stats II",
        link: "https://drive.google.com/drive/folders/1JyJGIM2VcD5K02uOV9DllQsC4kli9pwX?usp=sharing",
        bgColor: "#657d8a",
        bgImage: "linear-gradient(12deg, #294c5f 0%, #a2afb6 100%)",
      },
      {
        name: "CA",
        link: "https://drive.google.com/file/d/1mBi5REwgrzAbuSr-eNyQZXlTRtU0dcfJ/view?usp=sharing",
        bgColor: "#60809d",
        bgImage: "linear-gradient(12deg, #929ea4 0%, #155592 100%)",
      },
      {
        name: "NM",
        link: "https://drive.google.com/drive/folders/1j22zeweR3IFWVELvtRnMUgaKc0YGnGG2?usp=sharing",
        bgColor: "#283e54",
        bgImage: "linear-gradient(340deg, #283e54 50%, #ba0707 100%)",
      },
    ],
    materials: [
      // {
      //   name: (
      //     <>
      //       Stats II
      //       <br />
      //       Tables (Mid term)
      //     </>
      //   ),
      //   link: "/files/Stats II ko mid term samma chahine table haru.pdf",
      //   bgColor: "#FBAB7E",
      //   bgImage: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
      // },
      {
        name: (
          <>
            Stats II
            <br />
            Ex. Copy
          </>
        ),
        link: "https://drive.google.com/drive/folders/1w-EiumutdnmJzPkLPdpsDcpnnuaxps5Y?usp=sharing",
        bgColor: "#c39883",
        bgImage:
          "linear-gradient(123deg, #eecc61 0%, #a86855 20%, #c9a38e 80%, #f4be38 100%)",
      },
    ],
  },
  sem2: {
    books: [
      {
        name: "Maths II",
        link: "https://drive.google.com/file/d/1rKmnbHftNWflZOgtMewyohmkVGipWVHZ/view?usp=sharing",
        bgColor: "#6bc6cd",
        bgImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
      },
      {
        name: "Stats I",
        link: "https://drive.google.com/drive/folders/1Ym1v7Aj3tX1rAL1CncO_-gxjTXjAfeML?usp=sharing",
        bgColor: "#2d8968",
        bgImage: "linear-gradient(42deg, #187a67 0%, #6ab26a 100%)",
      },
      {
        name: "DS CSIT",
        link: "https://drive.google.com/drive/folders/1Zn4Bmxb8F9QT-GMHVOqKK9Y94vJGC7yc?usp=sharing",
        bgColor: "#319ee3",
        bgImage: "linear-gradient(175deg, #afdbff 0%, #2297df 100%)",
      },
      {
        name: "MP CSIT",
        link: "https://drive.google.com/file/d/1qSlG7t9-eghH7t4fphStuyT90TmNfJjW/view?usp=sharing",
        bgColor: "#6eb944",
        bgImage: "linear-gradient(175deg, #92de85 0%, #6bb843 100%)",
      },
      {
        name: "DS Rosen",
        link: "https://drive.google.com/file/d/1cq2ZgbxcC63OtVTkBqYVVdP53HR1Clhz/view?usp=sharing",
        bgColor: "#9b97a1",
        bgImage: "linear-gradient(200deg, #383c84 0%, #a49fa4 100%)",
      },
      {
        name: "OOP Lafore",
        link: "https://drive.google.com/file/d/1HogQlyLeo2QRNaFGe-ng36Wdx4l9ni2X/view?usp=sharing",
        bgColor: "#714294",
        bgImage: "linear-gradient(43deg, #773BB8 0%, #655147 100%)",
      },
    ],
    materials: [
      {
        name: (
          <>
            Stats I
            <br />
            Ex. Copy
          </>
        ),
        link: "https://drive.google.com/drive/folders/1dlQeeP7dhB_upNMiiKEmXOL4nlPEMSGs?usp=sharing",
        bgColor: "#c39883",
        bgImage:
          "linear-gradient(123deg, #eecc61 0%, #a86855 20%, #c9a38e 80%, #f4be38 100%)",
      },
      {
        name: "DS PPT",
        link: "https://drive.google.com/drive/folders/1hx7dQ0lO7Y-93sSc2L5tqDJerwPM0oP1?usp=sharing",
        bgColor: "#55a3bf",
        bgImage: "linear-gradient(62deg, #5682c4 0%, #52d0b8 100%)",
      },

      {
        name: (
          <>
            Stats
            <br />
            Lab
          </>
        ),
        link: "./files/StatsLabV1.3.zip",
        bgColor: "#348f5d",
        bgImage: "linear-gradient(62deg, #217346 0%, #57c287 100%)",
      },
    ],
  },
  sem1: {
    books: [],
    materials: [],
  },
};
