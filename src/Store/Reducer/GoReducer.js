import { O_CREAT } from "constants";

const initState = {
    test: [
        {name: "挨拶", date: new Date()},
        {name: "あんぱんの紹介", date: new Date()}
    ],
    scenes: [
      {action: "お辞儀", text: "あんぱんの紹介だよ", image: ""},
      {action: "笑顔", text: "みんな大好きあんぱん", image: ""}
    ]
};

/*
tasks: [
  {action: "お辞儀", text: "あんぱんの紹介だよ", imageFlag: true},
  {action: "笑顔", text: "みんな大好きあんぱん", imageFlag: true}
]
*/

export default function GoReducer(state = initState, action) {
  switch (action.type) {
      case 'SCENARIOLOADED':
        console.log("hello")
        return {
          ...state,
          test: action.scenario_list
        };
      case 'SCENESLOADED':
        console.log(action.scenes_list)
        return {
          ...state,
          scenes: action.scenes_list
        };
      default:
        return state;
  }
}