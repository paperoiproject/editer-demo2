import { O_CREAT } from "constants";

const initState = {
    test: [
        {name: "挨拶", date: new Date()},
        {name: "あんぱんの紹介", date: new Date()}
    ],
    scenes: [
      {action: "お辞儀", text: "あんぱんの紹介だよ", image: ""},
      {action: "笑顔", text: "みんな大好きあんぱん", image: ""}
    ],
    timeTable: [
      {name: "Roading"},
    ],
    sending: false,
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
      case 'TIMETABLELOADEDACTION':
        return {
          ...state,
          timeTable: action.timeTable
        };
      case 'TIMETABLECHANGEACTION':
          return {
            ...state,
            timeTable: action.new_arr
          };
      case 'PAPEROSENDACTION':
          return {
            ...state,
            sending: true
          };
      case 'PAPEROACTIONED':
          return {
            ...state,
            sending: false
          };
      default:
        return state;
  }
}