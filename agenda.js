const agenda = {}

agenda.currentLesson = [4,4,2]  // [ week, lesson in week ] 1-based 

// All strings in this data will be preprocessed by a Markdown converter.
// So you can use **bold**, _italic_ and [hyperlinks](http://www.example.com).
// HTML-tags will work too, and line-breaks inside ``-strings will be converted to <br>.


agenda.program =
[ // The progam is an array of weeks.
  [ // A week is just an array of lesson-objects.
    {  // A lesson is an object.
      date: "Monday Jan 29th",
      title: "Kick-off", // title is optional
      content: [ // content is optional, can also be a single string.
        "Kick-off",
      ]
    },
    { date: "Tuesday Jan 30th",
      title: "Kick-off (continued)",
      content: [
        "Getting the Arduino to work with your laptop",
        "Getting your browser to work with mail-links",
        "Start with [chapter 1 – introduction to the Arduino](/ch1-intro-arduino/index.html)",
        "Watch all video's of Chapter 1.",
        "Assignments 1.1 — 1.10",
      ]
    }, 
  ],
  [
    { date: "Monday Feb 5th",
      title: "[chapter 1 – introduction to the Arduino](/ch1-intro-arduino/index.html)",
      content: [
        "Watch all video's of Chapter 1.",
        "Assignments 1.1 — 1.11",
        "**Optional**: The HTML & CSS introduction from the Kahn Academy (see first grey block in [chapter 2](/ch2-intro-javascript/index.html))"
      ]
    }, 
    { date: "Tuesday Feb 6th",
      title: "[chapter 2 – intro to JavaScript](/ch2-intro-javascript/index.html)",
      content: [
        "assignments 2.1—2.10",
      ]
    }, 
    { date: "Thursday Feb 8th",
      title: "[chapter 3 – interactivity in JavaScript with _functions_](/ch3-interactivity-functions/index.html)",
      content: [
        "Assignments 3.3—3.11",
        "_(assignment 3.12 is left for the next lesson)_",
      ],
    },
  ],
  [
    {
      date: "Monday Feb 12th — Friday Feb 16th",
      title: "Spring Holiday"
    }
  ],
  [
    { date: "Monday Feb 19th",
      title: "[chapter 4 – calculations and storing results in _variables_](/ch4-calculations-variables/index.html)",
      content: [
        "assignments 4.1—4.5 ",
      ],
    },
    { date: "Tuesday Feb 20th",
      title: "[chapter 5 – russian dolls for data: variables _inside_ variables](/ch5-variables-inside-variables/index.html)",
      content: [
        "assignments 4.6 & 4.7 from [chapter 4](/ch4-calculations-variables/index.html)",
        "assignments 5.1—5.6",
      ],
    },
    { date: "Thursday Feb 22nd",
      title: "les vervalt ivm 'studiedag HAN'",
    },
    { date: "Friday Feb 23rd",
      title: `[chapter 6 – _debugging_ code that doesn't work](/ch6-debugging/index.html)
      [chapter 7 – how functions communicate: _parameters_ and _return values_](/ch7-more-about-functions/index.html)`,
      content: [
        "assignments 5.7—5.12 from [chapter 5](/ch5-variables-inside-variables/index.html)",
        "assignments 6.1—6.5 (optioneel: 6.6)",
        "assignments 7.1—7.7",
      ],
    }
  ]
]

  // [
  //   { date: "Tuesday Sept 7th",
  //     title: "[chapter 5 – russian dolls for data: variables _inside_ variables](/ch5-variables-inside-variables/index.html')",
  //     content: [
  //       "assignments 5.2—5.12",
  //     ],
  //   }, 
  //   { date: "Wednesday Sept 8th",
  //     title: "[chapter 6 – _debugging_ code that doesn't work](/ch6-debugging/index.html)",
  //     content: [
  //       "assignments 6.2—6.5",
  //       "bonus assignment 6.6 _if you have the time_"
  //     ],
  //   }, 
  //   { date: "Thursday Sept 9th",
  //     title: "[chapter 7 – how functions communicate: _parameters_ and _return values_](/ch7-more-about-functions/index.html)",
  //     content: [
  //       "assignments 7.2—7.11 ",
  //     ],
  //   },
  //   { date: "Monday Feb 14th",
  //     title: "[chapter 8 – _true_, _false_, and choosing with _if-statements_](/ch8-true-false-if/index.html)",
  //     content: [
  //       `from ch7: assignment 7.12,
  //          _(7.12.e is bonus, skip this if you don't have the time)_`,
  //       "assignments 8.1—8.6",
  //     ],
  //   }, 
  //   { date: "Tuesday Sept 14th",
  //     title: "[chapter 8 – _true_, _false_, and choosing with _if-statements_ (continued)](/ch8-true-false-if/index.html)",
  //     content: [
  //       "assignments 8.6—8.12",
  //     ],
  //   },
  //   { date: "Wednesday Feb 16th",
  //     title: "[chapter 9 – more about if-statements and _conditions_](/ch9-more-if-conditions/index.html)",
  //     content: [
  //       "video's 9a en 9b,",
  //       "_aandachtig lezen:_ tekstblok over logical operators,",
  //       "asignments 9.1—9.8",
  //     ],
  //   },{
  //     date: "Thursday Feb 17th",
  //     title: "[chapter 10 – more about functions: _local variables_ and _side effects_](/ch10-locals-and-side-effects/index.html)",
  //     content: [
  //       "**extra:** opdracht 9.5 als je die nog niet goed of af had",
  //       "**extra:** opdrachten 9.6—9.8",
  //       "opdrachten 10.1—10.4,",
  //       "_aandachtig lezen:_ tekstblok over side effects versus return values,",
  //       "opdracht 10.5",
  //     ],
  //   },
  //   { date: "Monday Feb 21th",
  //     title: "[ch.10 _continued_](/ch10-locals-and-side-effects/index.html) and [chapter 11 – fun with data types](/ch11-fun-with-datatypes/index.html)",
  //     content: [
  //       "opdrachten 10.4—10.7",
  //       "opdrachten 11.1,",
  //       "_aandachtig lezen:_ tekstblok over datatypes,",
  //       "opdrachten 11.2 and 11.3",
  //     ],
  //   },
  //   { date: "Tuesday Feb 22st",
  //   title: "_vervalt_",
  //     content: [],
  //   },
  //   { date: "Wednesday Feb 23nd",
  //   title: "[ch.11 _continued_](/ch11-fun-with-datatypes/index.html), and [chapter 12 – recap](/ch12-recap/index.html)",
  //   content: [
  //       "opdrachten 11.3—11.6",
  //       "leeswerk: [What is a concept map?](https://cmap.ihmc.us/docs/conceptmap.php) (alleen inleiding),",
  //       "leeswerk: [How people learn](https://cmap.ihmc.us/docs/howpeoplelearn.php) (helemaal, is kort),",
  //       "instruction-box over installeren CMap tools,",
  //       "opdrachten 12.1 and 12.2",
  //     ],
  //   },
  //   { date: "Thursday Feb 24rd",
  //   title: "[ch.12 _continued_](/ch12-recap/index.html) and [chapter 13 – loops](/ch13-loops/index.html)",
  //   content: [
  //     "opdrachten 12.3—12.5 ",
  //     "assignments 13.1—13.5",
  //     "read carefully: the text box about for-loops",
  //   ],
  // },
  // { date: "Monday Mar 7th",
  //   title: "[chapter 13 – loops for repeating commands](/ch13-loops/index.html)",
  //   content: [
  //     "assignments 13.6—13.8",
  //   ],
  // },
  //   { date: "Tuesday Mar 8th",
  //     title: "[chapter 13 – loops _(continued)_](/ch13-loops/index.html) and [chapter 14 – visuals](/ch14-canvas-animation/index.html)",
  //     content: [
  //       "assignments 13.9—13.10 (_niet 13.11_)",
  //       "assignments 14.1—14.2",
  //     ],
  //   },
  //   { date: "Wednesday Mar 9th",
  //     title: "[chapter 14 – visuals with canvas and animation _(continued)_](/ch14-canvas-animation/index.html)",
  //     content: [
  //       "assignments 14.3 tot 14.6",
  //     ],
  //   },
  //   { date: "Thursday Mar 10th",
  //     title: "[chapter 14 – animation _(continued)_](/ch14-canvas-animation/index.html) and [chapter 15 – methods](/ch15-methods/index.html)",
  //     content: [
  //       // "oefening 14.2 (als je die nog niet hebt) ",
  //       "assignments 14.7—14.8",
  //       "assignments 15.1—15.7",

  //     ],
  //   },
  //   { date: "Monday Oct 4th",
  //   title: "[chapter 15 – active objects do it with _methods_ _(continued)_](/ch15-methods/index.html)",
  //   content: [
  //     "in class, we support you while you're working on the assignment",
  //   ],
  // },
  // { date: "Thursday Oct. 7th: no class",
  //   title: "continuing Battleships assignment",
  //   content: [
  //     "in class, we support you while you're working on the assignment",
  //   ],
  // },
  //   { date: "Thursday Oct. 7th",
  //     title: "Battleships assignment + intro [chapter 17 – final assignment _Arduino_: Buglar Alarm](/arduino-burglar-alarm/index.html)",
  //     content: [
  //       "in class, we support you while you're working on the assignment",
  //     ],
  //   },
  //   { date: "_Friday_ Oct. 8th",
  //     title: '<span style="font-weight: 600; color: #0a0">23:59: deadline BattleShips</span>',
  //     content: []
  //   },
  //   { date: "Monday Oct. 11th",
  //     title: "introducing the Arduino assignment: [the Burglar alarm](/arduino-burglar-alarm/index.html)",
  //     content: [
  //       "in class, we support you while you're working on the assignment",
  //     ],
  //   },
  //   { date: "Tuesday Oct. 12th",
  //     title: "continuing Burglar alarm",
  //     content: [
  //       "in class, we support you while you're working on the assignment",
  //     ],
  //   },
  //   { date: "Wednesday Oct. 13th",
  //     title: "continuing Burglar alarm",
  //     content: [
  //       "in class, we support you while you're working on the assignment",
  //     ],
  //   },
  //   { date: "Thursday Oct. 14th",
  //       title: "Kick-off Project",
  //       content: [
  //         "introduction to the S4D Project",
  //         "[**the list of programming platforms**](/project-list.html)",
  //         "team formation for the project",
  //         "remaining time is for support while you're finishing the Burglar Alarm",
  //       ],
  //   },
  //   { date: "Thursday Oct. 14th",
  //       title: '<span style="font-weight: 600; color: #0a0">23:59: deadline Burglar Alarm</span>',
  //       content: [],
  //   }
  // ]
