// Stepping Exercise statements.
// Source: Insights "Jungian Preferences - Stepping Exercise" (c) The Insights Group Ltd, 2013-2014.
// To change any wording, edit the text between the quote marks. Keep the commas and brackets as they are.

const ROUNDS = {
  1: {
    title: "Introversion and Extraversion",
    a: { name: "Introversion", prompt: "Step to the left if you ...", step: "Step left", dir: -1 },
    b: { name: "Extraversion", prompt: "Step to the right if you ...", step: "Step right", dir: 1 },
    aItems: [
      "prefer to work in an environment with few distractions and little noise which allows you to concentrate on the task in hand",
      "tend to hesitate before giving an immediate response to a question, preferring to say ‘I need time to think about it’ or ‘I need to look into it further’",
      "in a group situation, find it challenging to put across your point of view and may even not speak at the risk of not saying it ‘just right’",
      "like to work with your door closed at times and realise this could be perceived by your colleagues as less accessible",
      "become upset when others complete your sentences or interrupt you while expressing views and opinions",
      "need a lot of time to prepare yourself for large gatherings and events where you will be required to interact with large numbers of people",
      "after a meeting, social or otherwise, prefer to take some time to reflect and consider the outcome in private then may have more input to add to the discussion",
      "hear your colleagues describe you as ‘a good listener’",
      "often find yourself becoming frustrated when someone else makes the point you have already thought about but not articulated"
    ],
    bItems: [
      "prefer to work in an environment where there is a lot of activity, loving to be in the thick of things and at the centre of the action",
      "get distracted and seek opportunities to ‘liven things up’ when discussions get too serious, detailed or dull",
      "use meetings as a platform for your opinions to be heard and may become agitated when people have not listened to your point of view",
      "like to keep your door open, hoping people will drop by on their way for a quick update or brainstorm, finding the distraction invigorating",
      "after a team discussion, will continue to discuss the outcomes and actions with others for as long as the interest continues",
      "enjoy meeting new people, sharing ideas and engaging in conversation, even with strangers",
      "find generating ideas in the company of others engaging and energising and will seek others to work with on most projects and tasks",
      "hear your colleagues describe you as ‘talkative’",
      "in the excitement of the moment, interrupt others or finish their sentences, without necessarily realising this can be frustrating to them"
    ]
  },
  2: {
    title: "Thinking and Feeling",
    a: { name: "Thinking", prompt: "Step towards the front of the room if you ...", step: "Step forward", dir: -1 },
    b: { name: "Feeling", prompt: "Step towards the back of the room if you ...", step: "Step back", dir: 1 },
    aItems: [
      "are often sceptical, especially about new ideas or concepts until you have assimilated all the information available",
      "are quite strong-minded and opinionated when you disagree with someone and you may tell them what you think even though it may be kinder to say nothing",
      "when involved in a discussion or argument, will prefer to rely on logic/truth and facts/data to support your position",
      "make important decisions objectively and have difficulty understanding why others find it necessary to mull over so much information",
      "can argue both sides of a topic whether you agree with it or not",
      "believe that it is most important to get to the result and outcome necessary, knowing this means at times making unpopular choices",
      "remember facts and figures more easily than names and faces",
      "keep going at a task or project that interests you despite social or relationship calls on your time",
      "because of your desire to be objective, you give the impression of being uncaring although this is far from the truth"
    ],
    bItems: [
      "are often seen as considerate, always wanting to be in service to other people ensuring their needs are understood and considered",
      "perceive harmony as preferable to ‘being correct’, avoiding conflict (unless it goes against your values)",
      "sacrifice your own comfort in order to accommodate others, even if you may be taken advantage of",
      "when involved in a discussion, seek to understand others first, then may express your perspective supported with stories, examples and options",
      "find it difficult to communicate to others or confront situations where your personal needs and values are being neglected or ignored",
      "when you disagree with someone, think carefully about how to tell them in a sensitive way",
      "immediately will take back something you have said which has offended anyone and will tend to replay the situation to yourself repeatedly",
      "remember names and faces more easily than facts and figures",
      "when making important decisions, automatically think about how the decision will impact others"
    ]
  }
};

// Builds the running order for a round: statements alternate between the two preferences.
function roundItems(r) {
  const R = ROUNDS[r], out = [];
  for (let i = 0; i < R.aItems.length; i++) {
    out.push({ side: R.a, text: R.aItems[i] });
    out.push({ side: R.b, text: R.bItems[i] });
  }
  return out;
}

// A person's position in a round: minus = left / front, plus = right / back.
function positionOf(player, r) {
  const items = roundItems(r), ans = (player && player.a) || {};
  let pos = 0;
  items.forEach((it, i) => { if (ans[r + "_" + i] === 1) pos += it.side.dir; });
  return pos;
}
