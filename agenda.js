const agenda = {}

agenda.currentLesson = [1, 1, 2] // [ week, lesson in week ] 1-based

// All strings in this data will be preprocessed by a Markdown converter.
// So you can use **bold**, _italic_ and [hyperlinks](http://www.example.com).
// HTML-tags will work too, and line-breaks inside ``-strings will be converted to <br>.

agenda.program = [
  // The progam is an array of weeks.
  [
    // A week is just an array of lesson-objects.
    /*
    {
      // A lesson is an object.
      date: "Aug 28", // date format
      title: "Kick-off", // title is optional
      content: [
        // content is optional, can also be a single string.
        "Kick-off",
        "Getting the Arduino to work with your laptop",
        "Getting your browser to work with mail-links",
        "Start with [chapter 1 – introduction to the Arduino](/ch1-intro-arduino/)",
      ],
    },
    */
    {
      date: new Date('2024-9-2'),
      title: 'Kick-off and [first lesson](/ch1-intro-arduino/)',
      content: [
        'getting the Arduino to work with your laptop',
        'getting your browser to work with mail-links',
        'assignments 1.1—1.7',
      ],
    },
    {
      date: new Date('2024-9-3'),
      title: '[introduction to the Arduino](/ch1-intro-arduino/) _(continued)_',
      content: [
        'assignments 1.8—1.11',
        '**optional**: The HTML & CSS introduction from the<br>Kahn Academy (see first grey block in [chapter 2](/ch2-intro-javascript/index.html))',
      ],
    },
    {
      date: new Date('2024-9-4'),
      title: '[introduction to JavaScript](/ch2-intro-javascript/)',
      content: ['assignments 2.1—2.10'],
    },
    {
      date: new Date('2024-9-5'),
      title: '[interactivity with _functions_](/ch3-interactivity-functions/)',
      content: ['assignments 3.1—3.11', '_during class: assignment 3.12_'],
    },
  ],
  [
    {
      date: new Date('2024-9-9'),
      title:
        '[calculations and storing results in _variables_](/ch4-calculations-variables/)',
      content: ['assignments 4.1—4.5', '_during class: assignments 4.6—4.7_'],
    },
    {
      date: new Date('2024-9-10'),
      title:
        '[russian dolls for data: variables _inside_ variables](/ch5-variables-inside-variables/)',
      content: ['assignments 5.1—5.12'],
    },
    {
      date: new Date('2024-9-11'),
      title: "[_debugging_ code that doesn't work](/ch6-debugging/)",
      content: ['assignments 6.1—6.5', '_during class: assignments 6.5—6.6_'],
    },
    {
      date: new Date('2024-9-12'),
      title:
        '[how functions communicate: _parameters_ and _return values_](/ch7-more-about-functions/)',
      content: ['assignments 7.2—7.11', '_during class: assignment 7.12_'],
    },
  ],
  [
    {
      date: new Date('2024-9-16'),
      title:
        '[_true_, _false_, and choosing with _if-statements_](/ch8-true-false-if/)',
      content: ['assignments 8.1—8.8', '_during class: assignments 8.9—8.12_'],
    },
    {
      date: new Date('2024-9-17'),
      title:
        '[more about if-statements and _conditions_](/ch9-more-if-conditions/)',
      content: [
        'assignments 9.1—9.5',
        '_during class: recap assignments 8.10—8.12_',
        '_during class: assignments 9.6—9.8_',
      ],
    },
    {
      date: new Date('2024-9-18'),
      title:
        '[more about functions: _local variables_ and _side effects_](/ch10-locals-and-side-effects/)',
      content: [
        'assignments 10.1—10.5',
        '_read carefully:_ text block ‘side effects versus return values’',
        '_during class: assignments 10.6—10.7_',
      ],
    },
    {
      date: new Date('2024-9-19'),
      title: '[fun with data types](/ch11-fun-with-datatypes/)',
      content: [
        'assignments 11.1—11.5',
        '_read carefully:_ text block ‘data types and sizes’',
        '_during class: assignment 11.6_',
      ],
    },
  ],
  [
    {
      date: new Date('2024-9-23'),
      title:
        "[recap: let's review what you've learned](/ch12-recap/), and <br>" +
        '[loops for repeating commands](/ch13-loops/)',
      content: [
        'assignments 12.1—12.3',
        'assignments 13.1—13.2',

        '_read carefully:_ instruction block ‘installing CMap Tools’',
        '_during class: assignments 12.4—12.5_',
        '_during class: assignments 13.3—13.5_',
      ],
    },
    {
      date: new Date('2024-9-24'),
      title: '[loops for repeating commands](/ch13-loops/) _(continued)_',
      content: [
        'assignments 13.5—13.9',
        '_read carefully:_ text block ‘one more repetition: for loops’',
        '_during class: assignments 13.10—13.11_',
      ],
    },
    {
      date: new Date('2024-9-25'),
      title: '[visuals with canvas and animation](/ch14-canvas-animation/)',
      content: [
        'assignments 14.1—14.5',
        '_during class: assignments 14.6—14.7_',
      ],
    },
    {
      date: new Date('2024-9-26'),
      title:
        '[visuals with canvas and animation](/ch14-canvas-animation/)  _(continued)_, and<br>' +
        '[active objects do it with _methods_ ](/ch15-methods/)',
      content: [
        'assignment 15.1',
        '_during class: assignments 13.11, 14.6—14.7_',
      ],
    },
  ],
  [
    {
      date: new Date('2024-9-30'),
      title: '[active objects do it with _methods_ ](/ch15-methods/)',
      content: [
        'assignments 15.1—15.8',
        '_during class: assignments 15.9—15.10_',
      ],
    },
    {
      date: new Date('2024-10-1'),
      title:
        '_final assignment_ [Javascript: Battleships](/javascript-battleships/)',
      content: [
        "in class, we support you while you're working on the assignment",
      ],
    },
    {
      date: new Date('2024-10-2'),
      title: '_support_',
    },
    {
      date: new Date('2024-10-3'),
      title: '_support_',
    },
  ],
  [
    {
      date: new Date('2024-10-7'),
      title:
        '_deadline inleveren_ [Javascript: Battleships](/javascript-battleships/)<br>' +
        '_final assignment_ [Arduino: Burglar alarm](/arduino-burglar-alarm/)',
      content: 'voor 23:59 inleveren via mail',
    },
    {
      date: new Date('2024-10-8'),
      title: '_support_',
    },
    {
      date: new Date('2024-10-9'),
      title: '_support_',
    },
    {
      date: new Date('2024-10-10'),
      title:
        '_deadline inleveren_ [Arduino: Burglar alarm](/arduino-burglar-alarm/)',
      content: 'voor 23:59 inleveren via mail',
    },
  ],
  [
    {
      date: new Date('2024-10-14'),
      title: 'Project kick-off',
      content: [
        'introduction to the S4D Project',
        '[**list of programming platforms**](/project-list.html)',
        'team formation for the project',
      ],
    },
    {
      date: new Date('2024-10-16'),
      title: 'Project progress review',
      content: [
        // 'list of learning resources',
        // 'goals / high level functionality overview',
      ],
    },
    {
      date: new Date('2024-10-17'),
      title: '_assessments_',
      content: ['_nadere informatie volgt via mail_'],
    },
    // {
    //   date: "—",
    //   title:
    //     '<span style="font-weight: 600; color: #0a0">23:59: deadline Burglar Alarm</span>',
    //   content: [],
    // },
    // {
    //   date: "—",
    //   title:
    //     '<span style="font-weight: 600; color: #0a0">deadline inleveren opdrachten</span>',
    //   content: [],
    // },
    // {
    //   date: 'ma 16-10 t/m vr 20/10',
    //   title: '_herfstvakantie_',
    // },
  ],
]
